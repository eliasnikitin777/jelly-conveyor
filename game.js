'use strict';
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const counter = document.getElementById('count');
const countLabel = document.getElementById('count-label');
const moveCounter = document.getElementById('move-counter');
const levelLabel = document.getElementById('level');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayText = document.getElementById('overlay-text');
const retry = document.getElementById('retry');
const levelToggle = document.getElementById('level-toggle');
const levelMenu = document.getElementById('level-menu');
const menuClose = document.getElementById('menu-close');
const levelGrid = document.getElementById('level-grid');
const settingsToggle = document.getElementById('settings-toggle');
const settingsMenu = document.getElementById('settings-menu');
const settingsClose = document.getElementById('settings-close');
const moveAllInput = document.getElementById('move-all-floor');
const infiniteInput = document.getElementById('infinite-moves');
let moveAllFloor = false, infiniteMoves = false;
try { moveAllFloor = localStorage.getItem('jellyconveyor-move-all') === 'true'; } catch {}
try { infiniteMoves = localStorage.getItem('jellyconveyor-infinite-moves') === 'true'; } catch {}
moveAllInput.checked = moveAllFloor;
infiniteInput.checked = infiniteMoves;
const dialogOpen = () => levelMenu.open || settingsMenu.open;
let menuPausedAt = null;
let passedLevels = new Set();
try {
  const saved = JSON.parse(localStorage.getItem('jellyconveyor-passed') || '[]');
  if (Array.isArray(saved) && localStorage.getItem('jellyconveyor-campaign-version') !== 'without-4-5') {
    const remapped = saved.filter(i => Number.isInteger(i) && i !== 3 && i !== 4).map(i => i >= 5 ? i - 2 : i);
    saved.splice(0, saved.length, ...remapped);
    localStorage.setItem('jellyconveyor-passed', JSON.stringify(saved));
    localStorage.setItem('jellyconveyor-campaign-version', 'without-4-5');
  }
  if (Array.isArray(saved)) passedLevels = new Set(saved.filter(i => Number.isInteger(i) && i >= 0 && i < ConveyorLevels.length));
} catch {}
function plural(n,one,few,many) {
  if(n%100>=11&&n%100<=14)return many;
  if(n%10===1)return one;
  return n%10>=2&&n%10<=4?few:many;
}
function jellyCount(board) {
  return board.reduce((n,c)=>n+1+(c.inside?jellyCount([c.inside]):0),0);
}
function menuTiles() {
  levelGrid.innerHTML = ConveyorLevels.map((level,i) =>
    `<button type="button" class="level-tile" data-level="${i}" aria-label="Уровень ${i+1}: ${level.name}. Поле ${level.size} на ${level.size}. ${level.moves} ${plural(level.moves,'ход','хода','ходов')}${passedLevels.has(i)?'. Пройден':''}" aria-current="${i===levelIndex}"><strong>${i+1}</strong><span class="level-name">${level.name}</span><span class="level-meta">${level.size}×${level.size} · ${jellyCount(level.cells)} ${plural(jellyCount(level.cells),'желейка','желейки','желеек')}<br>${level.moves} ${plural(level.moves,'ход','хода','ходов')}</span>${passedLevels.has(i)?'<span class="level-check" aria-hidden="true">✓</span>':''}</button>`
  ).join('');
}

const palette = { green: '#56f54b', red: '#ff3e88', blue: '#54b8ff', orange: '#ffa64d' };
let cells, movesLeft, movesMade = 0, levelIndex = 0, boardSize, walls = [];
let stage = 'playing', transition = null, intro = null;
let gesture = null, snap = null, pulse = null, width = 0, size = 0, frame;
let visibleLinks = [];
const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
function ui() {
  counter.textContent = infiniteMoves ? movesMade : movesLeft;
  countLabel.textContent = infiniteMoves ? 'MOVES MADE' : 'MOVES LEFT';
  moveCounter.setAttribute('aria-label', infiniteMoves ? 'Сделано ходов' : 'Осталось ходов');
  levelLabel.textContent = `LEVEL ${levelIndex + 1} / ${ConveyorLevels.length}`;
  canvas.setAttribute('aria-label', `Поле ${boardSize} на ${boardSize}. Уровень ${levelIndex + 1}. ${moveAllFloor ? 'Проведите по полю, чтобы двигать все дорожки.' : 'Потяните любую клетку, чтобы двигать строку или столбец конвейера.'}`);
  canvas.setAttribute('aria-busy', String(!!(gesture || snap || pulse || transition)));
  canvas.setAttribute('aria-disabled', String(stage !== 'playing' || (!infiniteMoves && !movesLeft) || dialogOpen()));
  overlay.hidden = stage === 'playing';
  retry.hidden = stage === 'playing' || stage === 'between';
  if (stage === 'between') {
    overlayTitle.textContent = 'Уровень пройден';
    overlayText.textContent = 'Следующий уровень…';
  } else if (stage === 'won') {
    overlayTitle.textContent = 'Все уровни пройдены!';
    overlayText.textContent = `${ConveyorLevels.length} / ${ConveyorLevels.length}`;
    retry.textContent = 'Играть снова';
  } else if (stage === 'failed') {
    overlayTitle.textContent = 'Ходы закончились';
    overlayText.textContent = 'Попробуйте другой путь';
    retry.textContent = 'Повторить уровень';
  }
}
function loadLevel(index, now = performance.now()) {
  const level = ConveyorLevels[index];
  levelIndex = index; boardSize = level.size; walls = (level.walls || []).map(w => ({...w}));
  cells = level.cells.map(c => ({ ...c })); movesLeft = level.moves; movesMade = 0;
  gesture = snap = pulse = transition = null; stage = 'playing';
  intro = { start: now, duration: 280 };
  visibleLinks = ConveyorRules.links(cells);
  size = width / boardSize;
  ui();
}
function resize() {
  width = canvas.getBoundingClientRect().width; size = width / boardSize;
  const dpr = devicePixelRatio || 1;
  canvas.style.height = width + 'px';
  canvas.width = canvas.height = Math.round(width * dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  draw();
}
function resolveBoard(now) {
  if (!cells.length) {
    passedLevels.add(levelIndex);
    try { localStorage.setItem('jellyconveyor-passed', JSON.stringify([...passedLevels])); } catch {}
    if (levelIndex === ConveyorLevels.length - 1) stage = 'won';
    else { stage = 'between'; transition = { start: now, duration: 850 }; }
  } else if (!infiniteMoves && !movesLeft) stage = 'failed';
  ui();
}
function finishColors(now) {
  const ids = new Set(ConveyorRules.completed(cells).flat());
  if (ids.size) { pulse = { ids, start: now, duration: 620 }; ui(); }
  else resolveBoard(now);
}
function draw(now = performance.now()) {
  cancelAnimationFrame(frame);
  if (menuPausedAt !== null) now = menuPausedAt;
  if (snap && now - snap.start >= snap.duration) {
    const check = snap.check; snap = null;
    if (check) finishColors(now);
    else ui();
  }
  if (pulse && now - pulse.start >= pulse.duration) {
    cells = ConveyorRules.removeCompleted(cells,pulse.ids);
    pulse = null;
    finishColors(now);
  }
  if (transition && now - transition.start >= transition.duration) loadLevel(levelIndex + 1, now);
  if (intro && now - intro.start >= intro.duration) intro = null;
  const belt = gesture?.axis ? gesture : snap;
  let offset = belt?.offset || 0;
  if (snap) {
    const t = clamp((now-snap.start)/snap.duration,0,1);
    offset = snap.to + (snap.offset-snap.to) * Math.pow(1-t,3);
  }
  const view = belt ? ConveyorRules.shift(belt.base,belt.axis,belt.lane,offset,boardSize,walls) : cells;
  ctx.clearRect(0,0,width,width);
  ctx.fillStyle = '#4b4d50'; ctx.fillRect(0,0,width,width);
  ctx.lineWidth = 1; ctx.strokeStyle = '#686b70';
  ctx.beginPath();
  for (let i=0;i<=boardSize;i++) {
    ctx.moveTo(i*size,0);ctx.lineTo(i*size,width);
    ctx.moveTo(0,i*size);ctx.lineTo(width,i*size);
  }
  ctx.stroke();
  if (belt) {
    const horizontal = belt.axis === 'x';
    const lanes = belt.lane === null ? Array.from({length:boardSize},(_,i)=>i) : [belt.lane];
    for (const lane of lanes) {
      ctx.save();
      ctx.beginPath();ctx.rect(horizontal ? 0 : lane*size,horizontal ? lane*size : 0,horizontal ? width : size,horizontal ? size : width);ctx.clip();
      ctx.fillStyle=gesture?.axis && !gesture.allFloor ? '#303236' : '#515358';ctx.fillRect(0,0,width,width);
      ctx.strokeStyle='#787b80';ctx.lineWidth=1.2;
      ctx.beginPath();
      const phase = ((offset%1)+1)%1;
      for (let i=-1;i<=boardSize;i++) {
        const p=(i+phase)*size;
        if(horizontal) {ctx.moveTo(p,lane*size);ctx.lineTo(p,(lane+1)*size);}
        else {ctx.moveTo(lane*size,p);ctx.lineTo((lane+1)*size,p);}
      }
      ctx.stroke();ctx.restore();
      ctx.strokeStyle='#8a8d91';ctx.beginPath();
      for(const i of [lane,lane+1]) {
        if(horizontal) {ctx.moveTo(0,i*size);ctx.lineTo(width,i*size);}
        else {ctx.moveTo(i*size,0);ctx.lineTo(i*size,width);}
      }
      ctx.stroke();
    }
  }
  // Paint stationary white cutouts after the moving floor so the conveyor
  // never transports the walls or its grid through these areas.
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  for (const wall of walls) ctx.rect(wall.x*size,wall.y*size,size,size);
  ctx.fill();
  ctx.globalAlpha = intro ? clamp((now - intro.start) / intro.duration, 0, 1) : 1;
  const bodies = view.map(c => {
    let x=(c.x+.5)*size,y=(c.y+.5)*size,sx=1,sy=1;
    let color = palette[c.color];
    if(pulse?.ids.has(c.id)) {
      const t=clamp((now-pulse.start)/pulse.duration,0,1),energy=Math.sin(t*Math.PI);
      const wave=Math.sin(t*Math.PI*16);
      sx=1+.25*wave*energy;sy=1-.20*wave*energy;
      x+=size*.055*Math.sin(t*Math.PI*24+c.id)*energy;
      y+=size*.065*Math.cos(t*Math.PI*22+c.id)*energy;
      const light=Math.max(0,Math.sin(t*Math.PI*24))*.8;
      const vanish=1-clamp((t-.78)/.22,0,1);
      sx*=vanish;sy*=vanish;
      color=`rgb(${[1,3,5].map(i=>{
        const a=parseInt(palette[c.color].slice(i,i+2),16);
        return Math.round(a+(255-a)*light);
      }).join(',')})`;
    }
    return {...c,px:x,py:y,sx,sy,fill:color};
  });
  // Show the exact links that would exist if the pointer were released now.
  // Existing organisms stay rigid. A new bridge stretches between actual body
  // centers; moving back below the snap threshold withdraws that preview.
  visibleLinks = belt
    ? ConveyorRules.previewLinks(belt.base,belt.axis,belt.lane,
        snap ? snap.to : offset,boardSize,walls)
    : ConveyorRules.links(cells);
  const byId = new Map(bodies.map(b => [b.id,b]));
  function bridgeStrength(a,b) {
    const dx=a.x-b.x,dy=a.y-b.y;
    const error=Math.abs(dx-Math.round(dx))+Math.abs(dy-Math.round(dy));
    const t=clamp(1-error*2,0,1);
    return t*t*(3-2*t);
  }
  const edges = visibleLinks.map(([a,b]) => [byId.get(a),byId.get(b)])
    .filter(([a,b])=>bridgeStrength(a,b)>.001);
  function bridge(a,b) {
    const dx=b.px-a.px,dy=b.py-a.py,l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l,h=size*.11*Math.min(a.sx,a.sy,b.sx,b.sy)*bridgeStrength(a,b);
    ctx.beginPath();ctx.moveTo(a.px+nx*h,a.py+ny*h);
    ctx.bezierCurveTo(a.px+dx*.35+nx*h*.75,a.py+dy*.35+ny*h*.75,a.px+dx*.65+nx*h*.75,a.py+dy*.65+ny*h*.75,b.px+nx*h,b.py+ny*h);
    ctx.lineTo(b.px-nx*h,b.py-ny*h);
    ctx.bezierCurveTo(a.px+dx*.65-nx*h*.75,a.py+dy*.65-ny*h*.75,a.px+dx*.35-nx*h*.75,a.py+dy*.35-ny*h*.75,a.px-nx*h,a.py-ny*h);ctx.closePath();
  }
  function body(b,scale=1) {
    const w=size*.74*b.sx*scale,h=size*.74*b.sy*scale;
    const x=b.px-w/2,y=b.py-h/2,r=Math.min(size*.14*scale,w/2,h/2);
    ctx.beginPath();
    if(typeof ctx.roundRect==='function') ctx.roundRect(x,y,w,h,r);
    else {
      // Older browsers can draw the same rounded body with standard arcs.
      ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);
      ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
      ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);
      ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();
    }
  }
  ctx.strokeStyle='#202323';ctx.lineWidth=size*.045;ctx.lineJoin='round';
  for(const [a,b] of edges) {ctx.lineWidth=size*.045*bridgeStrength(a,b);bridge(a,b);ctx.stroke();}
  ctx.lineWidth=size*.045;
  for(const b of bodies) {body(b);ctx.stroke();}
  for(const b of bodies) {body(b);ctx.fillStyle=b.fill;ctx.fill();}
  for(const [a,b] of edges) {bridge(a,b);const g=ctx.createLinearGradient(a.px,a.py,b.px,b.py);g.addColorStop(0,a.fill);g.addColorStop(1,b.fill);ctx.fillStyle=g;ctx.fill();}
  for(const b of bodies) {
    ctx.fillStyle='white';ctx.beginPath();ctx.ellipse(b.px-size*.22*b.sx,b.py-size*.22*b.sy,size*.075*b.sx,size*.075*b.sy,0,0,Math.PI*2);ctx.fill();
    // Each captive occupies the shell's cell and follows its continuous motion.
    // Keep it visible while the shell shrinks away, then grow it to full size.
    const releasing=pulse?.ids.has(b.id);
    const t=releasing ? clamp((now-pulse.start)/pulse.duration,0,1) : 0;
    let scale=.5+.5*clamp((t-.78)/.22,0,1);
    for(let inner=b.inside;inner;inner=inner.inside) {
      const visual={...b,sx:releasing?1:b.sx,sy:releasing?1:b.sy};
      const innerScale=scale;
      body(visual,innerScale);ctx.fillStyle=palette[inner.color];ctx.fill();
      ctx.strokeStyle='#202323';ctx.lineWidth=size*.028;ctx.stroke();
      ctx.fillStyle='white';ctx.beginPath();
      ctx.ellipse(visual.px-size*.22*visual.sx*innerScale,visual.py-size*.22*visual.sy*innerScale,size*.075*visual.sx*innerScale,size*.075*visual.sy*innerScale,0,0,Math.PI*2);ctx.fill();
      scale*=.5;
    }
  }
  ctx.globalAlpha = 1;
  if(!dialogOpen() && (snap||pulse||transition||intro)) frame=requestAnimationFrame(draw);
}
function point(e) {const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};}
canvas.addEventListener('pointerdown',e=>{
  if(dialogOpen()||stage!=='playing'||gesture||snap||pulse||(!infiniteMoves&&!movesLeft)||(e.pointerType==='mouse'&&e.button!==0))return;
  const p=point(e);
  const hitX=Math.floor(p.x/size),hitY=Math.floor(p.y/size);
  if(!moveAllFloor && walls.some(w=>w.x===hitX&&w.y===hitY))return;
  gesture={id:e.pointerId,origin:p,cell:{x:clamp(Math.floor(p.x/size),0,boardSize-1),y:clamp(Math.floor(p.y/size),0,boardSize-1)},axis:null,offset:0,allFloor:moveAllFloor,base:cells.map(c=>({...c}))};
  canvas.setPointerCapture(e.pointerId);ui();
});
function preview(e) {
  if(!gesture||gesture.id!==e.pointerId)return;
  const p=point(e),dx=p.x-gesture.origin.x,dy=p.y-gesture.origin.y;
  if(!gesture.axis) {
    if(Math.max(Math.abs(dx),Math.abs(dy))<7)return;
    gesture.axis=Math.abs(dx)>=Math.abs(dy)?'x':'y';
    gesture.lane=gesture.allFloor ? null : gesture.cell[gesture.axis==='x'?'y':'x'];
  }
  const raw=(gesture.axis==='x'?dx:dy)/size;
  // A subtle detent keeps travel continuous but gives each cell a tactile catch.
  gesture.offset=raw-Math.sin(raw*Math.PI*2)*.045;
  ui();draw();
}
canvas.addEventListener('pointermove',preview);
function release(e,cancel=false) {
  if(!gesture||gesture.id!==e.pointerId)return;
  if(!cancel)preview(e);
  const g=gesture;gesture=null;
  const to=cancel?0:Math.round(g.offset);
  if(g.axis) {
    const next=ConveyorRules.shift(g.base,g.axis,g.lane,to,boardSize,walls);
    const changed=next.some((c,i)=>c.x!==g.base[i].x||c.y!==g.base[i].y);
    if(changed&&!cancel) {
      movesMade++;
      movesLeft=Math.max(0,ConveyorLevels[levelIndex].moves-movesMade);
    }
    cells=next;
    snap={...g,to,start:performance.now(),duration:180,check:!cancel};
  } else if(!cancel)finishColors(performance.now());
  if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
  ui();draw();
}
canvas.addEventListener('pointerup',e=>release(e));
canvas.addEventListener('pointercancel',e=>release(e,true));
canvas.addEventListener('lostpointercapture',e=>release(e,true));
retry.addEventListener('click',()=>{ loadLevel(stage === 'won' ? 0 : levelIndex); draw(); });
function openDialog(dialog, toggle) {
  if(dialog.open) { dialog.close(); return; }
  if(gesture)release({pointerId:gesture.id},true);
  menuPausedAt=performance.now();
  dialog.showModal();
  toggle.setAttribute('aria-expanded','true');
  ui();draw();
}
levelToggle.addEventListener('click',()=>{ menuTiles(); openDialog(levelMenu,levelToggle); });
settingsToggle.addEventListener('click',()=>openDialog(settingsMenu,settingsToggle));
menuClose.addEventListener('click',()=>levelMenu.close());
settingsClose.addEventListener('click',()=>settingsMenu.close());
moveAllInput.addEventListener('change',()=>{
  moveAllFloor=moveAllInput.checked;
  try { localStorage.setItem('jellyconveyor-move-all',String(moveAllFloor)); } catch {}
  ui();draw();
});
infiniteInput.addEventListener('change',()=>{
  infiniteMoves=infiniteInput.checked;
  try { localStorage.setItem('jellyconveyor-infinite-moves',String(infiniteMoves)); } catch {}
  if(infiniteMoves && stage==='failed') stage='playing';
  if(stage==='playing' && !snap && !pulse) resolveBoard(performance.now());
  ui();draw();
});
for(const [dialog,toggle] of [[levelMenu,levelToggle],[settingsMenu,settingsToggle]]) {
  dialog.addEventListener('close',()=>{
    toggle.setAttribute('aria-expanded','false');
    if(!dialogOpen()) {
      if(menuPausedAt!==null) {
        const pausedFor=performance.now()-menuPausedAt;
        for(const animation of [snap,pulse,transition,intro]) if(animation) animation.start+=pausedFor;
      }
      menuPausedAt=null;
    }
    ui();draw();
  });
  dialog.addEventListener('click',e=>{
    if(e.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();
  });
}
levelGrid.addEventListener('click',e=>{
  const button=e.target.closest('button[data-level]');
  if(!button)return;
  const index=Number(button.dataset.level);
  if(!Number.isInteger(index)||index<0||index>=ConveyorLevels.length)return;
  menuPausedAt=null;
  levelMenu.close();
  loadLevel(index);draw();
});
loadLevel(0);
if(typeof ResizeObserver==='function') new ResizeObserver(resize).observe(canvas);
else { resize(); window.addEventListener('resize',resize); }
// Read-only state for diagnostics and browser verification.
window.jellyconveyor={getState:()=>({level:levelIndex+1,boardSize,walls:walls.map(w=>({...w})),menuOpen:!!levelMenu.open,settingsOpen:!!settingsMenu.open,moveAllFloor,infiniteMoves,stage,visibleLinks:visibleLinks.map(edge=>[...edge]),cells:cells.map(c=>({...c})),movesLeft,movesMade,gesture:gesture?{axis:gesture.axis,lane:gesture.lane,offset:gesture.offset}:null,animating:!!snap,pulsing:!!pulse})};
