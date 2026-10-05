'use strict';
// Offline authoring tool: searches actual conveyor moves, including rigid
// organisms, obstacles and removal of completed colors. Never runs in the UI.
const R = require('./rules.js');
const key = board => {
  const colors = new Map();
  for (const c of board) {
    if (!colors.has(c.color)) colors.set(c.color, []);
    colors.get(c.color).push(`${c.x},${c.y}`);
  }
  return [...colors].sort(([a],[b])=>a.localeCompare(b))
    .map(([color,positions])=>color+':'+positions.sort().join(';')).join('|');
};
function move(board,size,axis,lane,offset,walls=[]) {
  const shifted=R.shift(board,axis,lane,offset,size,walls);
  const ids=new Set(R.completed(shifted).flat());
  return shifted.filter(c=>!ids.has(c.id));
}
function score(board) {
  let total=0;
  for(const color of new Set(board.map(c=>c.color))) {
    const groups=R.organisms(board.filter(c=>c.color===color));
    total+=9+groups.length*3;
    // Minimum spanning tree between organisms estimates how spread out the
    // remaining color is without assuming independent cargo can move.
    const reached=new Set([0]);
    while(reached.size<groups.length) {
      let best=Infinity,target=-1;
      for(const i of reached)for(let j=0;j<groups.length;j++)if(!reached.has(j)) {
        for(const a of groups[i])for(const b of groups[j]) {
          const d=Math.abs(a.x-b.x)+Math.abs(a.y-b.y)-1;
          if(d<best){best=d;target=j;}
        }
      }
      total+=best*.7;reached.add(target);
    }
  }
  return total;
}
function solve(board,size,{beam=600,maxDepth=16,maxStates=300000,walls=[],allFloor=false}={}) {
  let frontier=[{board,path:[],score:score(board)}];
  const visited=new Set([key(board)]);
  for(let depth=1;depth<=maxDepth;depth++) {
    const next=[];
    for(const state of frontier)for(const axis of ['x','y']) {
      const cross=axis==='x'?'y':'x';
      for(const lane of (allFloor ? [null] : new Set(state.board.map(c=>c[cross]))))for(let offset=1-size;offset<size;offset++) {
        if(!offset)continue;
        const b=move(state.board,size,axis,lane,offset,walls),k=key(b);
        if(visited.has(k))continue;
        const path=[...state.path,[axis,lane,offset]];
        if(!b.length)return {solution:path,states:visited.size,optimal:beam===Infinity};
        visited.add(k);next.push({board:b,path,score:score(b)});
      }
    }
    if(!next.length||visited.size>maxStates)return null;
    next.sort((a,b)=>a.score-b.score);
    frontier=next.slice(0,beam);
  }
  return null;
}
module.exports={solve,move,key};
