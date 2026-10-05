# Jelly Conveyor

[Play online](https://eliasnikitin777.github.io/jelly-conveyor/) · [GitHub repository](https://github.com/eliasnikitin777/jelly-conveyor)

Run `python3 -m http.server 8095 --bind 127.0.0.1` from the repository directory, then open http://127.0.0.1:8095/. The game is a static site with no build step or external dependencies. GitHub Pages serves the root of the main branch; `.nojekyll` keeps the files unchanged.

Move All Floor is disabled by default. Enable it in Settings: drag anywhere on the board, including a white cutout, to carry all rows horizontally or all columns vertically at once. Disable it in Settings to drag one playable cell’s row or column. Both movement settings persist in local storage and survives level changes. The first drag direction locks the axis. The conveyor floor loops; cargo stops at the board edge, other organisms, and stationary white walls. Orthogonally connected jelly of the same color moves as a rigid organism, even when it spans several belts. If any part of the organism hits a wall, the entire organism stops. Cargo cannot tunnel through a wall during a long drag. In individual-lane mode, white cutouts do not accept gestures.

During a drag, bridges preview the connections at the rounded release position. Their width grows with alignment and withdraws when the drag returns. Previewing never commits a merge or completes a color. One move is spent on release only if cargo positions change. A color disappears after all its jelly joins one group and pulses.

УРОВНИ at the top left opens a table of all 41 levels. Настройки at the top right contains Move All Floor and INFINITE MOVES checkboxes, both disabled by default. Every level can be selected immediately. Opening either menu pauses animations and automatic progression; closing it resumes the current game. Choosing a level starts it with its own board and full budget. Completed levels are marked with a check; completion marks and the movement setting persist in local storage. Escape, the close button, or a click outside the menu closes it.

Clearing the board advances the campaign automatically. Retry and replay controls appear inside the board only after losing or completing the campaign.

| Level | Name | Board | Jelly | Walls | Verified solution | Budget |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Первые ленты | 3 × 3 | 4 | 0 | 2 | 5 |
| 2 | Три желейки | 4 × 4 | 6 | 0 | 3 | 8 |
| 3 | Третий цвет | 4 × 4 | 9 | 0 | 5 | 12 |
| 4 | Большое поле | 5 × 5 | 12 | 0 | 7 | 16 |
| 5 | Четыре цвета | 6 × 6 | 16 | 0 | 9 | 20 |
| 6 | Объезд | 4 × 4 | 6 | 2 | 3 | 10 |
| 7 | Две цепочки | 5 × 5 | 8 | 1 | 4 | 12 |
| 8 | Остров | 5 × 5 | 9 | 3 | 4 | 12 |
| 9 | Поворот | 5 × 5 | 9 | 4 | 5 | 14 |
| 10 | Ключи | 6 × 6 | 12 | 4 | 5 | 16 |
| 11 | Коридоры | 6 × 6 | 12 | 4 | 7 | 20 |
| 12 | Четыре угла | 6 × 6 | 12 | 4 | 6 | 20 |
| 13 | В обход | 7 × 7 | 16 | 5 | 7 | 22 |
| 14 | Архипелаг | 7 × 7 | 16 | 7 | 12 | 30 |
| 15 | Большие организмы | 7 × 7 | 20 | 7 | 14 | 34 |
| 16 | Бублик | 5 × 5 | 10 | 1 | 4 | 24 |
| 17 | Шахматные острова | 6 × 6 | 15 | 4 | 10 | 27 |
| 18 | Две двери | 6 × 6 | 15 | 3 | 6 | 24 |
| 19 | Подкова | 6 × 6 | 15 | 8 | 12 | 31 |
| 20 | Песочные часы | 7 × 7 | 12 | 18 | 5 | 24 |
| 21 | Лестница | 6 × 6 | 15 | 4 | 9 | 26 |
| 22 | Длинные руки | 7 × 7 | 18 | 5 | 6 | 24 |
| 23 | Змейка | 7 × 7 | 15 | 12 | 13 | 33 |
| 24 | Четыре комнаты | 7 × 7 | 20 | 9 | 12 | 31 |
| 25 | Двойное кольцо | 7 × 7 | 15 | 12 | 7 | 24 |
| 26 | Серпантин | 7 × 7 | 18 | 9 | 11 | 29 |
| 27 | Крылья | 7 × 7 | 20 | 9 | 23 | 52 |
| 28 | Колодец | 7 × 7 | 18 | 7 | 8 | 27 |
| 29 | Соты | 7 × 7 | 20 | 8 | 9 | 26 |
| 30 | Крестовые проходы | 8 × 8 | 20 | 20 | 12 | 31 |
| 31 | Рояль | 8 × 8 | 18 | 12 | 9 | 26 |
| 32 | Галактика | 8 × 8 | 24 | 12 | 12 | 31 |
| 33 | Сломанный мост | 8 × 8 | 24 | 8 | 11 | 29 |
| 34 | Бабочка | 8 × 8 | 24 | 24 | 9 | 26 |
| 35 | Желейный мегаполис | 8 × 8 | 24 | 16 | 8 | 24 |
| 36 | Желейка внутри | 4 × 4 | 6 | 0 | 2 | 18 |
| 37 | Две начинки | 5 × 5 | 8 | 0 | 3 | 18 |
| 38 | Разные сердцевины | 6 × 6 | 9 | 0 | 3 | 18 |
| 39 | Две оболочки | 6 × 6 | 9 | 1 | 4 | 18 |
| 40 | Матрешка | 6 × 6 | 9 | 1 | 4 | 18 |
| 41 | Начинка с обходом | 7 × 7 | 13 | 3 | 5 | 20 |

Solutions and budgets count gestures, not transported cells. The new levels start with connected pairs, larger chains, or several disconnected organisms of a color, positioned around islands and corridors of white walls.

`solver.js` is an offline search tool using the actual rigid-organism and wall rules, with color removal. Pass the level's `walls` to `solve(cells, size, { walls })`. It searches every nonzero integer conveyor displacement as one gesture. Pass `allFloor: true` to search simultaneous movement instead of individual lanes. Solutions for both modes are saved in `levels.js` as `solution` and `allFloorSolution`; the first two are shortest by exhaustive breadth-first search, and later ones are verified solutions from beam search without an optimality claim. Budgets deliberately allow generous spare moves.

Run `node --test game.test.js` from the repository directory. The 41 tests replay every solution through the actual pointer handlers in both movement modes, including all 41 levels, progression, victory, retry, budget behavior, preview reversal, menus, wall collisions, simultaneous collision propagation, setting persistence, animation pause/resume, and startup without Canvas roundRect or ResizeObserver. All-floor solutions take 1–16 gestures and fit the existing generous budgets. The original five and all ten new levels were also completed in the Codex browser through native drags.

The all-floor mode was also checked in the Codex browser: a horizontal swipe on an empty row moves cargo in several other rows and spends one move, disabling the setting restores individual-lane movement, and an upward swipe moves multiple columns while a rigid chain stops at a stationary white wall.

Levels 16–35 add twenty distinct wall motifs on 5×5 through 8×8 boards, with 10–24 jelly cells and connected organisms from the start. Motifs include an hourglass, horseshoe, staircase, four rooms, two rings, honeycomb, butterfly and city blocks. Each color begins with a chain and two missing pieces. Every new level has a saved solution in both modes. Budgets are at least 24 gestures, otherwise 1.9 times the longer verified solution plus eight spare gestures, rounded up. Level 27 has the largest budget, 52, for a 23-gesture individual-lane solution.

`author-levels.js` is the deterministic offline authoring script. It tries seeded chain placements for each handcrafted wall motif and retains only layouts solved in both modes. Run `node author-levels.js /tmp/jelly-new-levels.json` to reproduce the 20 new layouts separately without replacing the live campaign. `authorSeed` records the accepted placement.

After extending the campaign, levels 20 (Песочные часы) and 35 (Желейный мегаполис) were completed in the Codex browser through native swipes in Move All Floor mode, including automatic progression and the final 35/35 overlay. The level chooser was verified to reach the last entries; its close header stays visible while scrolling.

INFINITE MOVES removes the move limit and switches the header from MOVES LEFT to MOVES MADE. Only changed cargo positions on a committed gesture count; cancellation, reversal, empty lanes and blocked gestures count zero. Moves made are tracked from the start of each level in both modes. Enabling the option retains the board and allows an exhausted level to continue; disabling it restores the remaining budget, floored at zero, and shows exhaustion if necessary. Changing levels or retrying resets the counter to zero. The option persists in local storage.

The first 35 levels have difficulty dips; [the audit](difficulty-report.md) and [comparison chart](difficulty-chart.svg) document them. The published campaign retains that order.

Levels 36–41 contain jelly inside other jelly on 4×4 through 7×7 boards, including multiple fillings, separate shell colors, nested layers and stationary obstacles. Each `inside` object has a unique identity and shares its shell’s cell; it has no independent coordinates or bridges until released. It moves with the shell. After the shell’s color completes and its disappearance animation ends, its immediate child remains at the same position and becomes a full-size playable jelly. Deeper fillings stay inside their new shell. Hidden jelly counts toward its color, preventing visible partners from clearing early. A release that completes an adjacent color starts another disappearance pulse without spending a move. Loss and victory wait until these cascades finish.

`node author-nested.js /tmp/jelly-nested-levels.json` reproduces the six handcrafted layouts and verified solutions in both modes. Budgets are 18–20 gestures, with at least ten spare moves over the longer saved solution. Regression checks cover movement with the shell, hidden-color completion, layer-by-layer release, solver identity, disappearance timing and a cascade on the final allowed move.

Level 36 was also completed in the Codex browser with native swipes: the miniature pink jelly moved inside a green jelly, became independent after the green chain vanished, then moved separately and joined its pink partners. No console errors were observed.

Shared instructions live in the repository-root [AGENTS.md](AGENTS.md), including the user command rules and the `previews/` folder convention. They travel with a checkout of this repository and apply to local and cloud work. Start cloud work from the current repository revision; refresh an existing checkout and re-read the file when instructions change. Personal files under a computer's `~/.codex` are not required for these project rules. Command toggle states belong to each chat and are not saved as active states in the repository.
