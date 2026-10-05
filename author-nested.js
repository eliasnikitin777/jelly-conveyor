'use strict';
// Handcrafted jelly inside jelly: a captive shares the shell cell until release.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const R = require('./rules.js');
const { solve, move } = require('./solver.js');
const colors = { G:'green', R:'red', B:'blue', O:'orange' };
const motifs = [
  ['Желейка внутри', ['GG..','....','...G','RR..'], {'1,0':'R'}],
  ['Две начинки', ['RR...','.....','....R','.....','BB.B.'], {'0,0':'B','4,2':'B'}],
  ['Разные сердцевины', ['GG....','......','.....G','......','RR..BB','......'], {'1,0':'R','5,2':'B'}],
  ['Две оболочки', ['GG....','......','..#..G','......','RR....','B....B'], {'1,0':'R','1,4':'B'}],
  ['Матрешка', ['GG....','......','.....G','..#...','RR....','B....B'], {'1,0':'RB'}],
  ['Начинка с обходом', ['GG.....','..#..G.','.......','.#.....','RR...R.','...#...','BB....B'], {'0,0':'R','1,0':'B','5,1':'RB'}],
];
function layout([name,rows,contents]) {
  const size=rows.length,cells=[],walls=[];
  rows.forEach((row,y)=>{
    assert.equal(row.length,size);
    [...row].forEach((char,x)=>{
      if(colors[char])cells.push({id:cells.length,x,y,color:colors[char]});
      else if(char==='#')walls.push({x,y});
      else assert.equal(char,'.');
    });
  });
  let nextId=cells.length;
  for(const c of cells) {
    let shell=c;
    for(const char of contents[c.x+','+c.y]||'') {
      assert.ok(colors[char]);assert.notEqual(shell.color,colors[char]);
      shell.inside={id:nextId++,color:colors[char]};shell=shell.inside;
    }
  }
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
    levels.push({...level,moves,solution:single.solution,allFloorSolution:all.solution,optimal:false,theme:'nested'});
    fs.writeFileSync(output,JSON.stringify(levels,null,2));
    console.log(`Accepted: ${single.solution.length}/${all.solution.length} gestures, budget ${moves}`);
  }
  return levels;
}
if(require.main===module)author(process.argv[2]||'/tmp/jelly-nested-levels.json');
module.exports={motifs,layout,author};
