'use strict';
// Handcrafted wall motifs with deterministic placements, verified in ordinary mode.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const {layout} = require('./author-nested.js');
const {solve,move} = require('./solver.js');
const {boardFor} = require('./author-levels.js');
const motifs = [
  ['Вокруг клумбы', ['G..G','.#..','R...','..R.'], {}],
  ['Почтовые ящики', ['GG..','..#G','R#..','..RR'], {}],
  ['Две пристани', ['GG..G','..#..','..#..','R.#..','RR..R'], {}],
  ['Замочная скважина', ['GG..G','.#.#.','.....','.#.#.','RR..R'], {}],
  ['Вертушка', ['G...G','..#..','.#.#.','..#..','RR..R'], {}],
  ['Секрет в кармане', ['GG..G','..#..','.....','.#...','RR...'], {'1,0':'R'}],
  ['Разводной мост', ['GG...G','..##..','......','.#..#.','......','RR...R'], {}],
  ['Три лепестка', ['GG...G','..#...','B.#...','BB...B','...#..','RR...R'], {}],
  ['Посылка с сюрпризом', ['GG...G','..#...','......','...#..','RR...R','BB...B'], {'1,0':'B','5,0':'R'}],
  ['Сад матрешек', ['GG...G','.#..#.','......','..##..','RR...R','BB...B'], {'1,0':'RB'}],
];
function author(output) {
  const levels=[];
  for(let index=0;index<motifs.length;index++) {
    const motif=motifs[index],target=[2,3,4,4,5,5,6,7,8,9][index];
    let accepted=false;
    for(let attempt=0;attempt<100;attempt++) {
      let level;
      if(index===0)level=layout(motif);
      else {
        const rows=motif[1].map(row=>row.replace(/[GRBO]/g,'.'));
        const generated=boardFor([motif[0],rows.length,index>=7?3:2,index<3?1:2,rows],74000+index*1009+attempt*131);
        if(!generated)continue;
        level={...generated,name:motif[0]};
        if(index===5||index>=8) {
          const shell=level.cells.find(c=>c.color==='green');
          shell.inside={id:level.cells.length,color:'red'};
          if(index===9)shell.inside.inside={id:level.cells.length+1,color:'blue'};
          else if(index===8) {
            const other=level.cells.filter(c=>c.color==='green')[1];
            other.inside={id:level.cells.length+1,color:'blue'};
          }
        }
      }
      const single=solve(level.cells,level.size,{walls:level.walls,beam:180,maxDepth:16,maxStates:90000});
      if(!single||single.solution.length<target||single.solution.length>target)continue;
      assert.equal(single.solution.reduce((b,[a,l,o])=>move(b,level.size,a,l,o,level.walls),level.cells).length,0);
      const moves=Math.ceil(single.solution.length*1.8)+6;
      levels.push({...level,moves,solution:single.solution,optimal:false,theme:'opening',authorSeed:74000+index*1009+attempt*131});
      fs.writeFileSync(output,JSON.stringify(levels,null,2));
      console.log('Accepted '+(index+1)+' '+level.name+': '+single.solution.length+' gestures, budget '+moves);
      accepted=true;break;
    }
    assert.ok(accepted,motif[0]+': needs an ordinary-mode solution in the target range');
  }
  return levels;
}
if(require.main===module)author(process.argv[2]||'/tmp/jelly-opening-levels.json');
module.exports={motifs,author};
