'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const R = require('./rules.js');
function game(campaign = false, allFloor = false, storage = new Map(), capabilities = {}) {
  const events = {}, ui = Object.fromEntries(['count','level','overlay','overlay-title','overlay-text','retry','level-toggle','level-menu','menu-close','level-grid','settings-toggle','settings-menu','settings-close','move-all-floor','infinite-moves','count-label','move-counter'].map(id=>[id,{setAttribute(){},addEventListener:(type,f)=>events[id+type]=f}]));
  let now=0, raf, capture=false;
  let fallbackArcs=0;
  const ctx=new Proxy({createLinearGradient:()=>({addColorStop(){}})}, {get:(o,k)=>k==='roundRect'&&capabilities.roundRect===false?undefined:k==='arcTo'?()=>fallbackArcs++:o[k]||(()=>{})});
  const canvas={style:{},setAttribute(){},getContext:()=>ctx,getBoundingClientRect:()=>({left:0,top:0,width:480}),addEventListener:(k,f)=>events[k]=f,setPointerCapture:()=>capture=true,hasPointerCapture:()=>capture,releasePointerCapture:()=>capture=false};
  for(const id of ['level-menu','settings-menu']) {
    ui[id].open=false;
    ui[id].showModal=function(){this.open=true;};
    ui[id].close=function(){this.open=false;events[id+'close']();};
  }
  if(allFloor !== null) storage.set('jellyconveyor-move-all',String(allFloor));
  const env={localStorage:{getItem:key=>storage.get(key) ?? null,setItem:(key,value)=>storage.set(key,value)},document:{getElementById:id=>id==='game'?canvas:ui[id]},window:{addEventListener:(k,f)=>events['window'+k]=f},devicePixelRatio:1,performance:{now:()=>now},requestAnimationFrame:f=>(raf=f,1),cancelAnimationFrame:()=>{},ResizeObserver:class {constructor(f){this.f=f;}observe(){this.f();}}};
  if(capabilities.resizeObserver===false)delete env.ResizeObserver;
  vm.createContext(env);
  for(const file of ['rules.js','levels.js'])vm.runInContext(fs.readFileSync(`${__dirname}/${file}`,'utf8'),env);
  if(!campaign) vm.runInContext('ConveyorLevels.splice(0, ConveyorLevels.length, {...ConveyorLevels[1], moves:10})',env);
  vm.runInContext(fs.readFileSync(`${__dirname}/game.js`,'utf8'),env);
  return {fallbackArcs:()=>fallbackArcs,canvas,storage,setInfinite:value=>{ui['infinite-moves'].checked=value;events['infinite-moveschange']();},openSettings:()=>events['settings-toggleclick'](),closeSettings:()=>events['settings-closeclick'](),setAllFloor:value=>{ui['move-all-floor'].checked=value;events['move-all-floorchange']();},openMenu:()=>events['level-toggleclick'](),closeMenu:()=>events['menu-closeclick'](),selectLevel:index=>events['level-gridclick']({target:{closest:()=>({dataset:{level:String(index)}})}}),retry:()=>events.retryclick(),state:()=>JSON.parse(JSON.stringify(env.window.jellyconveyor.getState())),ui,
    event:(type,x,y)=>events[type]({pointerId:1,clientX:x,clientY:y,pointerType:'mouse',button:0}),
    tick:ms=>{now+=ms;const f=raf;raf=null;if(f)f(now);}};
}
test('cargo stays at the wall; following cargo queues behind it',()=>{
  const b=R.shift(R.initial(),'x',3,8);
  assert.equal(b.find(c=>c.id===2).x,3);
  assert.equal(b.find(c=>c.id===5).x,2);
  assert.equal(new Set(b.map(c=>`${c.x},${c.y}`)).size,b.length);
});
test('diagonals and opposite walls never connect',()=>{
  for(const [x,y] of [[1,1],[3,0]])assert.deepEqual(R.completed([{id:0,x:0,y:0,color:'green'},{id:1,x,y,color:'green'}]),[]);
});
test('empty cell starts a belt; first axis locks; moves debit only on release',()=>{
  const g=game();g.event('pointerdown',180,60);g.event('pointermove',300,60);
  assert.equal(g.state().gesture.axis,'x');assert.equal(g.state().movesLeft,10);
  g.event('pointermove',300,420);assert.equal(g.state().gesture.axis,'x');
  g.event('pointerup',300,420);assert.equal(g.state().movesLeft,9);
  assert.equal(g.state().cells.find(c=>c.id===0).x,1);assert.equal(g.state().cells.find(c=>c.id===1).x,3);
});
test('multi-cell drag can return to origin without spending moves',()=>{
  const g=game(),initial=g.state().cells;
  g.event('pointerdown',60,180);g.event('pointermove',420,180);
  g.event('pointermove',60,180);
  g.event('pointerup',60,180);assert.equal(g.state().movesLeft,10);assert.deepEqual(g.state().cells,initial);
});
test('multi-cell change costs one move; empty and blocked belts cost none',()=>{
  const g=game();g.event('pointerdown',60,60);g.event('pointerup',300,60);g.tick(200);
  assert.equal(g.state().movesLeft,9);
  g.event('pointerdown',60,180);g.event('pointerup',2400,180);g.tick(200);
  assert.equal(g.state().movesLeft,9);
  g.event('pointerdown',60,60);g.event('pointerup',300,60);g.tick(200);
  assert.equal(g.state().movesLeft,9);
});
test('one remaining move allows multiple cells; zero moves disables gestures',()=>{
  const g=game();
  for(let i=0;i<9;i++) {
    g.event('pointerdown',60,60);g.event('pointerup',60+(i%2===0?120:-120),60);g.tick(200);
  }
  assert.equal(g.state().movesLeft,1);
  g.event('pointerdown',420,420);g.event('pointerup',60,420);g.tick(200);
  assert.equal(g.state().movesLeft,0);
  assert.equal(g.state().cells.find(c=>c.id===2).x,1);
  g.event('pointerdown',60,60);assert.equal(g.state().gesture,null);
});
test('complete colors pulse after release and disappear',()=>{
  const g=game();
  for(const [x,y,dx,dy] of [[180,60,240,0],[300,300,-120,0],[420,420,0,-240]]) {
    g.event('pointerdown',x,y);g.event('pointermove',x+dx,y+dy);
    assert.equal(g.state().pulsing,false);
    g.event('pointerup',x+dx,y+dy);g.tick(200);g.tick(700);
  }
  assert.equal(g.state().movesLeft,7);assert.deepEqual(g.state().cells,[]);
  g.event('pointerdown',60,300);g.event('pointerup',180,300);g.tick(200);
  assert.deepEqual(g.state().cells,[]);assert.equal(g.state().pulsing,false);
});
test('cancelled gesture restores cargo and budget',()=>{
  const g=game(),initial=g.state().cells;
  g.event('pointerdown',180,420);g.event('pointermove',300,420);g.event('pointercancel',300,420);g.tick(200);
  assert.deepEqual(g.state().cells,initial);assert.equal(g.state().movesLeft,10);
});

test('reference: vertical pair stays blocked by green while lone pink moves right',()=>{
  const base=R.shift(R.initial(),'x',3,1);
  const n=R.shift(base,'x',2,1);
  assert.equal(n.find(c=>c.id===3).x,1);
  for(const id of [4,5])assert.equal(n.find(c=>c.id===id).x,2);
  assert.equal(n.find(c=>c.id===2).x,3);
});
test('either belt carries the whole vertical organism left without breaking it',()=>{
  const base=R.shift(R.initial(),'x',3,1);
  for(const lane of [2,3]) {
    const n=R.shift(base,'x',lane,-1);
    for(const id of [4,5])assert.equal(n.find(c=>c.id===id).x,1);
    assert.ok(R.links(n).some(edge=>edge.includes(4)&&edge.includes(5)));
  }
});
test('walls stop an entire multi-row organism and cancellation restores it',()=>{
  const group=[{id:0,x:0,y:0,color:'red'},{id:1,x:0,y:1,color:'red'},{id:2,x:1,y:1,color:'red'}];
  assert.deepEqual(R.shift(group,'x',0,-3),group);
  const n=R.shift(group,'x',0,8);
  assert.equal(n[0].x,2);assert.equal(n[1].x,2);assert.equal(n[2].x,3);
  assert.equal(R.organisms(n).length,1);
});

test('live bridges predict release and withdraw on reversal without committing merges',()=>{
  const g=game();g.event('pointerdown',180,420);
  g.event('pointermove',246,420); // 0.55 cells: snaps to one cell if released.
  assert.ok(g.state().visibleLinks.some(([a,b])=>a===4&&b===5));
  assert.equal(g.state().cells.find(c=>c.id===5).x,1);
  assert.equal(g.state().pulsing,false);assert.equal(g.state().movesLeft,10);
  g.event('pointermove',234,420); // 0.45 cells: would snap back, bridge disappears.
  assert.ok(!g.state().visibleLinks.some(([a,b])=>a===4&&b===5));
  g.event('pointercancel',234,420);g.tick(200);
  assert.equal(g.state().movesLeft,10);
});
test('all authored solutions clear their boards within budgets and spare moves',()=>{
  const levels=require('./levels.js'),{move}=require('./solver.js');

  for(const level of levels) {

    assert.ok(level.moves>=level.solution.length+2);
    assert.equal(R.completed(level.cells).length,0);
    assert.ok(level.cells.every(c=>Number.isInteger(c.x)&&Number.isInteger(c.y)&&c.x>=0&&c.y>=0&&c.x<level.size&&c.y<level.size));
    assert.ok(level.walls.every(w=>Number.isInteger(w.x)&&Number.isInteger(w.y)&&w.x>=0&&w.y>=0&&w.x<level.size&&w.y<level.size));
    assert.equal(new Set(level.walls.map(w=>w.x+','+w.y)).size,level.walls.length);
    const occupied=new Set(level.cells.map(c=>c.x+','+c.y));
    assert.equal(occupied.size,level.cells.length);
    assert.ok((level.walls||[]).every(w=>!occupied.has(w.x+','+w.y)));
    let board=level.cells;
    for(const [axis,lane,offset] of level.solution) {
      const next=move(board,level.size,axis,lane,offset,level.walls);
      assert.notDeepEqual(next,board,'Every solution gesture must change the board');
      assert.ok(next.every(c=>c.x>=0&&c.y>=0&&c.x<level.size&&c.y<level.size));
      assert.equal(new Set(next.map(c=>c.x+','+c.y)).size,next.length);
      assert.ok(next.every(c=>!(level.walls||[]).some(w=>w.x===c.x&&w.y===c.y)));
      board=next;
    }
    assert.deepEqual(board,[]);
  }
});
test('play the full campaign through actual pointer events, including final victory and replay',()=>{
  const g=game(true),levels=require('./levels.js');
  for(let index=0;index<levels.length;index++) {
    const level=levels[index];
    assert.equal(g.state().level,index+1);assert.equal(g.state().boardSize,level.size);
    assert.equal(g.state().movesLeft,level.moves);
    const size=480/level.size;
    for(const [axis,lane,offset] of level.solution) {
      const along=Array.from({length:level.size},(_,i)=>i).find(i=>!level.walls.some(w=>w.x===(axis==='x'?i:lane)&&w.y===(axis==='y'?i:lane)));
      assert.notEqual(along,undefined,'A selected lane must contain a playable starting cell');
      const x=axis==='x' ? (along+.5)*size : (lane+.5)*size;
      const y=axis==='y' ? (along+.5)*size : (lane+.5)*size;
      g.event('pointerdown',x,y);g.event('pointerup',x+(axis==='x'?offset*size:0),y+(axis==='y'?offset*size:0));
      g.tick(200);g.tick(700);
    }
    assert.deepEqual(g.state().cells,[]);
    assert.equal(g.state().movesLeft,level.moves-level.solution.length);
    assert.equal(g.state().stage,index===levels.length-1?'won':'between');
    g.tick(900);
  }
  assert.equal(g.ui.retry.hidden,false);assert.equal(g.ui['overlay-title'].textContent,'Все уровни пройдены!');
  assert.equal(g.ui['overlay-text'].textContent,`${levels.length} / ${levels.length}`);
  g.retry();assert.equal(g.state().level,1);assert.equal(g.state().stage,'playing');
  assert.equal(g.state().movesLeft,levels[0].moves);
});
test('exhausted level shows retry and retry restores its own board',()=>{
  const g=game();
  for(let i=0;i<10;i++) {
    g.event('pointerdown',60,60);g.event('pointerup',60+(i%2===0?120:-120),60);g.tick(200);
  }
  assert.equal(g.state().stage,'failed');assert.equal(g.ui.retry.hidden,false);
  g.retry();assert.equal(g.state().movesLeft,10);assert.equal(g.state().stage,'playing');
  assert.deepEqual(g.state().cells,R.initial());
});

test('stationary wall stops a complete organism and cannot be tunnelled through',()=>{
  const board=[{id:0,x:0,y:1,color:'red'},{id:1,x:0,y:2,color:'red'}];
  const walls=[{x:2,y:2}],original=JSON.stringify(walls);
  for(const offset of [1.6,10]) {
    const next=R.shift(board,'x',1,offset,5,walls);
    assert.equal(next[0].x,1);assert.equal(next[1].x,1);
  }
  assert.equal(JSON.stringify(walls),original);
  assert.deepEqual(R.shift(board,'x',1,-10,5,walls),board);
});
test('preview respects walls rather than drawing a connection through them',()=>{
  const board=[{id:0,x:0,y:0,color:'red'},{id:1,x:3,y:0,color:'red'}];
  assert.deepEqual(R.previewLinks(board,'x',0,8,4,[{x:2,y:0}]),[]);
});
test('menu selects any level with its own board, walls and budget',()=>{
  const g=game(true),levels=require('./levels.js');
  g.openMenu();assert.equal(g.state().menuOpen,true);
  assert.equal((g.ui['level-grid'].innerHTML.match(/data-level=/g)||[]).length,levels.length);
  for(const index of [levels.length-1,5,8,0]) {
    if(!g.state().menuOpen)g.openMenu();
    g.selectLevel(index);
    assert.equal(g.state().menuOpen,false);assert.equal(g.state().level,index+1);
    assert.equal(g.state().boardSize,levels[index].size);assert.equal(g.state().movesLeft,levels[index].moves);
    assert.deepEqual(g.state().walls,levels[index].walls);
    assert.deepEqual(g.state().cells,levels[index].cells);
  }
});
test('dragging a white wall is ignored',()=>{
  const g=game(true);g.openMenu();g.selectLevel(5);
  const before=g.state(),size=480/before.boardSize,w=before.walls[0];
  g.event('pointerdown',(w.x+.5)*size,(w.y+.5)*size);
  g.event('pointerup',(w.x+1.5)*size,(w.y+.5)*size);
  assert.equal(g.state().gesture,null);assert.equal(g.state().movesLeft,before.movesLeft);
  assert.deepEqual(g.state().cells,before.cells);
});
test('opening the menu pauses an ongoing color pulse; closing resumes it',()=>{
  const g=game(true);g.event('pointerdown',400,80);g.event('pointerup',80,80);g.tick(200);
  assert.equal(g.state().pulsing,true);
  g.openMenu();g.tick(5000);
  assert.equal(g.state().pulsing,true);assert.equal(g.state().cells.length,4);
  g.closeMenu();g.tick(700);
  assert.equal(g.state().pulsing,false);assert.equal(g.state().cells.length,2);
});


test('Move All Floor defaults off, persists the choice, and level changes keep it',()=>{
  const storage=new Map(),g=game(true,null,storage);
  assert.equal(g.state().moveAllFloor,false);assert.equal(g.ui['move-all-floor'].checked,false);
  g.openSettings();g.setAllFloor(false);g.closeSettings();
  g.openMenu();g.selectLevel(14);
  assert.equal(g.state().moveAllFloor,false);
  const reloaded=game(true,null,storage);
  assert.equal(reloaded.state().moveAllFloor,false);assert.equal(reloaded.ui['move-all-floor'].checked,false);
  reloaded.setAllFloor(true);assert.equal(game(true,null,storage).state().moveAllFloor,true);
});
test('all-floor collisions propagate simultaneously while chains remain rigid',()=>{
  const board=[{id:0,x:0,y:0,color:'red'},{id:1,x:0,y:1,color:'red'},
    {id:2,x:1,y:1,color:'green'},{id:3,x:3,y:1,color:'blue'},{id:4,x:1,y:4,color:'orange'}];
  const walls=[{x:4,y:1}];
  const n=R.shift(board,'x',null,9,6,walls);
  assert.deepEqual(n.map(c=>c.x),[1,1,2,3,5]);
  assert.deepEqual(R.shift([...board].reverse(),'x',null,9,6,walls).reverse(),n);
  assert.equal(new Set(n.map(c=>c.x+','+c.y)).size,n.length);
  assert.ok(R.links(n).some(([a,b])=>a===0&&b===1));
  const fractional=R.shift(board,'x',null,.6,6,walls);
  assert.equal(fractional[0].x,.6);assert.equal(fractional[1].x,.6);assert.equal(fractional[3].x,3);
});
test('all-floor gesture moves different lanes, previews both colors and spends once on release',()=>{
  const g=game(true,true),before=g.state();
  g.event('pointerdown',80,240);g.event('pointermove',176,240);
  assert.equal(g.state().gesture.lane,null);assert.equal(g.state().visibleLinks.length,2);
  assert.equal(g.state().movesLeft,before.movesLeft);assert.deepEqual(g.state().cells,before.cells);
  g.event('pointerup',240,240);
  assert.deepEqual(g.state().cells,R.shift(before.cells,'x',null,1,3));
  assert.equal(g.state().movesLeft,before.movesLeft-1);
  g.tick(200);assert.equal(g.state().pulsing,true);
  g.tick(700);assert.deepEqual(g.state().cells,[]);
});
test('all-floor reversal and cancellation restore preview, cargo and budget',()=>{
  const g=game(true,true),before=g.state();
  g.event('pointerdown',80,240);g.event('pointermove',176,240);
  assert.equal(g.state().visibleLinks.length,2);
  g.event('pointermove',80,240);assert.deepEqual(g.state().visibleLinks,[]);
  g.event('pointerup',80,240);g.tick(200);
  assert.deepEqual(g.state().cells,before.cells);assert.equal(g.state().movesLeft,before.movesLeft);
  g.event('pointerdown',80,240);g.event('pointermove',400,240);
  g.event('pointercancel',400,240);g.tick(200);
  assert.deepEqual(g.state().cells,before.cells);assert.equal(g.state().movesLeft,before.movesLeft);
});
test('all-floor swipe may begin on a white wall while that wall remains stationary',()=>{
  const g=game(true,true);g.openMenu();g.selectLevel(5);
  const before=g.state(),size=480/before.boardSize,w=before.walls[0];
  g.event('pointerdown',(w.x+.5)*size,(w.y+.5)*size);
  g.event('pointerup',(w.x+1.5)*size,(w.y+.5)*size);
  const after=g.state();
  assert.equal(after.movesLeft,before.movesLeft-1);assert.deepEqual(after.walls,before.walls);
  assert.deepEqual(after.cells,R.shift(before.cells,'x',null,1,before.boardSize,before.walls));
});
test('settings pauses animations, blocks input, and switching mode costs no move',()=>{
  const g=game(true,true);g.event('pointerdown',80,240);g.event('pointerup',240,240);g.tick(200);
  const before=g.state();assert.equal(before.pulsing,true);
  g.openSettings();g.setAllFloor(false);g.tick(5000);
  g.event('pointerdown',80,240);assert.equal(g.state().gesture,null);
  assert.equal(g.state().pulsing,true);assert.deepEqual(g.state().cells,before.cells);
  assert.equal(g.state().movesLeft,before.movesLeft);
  g.closeSettings();g.tick(700);assert.deepEqual(g.state().cells,[]);
  g.tick(900);assert.equal(g.state().level,2);assert.equal(g.state().moveAllFloor,false);
  g.event('pointerdown',60,180);g.event('pointerup',300,180);g.tick(200);
  assert.equal(g.state().movesLeft,8); // The individual empty row moves only the floor.
});
test('all campaign levels clear through all-floor pointer gestures within existing budgets',()=>{
  const g=game(true,true),levels=require('./levels.js');
  for(let index=0;index<levels.length;index++) {
    const level=levels[index],size=480/level.size;
    assert.equal(g.state().level,index+1);
    assert.ok(level.moves>=level.allFloorSolution.length+2);
    for(const [axis,lane,offset] of level.allFloorSolution) {
      assert.equal(lane,null);
      const along=(offset>0?.5:level.size-.5)*size;
      const x=axis==='x'?along:size/2,y=axis==='y'?along:size/2;
      const before=g.state();
      g.event('pointerdown',x,y);g.event('pointerup',x+(axis==='x'?offset*size:0),y+(axis==='y'?offset*size:0));
      assert.equal(g.state().movesLeft,before.movesLeft-1);
      g.tick(200);g.tick(700);
      const after=g.state();
      assert.ok(after.cells.every(c=>c.x>=0&&c.y>=0&&c.x<level.size&&c.y<level.size));
      assert.equal(new Set(after.cells.map(c=>c.x+','+c.y)).size,after.cells.length);
      assert.ok(after.cells.every(c=>!level.walls.some(w=>w.x===c.x&&w.y===c.y)));
    }
    assert.deepEqual(g.state().cells,[]);
    assert.equal(g.state().movesLeft,level.moves-level.allFloorSolution.length);
    assert.equal(g.state().stage,index===levels.length-1?'won':'between');
    g.tick(900);
  }
});

test('new campaign adds twenty distinct motifs with initial chains and generous budgets',()=>{
  const levels=require('./levels.js'),newLevels=levels.slice(15,35);
  assert.equal(newLevels.length,20);
  assert.equal(new Set(newLevels.map(l=>l.name)).size,20);
  assert.equal(new Set(newLevels.map(l=>JSON.stringify([l.size,l.walls]))).size,20);
  assert.ok(new Set(newLevels.map(l=>l.size)).size>=4);
  assert.ok(new Set(newLevels.map(l=>l.cells.length)).size>=5);
  for(const level of newLevels) {
    assert.ok(level.walls.length>0);
    assert.equal(R.completed(level.cells).length,0);
    const chains=R.organisms(level.cells).filter(g=>g.length>1);
    assert.ok(chains.length>=2);
    assert.ok(chains.some(g=>g.length>=3));
    assert.ok(level.moves>=Math.max(level.solution.length,level.allFloorSolution.length)+8);
  }
});


test('infinite mode defaults off, switches the label and persists without resetting the board',()=>{
  const storage=new Map(),g=game(false,null,storage);
  assert.equal(g.state().infiniteMoves,false);assert.equal(g.ui['infinite-moves'].checked,false);
  assert.equal(g.ui['count-label'].textContent,'MOVES LEFT');assert.equal(g.ui.count.textContent,10);
  g.event('pointerdown',60,60);g.event('pointerup',180,60);g.tick(200);
  const before=g.state();g.openSettings();g.setInfinite(true);
  assert.equal(g.ui['count-label'].textContent,'MOVES MADE');assert.equal(g.ui.count.textContent,1);
  assert.deepEqual(g.state().cells,before.cells);assert.equal(g.state().movesMade,1);
  g.closeSettings();assert.equal(game(false,null,storage).state().infiniteMoves,true);
  g.setInfinite(false);assert.equal(g.ui['count-label'].textContent,'MOVES LEFT');assert.equal(g.ui.count.textContent,9);
  assert.equal(game(false,null,storage).state().infiniteMoves,false);
});
test('unlimited gestures count once each after release and continue beyond the budget',()=>{
  const g=game();g.setInfinite(true);
  for(let i=0;i<14;i++) {
    g.event('pointerdown',60,60);g.event('pointermove',60+(i%2===0?120:-120),60);
    assert.equal(g.state().movesMade,i);
    g.event('pointerup',60+(i%2===0?120:-120),60);g.tick(200);
    assert.equal(g.ui.count.textContent,i+1);assert.equal(g.state().stage,'playing');
  }
  assert.equal(g.state().movesLeft,0);assert.equal(g.state().movesMade,14);
  g.setInfinite(false);assert.equal(g.state().stage,'failed');assert.equal(g.ui.count.textContent,0);
  g.setInfinite(true);assert.equal(g.state().stage,'playing');assert.equal(g.ui.count.textContent,14);
  g.event('pointerdown',60,60);g.event('pointerup',180,60);g.tick(200);
  assert.equal(g.state().movesMade,15);
});
test('unlimited counter ignores cancelled, blocked, empty and reversed gestures',()=>{
  const g=game();g.setInfinite(true);
  g.event('pointerdown',60,180);g.event('pointerup',420,180);g.tick(200);
  const blocked=game();blocked.setInfinite(true);
  blocked.event('pointerdown',60,60);blocked.event('pointerup',300,60);blocked.tick(200);
  blocked.event('pointerdown',60,60);blocked.event('pointerup',420,60);blocked.tick(200);
  assert.equal(blocked.state().movesMade,1);
  g.event('pointerdown',60,60);g.event('pointermove',300,60);g.event('pointercancel',300,60);g.tick(200);
  g.event('pointerdown',60,60);g.event('pointermove',300,60);g.event('pointerup',60,60);g.tick(200);
  assert.equal(g.state().movesMade,0);assert.equal(g.ui.count.textContent,0);
  g.event('pointerdown',60,60);g.event('pointerup',300,60);g.tick(200);
  assert.equal(g.state().movesMade,1);assert.equal(g.ui.count.textContent,1);
});
test('unlimited setting survives level selection but each level resets made moves',()=>{
  const g=game(true,true);g.setInfinite(true);
  g.event('pointerdown',80,240);g.event('pointerup',240,240);g.tick(200);g.tick(700);
  assert.deepEqual(g.state().cells,[]);assert.equal(g.state().stage,'between');assert.equal(g.ui.count.textContent,1);
  g.tick(900);assert.equal(g.state().level,2);assert.equal(g.ui.count.textContent,0);
  assert.equal(g.state().infiniteMoves,true);assert.equal(g.ui['count-label'].textContent,'MOVES MADE');
  g.event('pointerdown',60,180);g.event('pointerup',180,180);g.tick(200);assert.equal(g.ui.count.textContent,1);
  g.openMenu();g.selectLevel(34);assert.equal(g.state().movesMade,0);assert.equal(g.state().infiniteMoves,true);
});
test('enabling unlimited mode rescues an exhausted level without restoring its cargo',()=>{
  const g=game();
  for(let i=0;i<10;i++) {g.event('pointerdown',60,60);g.event('pointerup',60+(i%2===0?120:-120),60);g.tick(200);}
  const before=g.state();assert.equal(before.stage,'failed');
  g.openSettings();g.setInfinite(true);assert.equal(g.state().stage,'playing');assert.deepEqual(g.state().cells,before.cells);
  assert.equal(g.state().movesMade,10);assert.equal(g.ui.overlay.hidden,true);
  g.closeSettings();g.event('pointerdown',60,60);g.event('pointerup',180,60);g.tick(200);
  assert.equal(g.state().movesMade,11);
  g.retry();assert.equal(g.state().movesMade,0);assert.equal(g.state().infiniteMoves,true);
});


test('older Canvas without roundRect still draws jelly and accepts gestures',()=>{
  const g=game(false,false,new Map(),{roundRect:false});
  assert.ok(g.fallbackArcs()>0);assert.equal(g.canvas.style.height,'480px');
  g.event('pointerdown',60,60);g.event('pointerup',180,60);g.tick(200);
  assert.equal(g.state().movesMade,1);assert.equal(g.state().cells.find(c=>c.id===0).x,1);
});
test('startup without ResizeObserver still sizes and draws the board',()=>{
  const g=game(false,false,new Map(),{resizeObserver:false,roundRect:false});
  assert.equal(g.canvas.width,480);assert.equal(g.canvas.height,480);assert.ok(g.fallbackArcs()>0);
  g.event('pointerdown',60,60);g.event('pointerup',180,60);g.tick(200);
  assert.equal(g.state().movesMade,1);
});

test('cage levels enclose other colors and release them before their color can clear in either mode',()=>{
  const levels=require('./levels.js').filter(l=>l.theme==='cage'),{move}=require('./solver.js');
  assert.equal(levels.length,6);
  // Flood from every board edge with only this shell blocked. Unreachable
  // cells are inside a closed organism, rather than merely beside a chain.
  function interior(shell,size) {
    const blocked=new Set(shell.map(c=>c.x+','+c.y)),seen=new Set(),queue=[];
    const add=(x,y)=>{
      const key=x+','+y;
      if(x<0||y<0||x>=size||y>=size||blocked.has(key)||seen.has(key))return;
      seen.add(key);queue.push({x,y});
    };
    for(let i=0;i<size;i++){add(i,0);add(i,size-1);add(0,i);add(size-1,i);}
    for(let i=0;i<queue.length;i++) {
      const {x,y}=queue[i];add(x-1,y);add(x+1,y);add(x,y-1);add(x,y+1);
    }
    return c=>!blocked.has(c.x+','+c.y)&&!seen.has(c.x+','+c.y);
  }
  for(const level of levels) {
    const cages=R.organisms(level.cells).flatMap(shell=>{
      const captives=level.cells.filter(interior(shell,level.size));
      return captives.length?[{ids:shell.map(c=>c.id),captives}]:[];
    });
    assert.ok(cages.length>0,level.name);
    if(level.name==='Матрешка')assert.equal(cages.length,2);
    for(const path of [level.solution,level.allFloorSolution]) {
      let board=level.cells;
      for(const [axis,lane,offset] of path) {
        const shifted=R.shift(board,axis,lane,offset,level.size,level.walls);
        const next=move(board,level.size,axis,lane,offset,level.walls);
        for(const cage of cages) {
          const shell=shifted.filter(c=>cage.ids.includes(c.id));
          if(!shell.length)continue;
          const remainsInside=interior(shell,level.size);
          for(const captive of cage.captives) {
            const current=shifted.find(c=>c.id===captive.id);
            assert.ok(current&&remainsInside(current),`${level.name}: captive cannot escape a living shell`);
            assert.ok(next.some(c=>c.id===captive.id),`${level.name}: shell must clear before captive color`);
          }
        }
        board=next;
      }
      assert.deepEqual(board,[]);
    }
    assert.ok(level.moves>=Math.max(level.solution.length,level.allFloorSolution.length)+10);
  }
});

test('captive jelly cannot move relative to its tight shell until the shell pulse finishes',()=>{
  const g=game(true),level=require('./levels.js')[35],size=480/level.size;
  g.openMenu();g.selectLevel(35);
  const captive=level.cells.find(c=>c.color==='blue'&&c.x===2&&c.y===2);
  const anchor=level.cells.find(c=>c.color==='green'&&c.x===1&&c.y===1);
  for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
    g.openMenu();g.selectLevel(35);
    g.event('pointerdown',2.5*size,2.5*size);
    g.event('pointerup',(2.5+dx)*size,(2.5+dy)*size);g.tick(200);
    const state=g.state(),inner=state.cells.find(c=>c.id===captive.id),shell=state.cells.find(c=>c.id===anchor.id);
    assert.equal(inner.x-shell.x,1);assert.equal(inner.y-shell.y,1);
  }
  g.openMenu();g.selectLevel(35);
  g.event('pointerdown',size/2,size/2);g.event('pointerup',1.5*size,size/2);g.tick(200);
  assert.equal(g.state().pulsing,true);
  assert.ok(g.state().cells.some(c=>c.color==='green'));
  g.event('pointerdown',2.5*size,2.5*size);g.event('pointerup',4.5*size,2.5*size);
  assert.equal(g.state().cells.find(c=>c.id===captive.id).x,2);
  g.tick(700);assert.ok(g.state().cells.every(c=>c.color==='blue'));
  g.event('pointerdown',2.5*size,2.5*size);g.event('pointerup',4.5*size,2.5*size);g.tick(200);
  assert.equal(g.state().cells.find(c=>c.id===captive.id).x,4);
  assert.equal(g.state().movesMade,2);
});
