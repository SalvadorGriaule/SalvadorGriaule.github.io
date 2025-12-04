// funcPacMan.ts
type PAC = typeof globalThis.PAC;

/* ----------------------------------------------------------
   Helper rapide
---------------------------------------------------------- */
const g = (): PAC => globalThis.PAC;

/* ----------------------------------------------------------
   1.  Balayage de la grille (bordures + points)
---------------------------------------------------------- */
export function balayArena(): void {
  let { esp, bordure, PCY, PCX, PCY2, PCX2, pointI,p } = g();
  let x = 0;
  let PCY_loc = 1, PCX_loc = 1, PCY2_loc = 2, PCX2_loc = 2;
    console.log(pointI);
  for (let i = 1; i < 6; i++) {
    for (let i2 = 1; i2 < 6; i2++) {
      if (esp[x].children.length > 0) {
        for (let i3 = 0; i3 < esp[x].children.length; i3++) {
          const child = esp[x].children.item(i3) as HTMLElement;
          if (child.className === 'point') {
            pointI[p].style.gridArea = `${PCY_loc}/${PCX_loc}/${PCY2_loc}/${PCX2_loc}`;
            p++;
          } else {
            if (child.className === 'BordT') bordure[0] = 2;
            if (child.className === 'BordR') bordure[1] = 2;
            if (child.className === 'BordB') bordure[2] = 2;
            if (child.className === 'BordL') bordure[3] = 2;
            esp[x].style.borderWidth = `${bordure[0]}px ${bordure[1]}px ${bordure[2]}px ${bordure[3]}px`;
          }
        }
      }
      bordure.fill(0);
      x++;
      PCX_loc++;
      PCX2_loc++;
    }
    PCX_loc = 1;
    PCX2_loc = 2;
    PCY_loc++;
    PCY2_loc++;
  }
}

/* ----------------------------------------------------------
   2.  Reset des points + position initiale PM & fantôme
---------------------------------------------------------- */
export function initPC(): void {
  const { pointI, p, soundBegin, niveau } = g();
  console.log(p);
  for (let i = 0; i < p; i++) {
    console.log(pointI[i]);
    pointI[i].style.backgroundColor = 'white';
    pointI[i].style.visibility = 'visible';
  }
  // Reset coordonnées
  Object.assign(g(), {
    x: 0, f: 24, life: 1, score: 0,
    PCX: 1, PCX2: 2, PCY: 1, PCY2: 2, px: 0, py: 0,
    FCX: 5, FCX2: 6, FCY: 5, FCY2: 6, fx: 0, fy: 0,
    lastMouv: '', MouvPoss: 0, Mouv: 0, MouvPossFnt: [],
  });
  const { PacMan, fantom, espH, espW } = g();
  PacMan.style.transform = `translate(${g().px}px,${g().py}px)`;
  fantom.style.transform = `translate(${g().fx}px,${g().fy}px)`;
  PacMan.style.gridArea = `${g().PCY}/${g().PCX}/${g().PCY2}/${g().PCX2}`;
  fantom.style.gridArea = `${g().FCY}/${g().FCX}/${g().FCY2}/${g().FCX2}`;
  if (niveau.id === 'niv1') soundBegin.play();
}

/* ----------------------------------------------------------
   3.  Rotation des tuiles « rotate »
---------------------------------------------------------- */
export function calcTurn(tab: HTMLElement[]): void {
  for (let i = 0; i < tab.length; i++) {
    let raw = tab[i].style.borderWidth.replace(/px/g, '').split(' ').filter(Boolean);
    if (raw.length === 2) raw = [raw[0], raw[1], raw[0], raw[1]];
    if (raw.length === 3) raw.push(raw[1]);
    const [t, r, b, l] = raw.map(Number);
    tab[i].style.borderWidth = `${l}px ${t}px ${r}px ${b}px`;
  }
}

/* ----------------------------------------------------------
   4.  Events clavier & swipe
---------------------------------------------------------- */
export function eventPacMan(): void {
  const { hammertime, handlersEV, index, curEvLisPacMan } = g();
  document.addEventListener('keyup', handlersEV[index] || (handlersEV[index] = curEvLisPacMan()));
  hammertime.on('swipeleft swiperight swipeup swipedown', ev => evLisPacMan(ev as HammerInput));
}

/* ----------------------------------------------------------
   5.  Mouvement Pac-Man + animations
---------------------------------------------------------- */
export function evLisPacMan(ev: KeyboardEvent | HammerInput): void {
  const {
    life, score, p, PacMan, fantom, esp, espH, espW, px, py, fx, fy,
    PCX, PCX2, PCY, PCY2, FCX, FCX2, FCY, FCY2, x, f,
    pointI, scoreS, soundDeath, rotateTui, turn,
  } = g();
  if (life !== 1 || score >= p) return;

  const key = (ev as KeyboardEvent).key ?? (ev as HammerInput).type;

  // Animation de la bouche
  g().anime({
    targets: '#PacT',
    duration: 200,
    keyframes: [{ rotate: -45 }, { rotate: 0 }],
    easing: 'easeInOutExpo',
  });
  g().anime({
    targets: '#PacB',
    duration: 200,
    keyframes: [{ rotate: 45 }, { rotate: 0 }],
    easing: 'easeInOutExpo',
  });

  g().turn++;
  if (g().turn % 2 === 1 && rotateTui && rotateTui.length) calcTurn(Array.from(rotateTui));

  // Déplacements
  const moves = [
    { keys: ['s', 'S', 'ArrowDown', 'swipedown'], cond: PCY < 5, wall: esp[x].style.borderBottomWidth !== '2px' && esp[x + 5].style.borderTopWidth !== '2px', dx: 0, dy: +espH, rot: 90, gridDy: 1 },
    { keys: ['z', 'Z', 'ArrowUp', 'swipeup'], cond: PCY > 1, wall: esp[x].style.borderTopWidth !== '2px' && esp[x - 5].style.borderBottomWidth !== '2px', dx: 0, dy: -espH, rot: 270, gridDy: -1 },
    { keys: ['d', 'D', 'ArrowRight', 'swiperight'], cond: PCX < 5, wall: esp[x].style.borderRightWidth !== '2px' && esp[x + 1].style.borderLeftWidth !== '2px', dx: +espW, dy: 0, rot: 0, gridDx: 1 },
    { keys: ['q', 'Q', 'ArrowLeft', 'swipeleft'], cond: PCX > 1, wall: esp[x].style.borderLeftWidth !== '2px' && esp[x - 1].style.borderRightWidth !== '2px', dx: -espW, dy: 0, rot: 180, gridDx: -1 },
  ];

  for (const m of moves) {
    if (!m.keys.includes(key) || !m.cond || !m.wall) continue;
    g().x += (m.gridDx ?? 0) + (m.gridDy ?? 0) * 5;
    g().PCX += m.gridDx ?? 0;
    g().PCX2 += m.gridDx ?? 0;
    g().PCY += m.gridDy ?? 0;
    g().PCY2 += m.gridDy ?? 0;
    PacMan.style.gridArea = `${g().PCY}/${g().PCX}/${g().PCY2}/${g().PCX2}`;
    g().px += m.dx;
    g().py += m.dy;
    g().anime({ targets: '#PacMan', translateX: g().px, translateY: g().py, duration: 100, easing: 'easeInOutExpo' });
    g().anime({ targets: '#PacC', rotate: m.rot, duration: 100, easing: 'easeInOutExpo' });
    break;
  }

  // Mange les points
  for (let i = 0; i < p; i++) {
    if (PacMan.style.gridArea === pointI[i].style.gridArea && pointI[i].style.backgroundColor === 'white') {
      pointI[i].style.backgroundColor = 'yellow';
      g().score++;
      scoreS.innerText = `Score: ${g().score}`;
    }
    if (PacMan.style.gridArea !== pointI[i].style.gridArea && pointI[i].style.backgroundColor === 'yellow') {
      pointI[i].style.visibility = 'hidden';
    }
  }

  // IA fantôme
  ghostMove();
  // Collision
  if (fantom.style.gridArea === PacMan.style.gridArea) {
    import('./menu.js').then(m => m.restartFunc());
  }
  // Victoire
  if (g().score === p) {
    g().scoreAll += g().score;
    g().score = 0;
    g().p = 0;
    import('./menu.js').then(m => m.nextLevelFunc());
  }
}

/* ----------------------------------------------------------
   6.  IA fantôme
---------------------------------------------------------- */
function ghostMove(): void {
  const {
    esp, f, FCX, FCX2, FCY, FCY2, fx, fy, espH, espW,
    lastMouv, MouvPossFnt, MouvPoss, Mouv,
  } = g();

  // Inventaire des directions possibles
  const dirs: string[] = [];
  if (FCY < 5 && esp[f].style.borderBottomWidth !== '2px' && esp[f + 5].style.borderTopWidth !== '2px') dirs.push('down');
  if (FCY > 1 && esp[f].style.borderTopWidth !== '2px' && esp[f - 5].style.borderBottomWidth !== '2px') dirs.push('up');
  if (FCX < 5 && esp[f].style.borderRightWidth !== '2px' && esp[f + 1].style.borderLeftWidth !== '2px') dirs.push('right');
  if (FCX > 1 && esp[f].style.borderLeftWidth !== '2px' && esp[f - 1].style.borderRightWidth !== '2px') dirs.push('left');

  // Anti-retour
  if (lastMouv) dirs.splice(dirs.indexOf(reverse(lastMouv)), 1);

  // Choix
  const move = dirs.length === 1 ? dirs[0] : dirs[Math.floor(Math.random() * dirs.length)];
  if (!move) return;

  g().lastMouv = move;
  const dx = move === 'left' ? -espW : move === 'right' ? espW : 0;
  const dy = move === 'up' ? -espH : move === 'down' ? espH : 0;
  const gridDx = move === 'left' ? -1 : move === 'right' ? 1 : 0;
  const gridDy = move === 'up' ? -1 : move === 'down' ? 1 : 0;

  g().f += gridDx + gridDy * 5;
  g().FCX += gridDx;
  g().FCX2 += gridDx;
  g().FCY += gridDy;
  g().FCY2 += gridDy;
  g().fx += dx;
  g().fy += dy;

  fantom.style.gridArea = `${g().FCY}/${g().FCX}/${g().FCY2}/${g().FCX2}`;
  g().anime({ targets: '#fantom', translateX: g().fx, translateY: g().fy, duration: 100, easing: 'easeInOutExpo' });
}

/* ----------------------------------------------------------
   7.  Petit helper
---------------------------------------------------------- */
function reverse(dir: string): string {
  const map: Record<string, string> = { up: 'down', down: 'up', left: 'right', right: 'left' };
  return map[dir] ?? '';
}