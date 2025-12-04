// menu.ts
type PAC = typeof globalThis.PAC;

/* ----------------------------------------------------------
   1.  Petit helper pour ne pas répéter PAC.xxx partout
---------------------------------------------------------- */
const g = (): PAC => globalThis.PAC;

/* ----------------------------------------------------------
   2.  Fonctions métier
---------------------------------------------------------- */
export function menuPC(): void {
  const { nav, choixM, handlersK, curKeyMenu } = g();
  nav.children.item(0)!.style.color = 'blue';
  for (let i = 0; i < nav.children.length; i++) {
    const j = i;
    nav.children.item(i)!.addEventListener('click', () => choixVFunc(choixM[j]));
    nav.children.item(i)!.addEventListener('mouseover', () => initCMenu(j, nav.children));
    nav.children.item(i)!.addEventListener('mouseleave', () => leaveMenu(j, nav.children));
    g().index++;
  }
  g().index = 0;
  window.addEventListener('keyup', handlersK[g().index] || (handlersK[g().index] = curKeyMenu()));
}

export function keyMenu(ev: KeyboardEvent): void {
  const { nav, choixM, postionCurseur } = g();
  if (['s', 'S', 'ArrowDown'].includes(ev.key) && postionCurseur < 2) g().postionCurseur++;
  if (['z', 'Z', 'ArrowUp'].includes(ev.key) && postionCurseur > 0) g().postionCurseur--;
  if (ev.key === 'Enter') choixVFunc(choixM[g().postionCurseur]);

  for (let i = 0; i < nav.children.length; i++) {
    (nav.children.item(i) as HTMLElement).style.color = i === g().postionCurseur ? 'blue' : 'yellow';
  }
}

function initCMenu(n: number, childElem: HTMLCollection): void {
  for (let i = 0; i < childElem.length; i++) {
    const el = childElem.item(i) as HTMLElement;
    if (el.style.color === 'blue') el.style.color = 'yellow';
  }
  (childElem.item(n) as HTMLElement).style.color = 'blue';
}

function leaveMenu(n: number, childElem: HTMLCollection): void {
  (childElem.item(n) as HTMLElement).style.color = 'yellow';
}

/* ----------------------------------------------------------
   3.  Navigation
---------------------------------------------------------- */
async function choixVFunc(choix: string): Promise<void> {
  const { menu, nav, scoreAll, score, nivN } = g();
  if (choix === 'Start') {
    menu.style.display = 'none';
    nav.style.display = 'none';
    cleanMenu();
    if (scoreAll > 0 || score > 0) g().scoreAll = 0, g().nivN = 1, await changeNiv();
    await import('./funcPacMan.js').then(m => m.balayArena());
    await import('./funcPacMan.js').then(m => m.initPC());
    await import('./funcPacMan.js').then(m => m.eventPacMan());
    return;
  }
  if (choix === 'Leader Board') {
    nav.style.display = 'none';
    cleanMenu();
    await import('./leaderboard.js').then(m => m.leaderBoard());
  }
}

function cleanMenu(): void {
  const { nav, handlers, handlersC, handlersT, handlersK } = g();
  for (let i = 0; i < nav.children.length; i++) {
    const child = nav.children.item(i)!;
    child.replaceWith(child.cloneNode(true)); // retire tous les listeners en 1 ligne
  }
  g().index = 0;
  window.removeEventListener('keydown', handlersK[g().index]);
}

/* ----------------------------------------------------------
   4.  Gestion fin de niveau / restart
---------------------------------------------------------- */
export function restartFunc(): void {
  const { scoreS, life, soundDeath, menu, restart, choixFinNiv, yes, txtRestart } = g();
  scoreS.innerText = 'Game Over';
  scoreS.style.color = 'red';
  g().life--;
  soundDeath.play();
  restart.appendChild(txtRestart);
  menu.appendChild(restart);
  choixFinFunc();
  window.addEventListener('keyup', g().handlersKCF[g().index] || (g().handlersKCF[g().index] = (ev: KeyboardEvent) => keyChoixFiN(ev, 'restart')));
  yes.addEventListener('click', initRestard);
}

export async function initRestard(): Promise<void> {
  const { yes, menu, restart, choixFinNiv, scoreS } = g();
  yes.removeEventListener('click', initRestard);
  window.removeEventListener('keyup', g().handlersKCF[g().index]);
  menu.style.display = 'none';
  restart.remove();
  choixFinNiv.remove();
  g().score = 0;
  scoreS.style.color = 'yellow';
  scoreS.innerText = `Score: ${g().score}`;
  await import('./funcPacMan.js').then(m => m.initPC());
}

export function nextLevelFunc(): void {
  const { scoreS, menu, nextLevel, choixFinNiv, yes, txtNextLevel } = g();
  scoreS.innerText = 'Victoire';
  nextLevel.appendChild(txtNextLevel);
  menu.appendChild(nextLevel);
  choixFinFunc();
  window.addEventListener('keyup', g().handlersKCF[g().index] || (g().handlersKCF[g().index] = (ev: KeyboardEvent) => keyChoixFiN(ev, 'nextLevel')));
  yes.addEventListener('click', initNextLevel);
}

function choixFinFunc(): void {
  const { menu, choixFinNiv, yes, no, yesTxt, noTxt } = g();
  menu.appendChild(choixFinNiv);
  choixFinNiv.id = 'menuChEnd';
  yes.appendChild(yesTxt);
  choixFinNiv.appendChild(yes);
  no.appendChild(noTxt);
  choixFinNiv.appendChild(no);
  g().nextLevel.style.width = '150px';
  menu.style.display = 'flex';
  menu.style.height = '95px';
  menu.style.marginBlock = '250px';
  menu.style.position = 'absolute';
  menu.style.zIndex = '1';
  no.addEventListener('click', () => import('./leaderboard.js').then(m => m.returnScore()));
}

export async function initNextLevel(): Promise<void> {
  const { yes, menu, nextLevel, choixFinNiv, PacMan, fantom, score, nivN } = g();
  menu.style.display = 'none';
  yes.removeEventListener('click', initNextLevel);
  window.removeEventListener('keyup', g().handlersKCF[g().index]);
  nextLevel.remove();
  choixFinNiv.remove();
  PacMan.remove();
  fantom.remove();
  g().niveau.style.display = 'none';
  if (score === 0) g().nivN = nivN + 1;
  await changeNiv();
  await import('./funcPacMan.js').then(m => m.balayArena());
  await import('./funcPacMan.js').then(m => m.initPC());
}

async function changeNiv(): Promise<void> {
  const { nivN, scoreS, score, esp, pointI, rotateTui, PassNivPM, PacC, PacT, PacB, PassNivFnt } = g();
  g().niveau = document.getElementById(`niv${nivN}`) as HTMLElement;
  g().niveau.style.display = 'grid';
  g().esp = g().niveau.getElementsByClassName('esp') as HTMLCollectionOf<HTMLElement>;
  g().pointI = g().niveau.getElementsByClassName('point') as HTMLCollectionOf<HTMLElement>;
  if (g().niveau.getElementsByClassName('rotate').length > 0) g().rotateTui = g().niveau.getElementsByClassName('rotate') as HTMLCollectionOf<HTMLElement>;
  scoreS.style.color = 'yellow';
  scoreS.innerText = `Score: ${score}`;
  g().x = 0;
  g().p = 0;
  g().turn = 0;
  g().esp[0].appendChild(PassNivPM);
  PassNivPM.id = 'PacMan';
  PassNivPM.appendChild(PacC);
  PacC.id = 'PacC';
  PacC.appendChild(PacT);
  PacT.id = 'PacT';
  PacC.appendChild(PacB);
  PacB.id = 'PacB';
  g().PacMan = document.getElementById('PacMan') as HTMLElement;
  g().esp[g().esp.length - 1].appendChild(PassNivFnt);
  PassNivFnt.id = 'fantom';
  g().fantom = document.getElementById('fantom') as HTMLElement;
  g().PCX = 1;
  g().PCX2 = 2;
  g().PCY = 1;
  g().PCY2 = 2;
}

export function backFunc(): void {
  const { back, affLB, nextLevel, choixFinNiv, restart, menu, nav } = g();
  back.removeEventListener('click', backFunc);
  back.style.display = 'none';
  affLB.style.display = 'none';
  nextLevel.remove();
  choixFinNiv.remove();
  restart.remove();
  menu.removeAttribute('style');
  nav.style.display = 'flex';
  (nav.children.item(2) as HTMLElement).style.color = 'yellow';
  menuPC();
}

export function keyChoixFiN(ev: KeyboardEvent, mode: 'restart' | 'nextLevel'): void {
  const { choixFinNiv, postionCurseur } = g();
  if (['d', 'D', 'ArrowRight'].includes(ev.key) && postionCurseur < 1) g().postionCurseur++;
  if (['q', 'Q', 'ArrowLeft'].includes(ev.key) && postionCurseur > 0) g().postionCurseur--;
  if (ev.key === 'Enter') {
    if (postionCurseur === 0) {
      if (mode === 'restart') initRestard();
      else initNextLevel();
    } else {
      import('./leaderboard.js').then(m => m.returnScore());
    }
  }
  for (let i = 0; i < choixFinNiv.children.length; i++) {
    (choixFinNiv.children.item(i) as HTMLElement).style.color =
      i === g().postionCurseur ? 'blue' : 'yellow';
  }
}