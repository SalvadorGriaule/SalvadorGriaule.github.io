// script.ts
import anime from 'animejs';
import Dexie from 'dexie';
import Hammer from 'hammerjs';

/* ============================================================
   1.  Déclaration du namespace global
============================================================ */
declare global {
  var PAC: typeof initGlobals extends () => infer T ? T : never;
}

/* ============================================================
   2.  Initialisation unique des globales
============================================================ */
function initGlobals() {
  /* ------ DOM ------ */
  const area = document.getElementById('area') as HTMLElement;
  const scoreS = document.getElementById('Score') as HTMLElement;
  const menu = document.getElementById('menu') as HTMLElement;
  const nav = document.getElementById('nav') as HTMLElement;
  const affLB = document.getElementById('ldAff') as HTMLElement;
  const back = document.getElementById('back') as HTMLElement;
  const inputN = document.getElementById('inputName') as HTMLElement;
  const formN = document.getElementById('formN') as HTMLFormElement;
  const formNval = document.forms[0] as HTMLFormElement;

  /* ------ Éléments créés dynamiquement ------ */
  const PassNivPM = document.createElement('div');
  const PacC = document.createElement('div');
  const PacT = document.createElement('div');
  const PacB = document.createElement('div');
  const PassNivFnt = document.createElement('div');

  const restart = document.createElement('p');
  restart.appendChild(document.createTextNode('Restart ?'));
  const nextLevel = document.createElement('p');
  nextLevel.appendChild(document.createTextNode('Next Level ?'));
  const choixFinNiv = document.createElement('ul');
  const yes = document.createElement('li');
  yes.appendChild(document.createTextNode('Oui'));
  const no = document.createElement('li');
  no.appendChild(document.createTextNode('Non'));
  choixFinNiv.appendChild(yes);
  choixFinNiv.appendChild(no);

  /* ------ Variables de jeu ------ */
  let fantom = document.getElementById('fantom') as HTMLElement;
  let PacMan = document.getElementById('PacMan') as HTMLElement;
  let niveau = document.getElementById('niv1') as HTMLElement;
  let esp = niveau.getElementsByClassName('esp') as HTMLCollectionOf<HTMLElement>;
  const espH = esp[0].clientHeight;
  const espW = esp[0].clientWidth;
  let pointI = niveau.getElementsByClassName('point') as HTMLCollectionOf<HTMLElement>;
  let rotateTui: HTMLCollectionOf<HTMLElement> | 0 = 0;

  let score = 0, scoreAll = 0, life = 0, nivN = 1, turn = 0;
  let PCX = 1, PCX2 = 2, PCY = 1, PCY2 = 2, px = 0, py = 0;
  let FCX = 5, FCX2 = 6, FCY = 5, FCY2 = 6, fx = 0, fy = 0;
  let MouvPossFnt: string[] = [], lastMouv = '', MouvPoss = 0, Mouv = 0;
  const bordure = [0, 0, 0, 0];
  let x = 0, p = 0, f = 24;
  let i = 0, i2 = 0, i3 = 0;

  /* ------ Tactile ------ */
  const hammertime = new Hammer(area);
  hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

  /* ------ Menu ------ */
  const handlers: Record<string, EventListener> = {};
  const handlersT: Record<string, EventListener> = {};
  const handlersEV: Record<string, EventListener> = {};
  const handlersC: Record<string, EventListener> = {};
  const handlersK: Record<string, EventListener> = {};
  const handlersKCF: Record<string, EventListener> = {};
  let postionCurseur = 0, index = 0;
  const choixM = ['Start', 'Option', 'Leader Board'];
  let choixV = '';

  /* ------ Audio ------ */
  const soundBegin = new Audio('asset/audio/pacman_beginning.wav');
  const soundDeath = new Audio('asset/audio/pacman_death.wav');

  /* ------ Base de données ------ */
  const dbLB = new Dexie('LeaderBoard');
  dbLB.version(1).stores({ bestScores: 'id,nameLB,scoreLB' });

  /* ------ Curry helpers ------ */
  const curLeaveMenu = (Var: number, Var2: HTMLCollection) =>
    handlersT[index] ||= (e => import('./menu.js').then(m => m.leaveMenu(Var, Var2)));
  const curChoixVFunc = (Var: string) =>
    handlersC[index] ||= (e => import('./menu.js').then(m => m.choixVFunc(Var)));
  const curInitCMenu = (Var: number, Var2: HTMLCollection) =>
    handlers[index] ||= (e => import('./menu.js').then(m => m.initCMenu(Var, Var2)));
  const curKeyMenu = () =>
    handlersK[index] ||= (e => import('./menu.js').then(m => m.keyMenu(e as KeyboardEvent)));
  const curEvLisPacMan = () =>
    handlersEV[index] ||= (e => import('./funcPacMan.js').then(m => m.evLisPacMan(e as KeyboardEvent | HammerInput)));
  const curKeyChoixFiN = (Var: string) =>
    handlersKCF[index] ||= (e => import('./menu.js').then(m => m.keyChoixFiN(e as KeyboardEvent, Var)));

  /* ------ Retour de tout l’état ------ */
  return {
    area, scoreS, menu, nav, affLB, back, inputN, formN, formNval,
    PassNivPM, PacC, PacT, PacB, PassNivFnt,
    restart, nextLevel, choixFinNiv, yes, no,
    fantom, PacMan, niveau, esp, espH, espW, pointI, rotateTui,
    score, scoreAll, life, nivN, turn,
    PCX, PCX2, PCY, PCY2, px, py,
    FCX, FCX2, FCY, FCY2, fx, fy,
    MouvPossFnt, lastMouv, MouvPoss, Mouv, bordure,
    x, p, f, i, i2, i3,
    hammertime,
    handlers, handlersT, handlersEV, handlersC, handlersK, handlersKCF,
    postionCurseur, index, choixM, choixV,
    soundBegin, soundDeath,
    dbLB,
    curLeaveMenu, curChoixVFunc, curInitCMenu, curKeyMenu, curEvLisPacMan, curKeyChoixFiN,
    anime, Dexie, Hammer,
  };
}

/* ============================================================
   3.  Montage dans globalThis
============================================================ */
globalThis.PAC = initGlobals();

/* ============================================================
   4.  Pré-chargement des modules et démarrage
============================================================ */
Promise.all([
  import('./menu.js'),
  import('./funcPacMan.js'),
  import('./leaderboard.js'),
]).then(() => {
  // Données initiales de la base
  globalThis.PAC.dbLB.bestScores.bulkPut([
    { id: 1, nameLB: 'PAC', scoreLB: 15 },
    { id: 2, nameLB: 'MAN', scoreLB: 12 },
    { id: 3, nameLB: 'SET', scoreLB: 10 },
  ]).then(() => import('./menu.js').then(m => m.menuPC()));
});