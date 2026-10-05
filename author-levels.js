'use strict';
// Offline, deterministic authoring. Each motif needs a verified solution in both
// movement modes before it can become a level. Output stays separate for review.
const fs = require('node:fs');
const R = require('./rules.js');
const { solve } = require('./solver.js');
const motifs = [
  ['Бублик', 5, 2, 3, ['.....','.....','..#..','.....','.....']],
  ['Шахматные острова', 6, 3, 3, ['......','.#.#..','......','..#.#.','......','......']],
  ['Две двери', 6, 3, 3, ['......','..#...','..#...','......','..#...','......']],
  ['Подкова', 6, 3, 3, ['......','......','.#..#.','.#..#.','.####.','......']],
  ['Песочные часы', 7, 2, 4, ['.......','#.....#','##...##','###.###','##...##','#.....#','.......']],
  ['Лестница', 6, 3, 3, ['......','.#....','..#...','...#..','....#.','......']],
  ['Длинные руки', 7, 3, 4, ['.......','.......','...#...','..###..','...#...','.......','.......']],
  ['Змейка', 7, 3, 3, ['.......','.####..','.......','..####.','.......','.####..','.......']],
  ['Четыре комнаты', 7, 4, 3, ['...#...','.......','...#...','#.###.#','...#...','.......','...#...']],
  ['Двойное кольцо', 7, 3, 3, ['.......','.##.##.','.#...#.','.......','.#...#.','.##.##.','.......']],
  ['Серпантин', 7, 3, 4, ['.......','.###...','...#...','...#...','...#...','...###.','.......']],
  ['Крылья', 7, 4, 3, ['.......','.#...#.','..#.#..','...#...','..#.#..','.#...#.','.......']],
  ['Колодец', 7, 3, 4, ['.......','.......','..###..','..#.#..','..#.#..','.......','.......']],
  ['Соты', 7, 4, 3, ['#.....#','.......','..#.#..','.......','..#.#..','.......','#.....#']],
  ['Крестовые проходы', 8, 4, 3, ['...##...','...##...','........','##.##.##','##.##.##','........','...##...','...##...']],
  ['Рояль', 8, 3, 4, ['........','.#.#.#..','.#.#.#..','........','..#.#.#.','..#.#.#.','........','........']],
  ['Галактика', 8, 4, 4, ['........','..#..#..','.#....#.','...##...','...##...','.#....#.','..#..#..','........']],
  ['Сломанный мост', 8, 4, 4, ['........','........','.##..##.','........','........','.##..##.','........','........']],
  ['Бабочка', 8, 4, 4, ['#......#','##....##','###..###','........','........','###..###','##....##','#......#']],
  ['Желейный мегаполис', 8, 4, 4, ['........','.##..##.','.##..##.','........','........','.##..##.','.##..##.','........']],
];
const colors = ['green','red','blue','orange'];
function random(seed) {
  return () => { seed = (Math.imul(seed,1664525)+1013904223)>>>0; return seed/4294967296; };
}
function boardFor(spec,seed) {
  const [,size,colorCount,chainSize,rows]=spec,rand=random(seed),taken=new Set(),walls=[];
  rows.forEach((row,y)=>[...row].forEach((char,x)=>{if(char==='#'){walls.push({x,y});taken.add(x+','+y);}}));
  const cells=[];
  const free=()=>{const list=[];for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(!taken.has(x+','+y))list.push({x,y});return list;};
  const pick=list=>list[Math.floor(rand()*list.length)];
  function add(p,color) { cells.push({...p,color,id:cells.length});taken.add(p.x+','+p.y); }
  for(let i=0;i<colorCount;i++) {
    const color=colors[i],chain=[];
    let start=pick(free()); if(!start)return null;
    add(start,color);chain.push(start);
    for(let j=1;j<chainSize;j++) {
      const neighbors=free().filter(p=>chain.some(a=>Math.abs(a.x-p.x)+Math.abs(a.y-p.y)===1));
      if(!neighbors.length)return null;
      const p=pick(neighbors);add(p,color);chain.push(p);
    }
    // Each organism needs two loose pieces. Keep them separate initially so a
    // color never starts complete and the missing pieces really matter.
    for(let j=0;j<2;j++) {
      const choices=free().filter(p=>!cells.some(c=>c.color===color&&Math.abs(c.x-p.x)+Math.abs(c.y-p.y)<=1));
      if(!choices.length)return null;
      add(pick(choices),color);
    }
  }
  if(R.completed(cells).length)return null;
  return {size,cells,walls};
}
function author(output) {
  const levels=[];
  for(let index=0;index<motifs.length;index++) {
    const motif=motifs[index];let accepted=false;
    for(let attempt=0;attempt<100;attempt++) {
      const seed=16000+index*1009+attempt*131;
      const level=boardFor(motif,seed);if(!level)continue;
      console.log(`Search ${index+16} ${motif[0]} seed ${seed}`);
      const all=solve(level.cells,level.size,{walls:level.walls,allFloor:true,beam:250,maxDepth:24,maxStates:60000});
      if(!all || all.solution.length<4){console.log('Skip global');continue;}
      const single=solve(level.cells,level.size,{walls:level.walls,beam:160,maxDepth:26,maxStates:100000});
      if(!single){console.log('Skip individual');continue;}
      const moves=Math.max(24,Math.ceil(Math.max(all.solution.length,single.solution.length)*1.9)+8);
      levels.push({...level,name:motif[0],moves,solution:single.solution,allFloorSolution:all.solution,optimal:false,authorSeed:seed});
      fs.writeFileSync(output,JSON.stringify(levels,null,2));
      console.log(`Accepted ${index+16} ${motif[0]}: ${level.cells.length} jelly, ${level.walls.length} walls, solutions ${single.solution.length}/${all.solution.length}, budget ${moves}`);
      accepted=true;break;
    }
    if(!accepted)throw Error(`No verified layout for ${motif[0]}`);
  }
}
if(require.main===module)author(process.argv[2] || '/tmp/jelly-new-levels.json');
module.exports={motifs,boardFor};
