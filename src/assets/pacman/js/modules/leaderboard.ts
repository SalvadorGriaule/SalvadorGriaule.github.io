// leaderboard.ts
type PAC = typeof globalThis.PAC;

/* ----------------------------------------------------------
   Helper rapide
---------------------------------------------------------- */
const g = (): PAC => globalThis.PAC;

/* ----------------------------------------------------------
   1.  Affichage du tableau des scores
---------------------------------------------------------- */
export function leaderBoard(): void {
  const { dbLB, affLB, back } = g();
  dbLB.bestScores
    .orderBy('scoreLB')
    .reverse()
    .toArray()
    .then(bestScores => {
      affLB.style.display = 'flex';
      for (let i = 0; i < affLB.children.length; i++) {
        affLB.children[i].innerText = `${i + 1}: ${bestScores[i]?.nameLB ?? '---'} ${bestScores[i]?.scoreLB ?? 0}`;
      }
      back.style.display = 'block';
      back.addEventListener('click', backFunc);
    })
    .catch(() => alert('error'));
}

/* ----------------------------------------------------------
   2.  Retour au menu + eventuel enregistrement du score
---------------------------------------------------------- */
export async function returnScore(): Promise<void> {
  const { no, document, hammertime, niveau, nextLevel, restart, choixFinNiv, PacMan, fantom, scoreAll, dbLB, inputN, formN, formNval } = g();
  no.removeEventListener('click', returnScore);
  document.removeEventListener('keyup', g().handlersEV[g().index]);
  hammertime.off('swipeleft swiperight swipeup swipedown');
  niveau.style.display = 'none';
  nextLevel.remove();
  restart.remove();
  choixFinNiv.remove();
  PacMan.remove();
  fantom.remove();

  const bestScores = await dbLB.bestScores.orderBy('scoreLB').reverse().toArray();
  const third = bestScores[2]?.scoreLB ?? 0;

  if (scoreAll > third) {
    inputN.style.display = 'flex';
    formN.addEventListener('submit', saveNewScore);
  } else {
    backFunc();
  }
}

/* ----------------------------------------------------------
   3.  Sauvegarde du nouveau score
---------------------------------------------------------- */
async function saveNewScore(ev: Event): Promise<void> {
  ev.preventDefault();
  const { dbLB, inputN, formNval, scoreAll } = g();
  const name = (formNval.name.value || 'UNK').slice(0, 12);
  try {
    const count = await dbLB.bestScores.count();
    await dbLB.bestScores.put({ id: count + 1, nameLB: name, scoreLB: scoreAll });
  } catch {
    alert('error');
  }
  inputN.style.display = 'none';
  backFunc();
}

/* ----------------------------------------------------------
   4.  Retour au menu principal
---------------------------------------------------------- */
function backFunc(): void {
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
  import('./menu.js').then(m => m.menuPC());
}