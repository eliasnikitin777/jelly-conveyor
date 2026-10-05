'use strict';
const ConveyorRules = (() => {
  const initial = () => [
    { id: 0, x: 0, y: 0, color: 'green' },
    { id: 1, x: 3, y: 0, color: 'green' },
    { id: 2, x: 3, y: 3, color: 'green' },
    { id: 3, x: 0, y: 2, color: 'red' },
    { id: 4, x: 2, y: 2, color: 'red' },
    { id: 5, x: 1, y: 3, color: 'red' },
  ];
  function organisms(board) {
    const remaining = new Set(board.map(c => c.id)), groups = [];
    while (remaining.size) {
      const first = board.find(c => remaining.has(c.id));
      const group = [first]; remaining.delete(first.id);
      for (let i = 0; i < group.length; i++) {
        const a = group[i];
        for (const b of board) if (remaining.has(b.id) && a.color === b.color &&
          Math.abs(a.x-b.x) + Math.abs(a.y-b.y) === 1) {
          group.push(b); remaining.delete(b.id);
        }
      }
      groups.push(group);
    }
    return groups;
  }
  // Any organism touching the selected belt is carried as one rigid body,
  // including its cells on other belts. A null lane activates all belts at once.
  // Obstacles constrain the whole body.
  function shift(board, axis, lane, offset, boardSize = 4, walls = []) {
    const cross = axis === 'x' ? 'y' : 'x', sign = offset >= 0 ? 1 : -1;
    const groups = organisms(board);
    const travel = groups.map(group => (lane === null || group.some(c => c[cross] === lane))
      ? Math.min(Math.abs(offset), ...group.map(c => sign > 0 ? boardSize-1-c[axis] : c[axis])) : 0);
    // Walls are stationary cells; limit the entire organism before any part
    // touches them. This also prevents tunnelling during a multi-cell drag.
    for (let i = 0; i < groups.length; i++) for (const a of groups[i]) for (const wall of walls) {
      const distance = (wall[axis]-a[axis])*sign;
      if (a[cross] === wall[cross] && distance > 0) travel[i] = Math.min(travel[i],distance-1);
    }
    const constraints = [];
    for (let i = 0; i < groups.length; i++) for (let j = 0; j < groups.length; j++) {
      if (i === j) continue;
      for (const a of groups[i]) for (const b of groups[j]) {
        const distance = (b[axis]-a[axis])*sign;
        if (a[cross] === b[cross] && distance > 0) constraints.push({i,j,gap:distance-1});
      }
    }
    // Propagate stopped bodies backwards through all carried organisms.
    for (let pass = 0; pass < groups.length; pass++) {
      for (const {i,j,gap} of constraints) travel[i] = Math.min(travel[i], travel[j]+gap);
    }
    const delta = new Map(groups.flatMap((group,i) => group.map(c => [c.id,travel[i]*sign])));
    return board.map(c => ({ ...c, [axis]: c[axis]+delta.get(c.id) }));
  }
  function previewLinks(base, axis, lane, offset, boardSize = 4, walls = []) {
    // The predicted snap position decides which bridges exist, while their
    // endpoints follow the continuously moving jelly bodies.
    return links(shift(base, axis, lane, Math.round(offset), boardSize, walls));
  }
  function links(board) {
    const edges = [];
    for (let i = 0; i < board.length; i++) for (let j = i + 1; j < board.length; j++) {
      const a = board[i], b = board[j];
      if (a.color !== b.color) continue;
      if (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1) edges.push([a.id,b.id]);
    }
    return edges;
  }
  function completed(board) {
    const groups = [];
    for (const color of new Set(board.map(c => c.color))) {
      const group = board.filter(c => c.color === color);
      const visited = new Set([group[0].id]), queue = [group[0]];
      while (queue.length) {
        const a = queue.shift();
        for (const b of group) if (!visited.has(b.id) && Math.abs(a.x-b.x)+Math.abs(a.y-b.y) === 1) {
          visited.add(b.id); queue.push(b);
        }
      }
      if (visited.size === group.length) groups.push(group.map(c => c.id));
    }
    return groups;
  }
  return { initial, shift, links, completed, organisms, previewLinks };
})();
if (typeof module !== 'undefined') module.exports = ConveyorRules;
