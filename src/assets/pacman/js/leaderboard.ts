function leaderBoard() {
    dbLB.bestScores
        .orderBy("scoreLB")
        .reverse()
        .toArray()
        .then(bestScores => {

            affLB.style.display = "flex";
            for (i = 0; i < affLB.children.length; i++) {
                affLB.children[i].innerText = `${i + 1}: ${bestScores[i].nameLB} ${bestScores[i].scoreLB}`;
            }
            back.style.display = "block";
            back.addEventListener('click', backFunc);

        }).catch((err) => {
            alert("error");
        });
}

async function returnScore() {
    no.removeEventListener('click', returnScore);
    document.removeEventListener("keyup", curEvLisPacMan());
    hammertime.off('swipeleft swiperight swipeup swipedown');
    niveau.style.display = "none";
    nextLevel.remove();
    restart.remove();
    choixFinNiv.remove();
    PacMan.remove();
    fantom.remove();
    var lead = await dbLB.bestScores.orderBy("scoreLB").reverse().toArray()
        .then(bestScores => {
            return [bestScores[0].scoreLB, bestScores[1].scoreLB, bestScores[2].scoreLB];
        });
    if (scoreAll > lead[2]) {
        console.log(lead[2]);
        inputN.style.display = "flex";
        formN.addEventListener('submit', (ev) => {
            ev.preventDefault();
            if (formNval['name'].value.length > 0) {
                dbLB.bestScores.count().then(count => {
                    dbLB.bestScores.put({ id: count + 1, nameLB: `${formNval['name'].value}`, scoreLB: scoreAll });
                }).catch((err) => {
                    alert("error");
                });
            }
            else {
                dbLB.bestScores.count().then(count => {
                    dbLB.bestScores.put({ id: count + 1, nameLB: `UNK`, scoreLB: scoreAll });
                }).catch((err) => {
                    alert("error");
                });
            }
            inputN.style.display = "none";
            backFunc();  
        });
    }
    else{
        backFunc();  
    }
}

