'use strict';
// Handcrafted closed jelly cages. Missing pieces keep each shell incomplete,
// so captive colors can only meet their outside partners after a shell clears.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const R = require('./rules.js');
const { solve, move } = require('./solver.js');
const colors = { G:'green', R:'red', B:'blue', O:'orange' };
const motifs = [
  ['Желейный пленник', ['G....','.GGG.','.GBG.','.GGG.','....B']],
  ['Длинный футляр', ['.....R','.RRRR.','.RBBR.','.RRRR.','......','B.....']],
  ['Два цвета внутри', ['G......','.GGGGG.','.GB..G.','.GB.RG.','.G..RG.','.GGGGG.','B.....R']],
  ['Две капсулы', ['....G...','GGG.....','GBG.....','GGG.....','.....RRR','.....RBR','.....RRR','...R....']],
  ['Матрешка', ['G.......R','.GGGGGGG.','.G.....G.','.G.RRR.G.','.G.RBR.G.','.G.RRR.G.','.G.....G.','.GGGGGGG.','........B']],
  ['Сейф с обходом', ['R......B','..#.....','..RRRR..','..R..R.#','#.RBGR..','..RRRR..','.....#..','G.......']],
];
function layout([name,rows]) {
  const size=rows.length,cells=[],walls=[];
  rows.forEach((row,y)=>{
    assert.equal(row.length,size);
    [...row].forEach((char,x)=>{
      if(colors[char])cells.push({id:cells.length,x,y,color:colors[char]});
      else if(char==='#')walls.push({x,y});
      else assert.equal(char,'.');
    });
  });
  assert.equal(R.completed(cells).length,0,`${name}: no color starts complete`);
  return {name,size,cells,walls};
}
function author(output) {
  const levels=[];
  for(const motif of motifs) {
    const level=layout(motif);
    console.log(`Search ${level.name}: ${level.cells.length} jelly`);
    const options={walls:level.walls,beam:220,maxDepth:24,maxStates:150000};
    const single=solve(level.cells,level.size,options);
    const all=solve(level.cells,level.size,{...options,allFloor:true});
    assert.ok(single&&all,`${level.name}: both modes must have solutions`);
    for(const result of [single,all]) {
      const end=result.solution.reduce((board,[axis,lane,offset])=>move(board,level.size,axis,lane,offset,level.walls),level.cells);
      assert.equal(end.length,0);
    }
    const moves=Math.max(18,Math.ceil(Math.max(single.solution.length,all.solution.length)*2)+10);
    levels.push({...level,moves,solution:single.solution,allFloorSolution:all.solution,optimal:false,theme:'cage'});
    fs.writeFileSync(output,JSON.stringify(levels,null,2));
    console.log(`Accepted: ${single.solution.length}/${all.solution.length} gestures, budget ${moves}`);
  }
  return levels;
}
if(require.main===module)author(process.argv[2]||'/tmp/jelly-cage-levels.json');
module.exports={motifs,layout,author};
