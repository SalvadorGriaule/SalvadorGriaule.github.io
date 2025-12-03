function balayArena() {
    for (i = 1; i < 6; i++) {

        for (i2 = 1; i2 < 6; i2++) {
            // Si une case contien un élement dans sa div . cette algo va identifié si c'est ...
            if (esp[x].children.length > 0) {
                for (i3 = 0; i3 < esp[x].children.length; i3++) {

                    if (esp[x].children.item(i3).className == "point") {
                        pointI[p].style.gridArea = `${PCY}/${PCX}/${PCY2}/${PCX2}`;
                        p++;
                    }
                    else {
                        if (esp[x].children.item(i3).className == "BordT") {
                            bordure[0] = 2;
                        }
                        if (esp[x].children.item(i3).className == "BordR") {
                            bordure[1] = 2;
                        }
                        if (esp[x].children.item(i3).className == "BordB") {
                            bordure[2] = 2;
                        }
                        if (esp[x].children.item(i3).className == "BordL") {
                            bordure[3] = 2;
                        }
                        esp[x].style.borderWidth = `${bordure[0]}px ${bordure[1]}px ${bordure[2]}px ${bordure[3]}px`;
                    }
                }
            }
            bordure = [0, 0, 0, 0];
            x++;
            PCX++;
            PCX2++;
        }

        PCX = 1;
        PCX2 = 2;
        PCY++;
        PCY2++;
    }
}

function initPC() {
    for (i = 0; i < p; i++) {
        pointI[i].style.backgroundColor = "white";
        pointI[i].style.visibility = "visible";
    }
    //Phas d'inintialisation du Pac-Man
    x = 0, f = 24, life = 1, score = 0;
    PCX = 1, PCX2 = 2;
    PCY = 1, PCY2 = 2;
    px = 0, py = 0;
    FCX = 5, FCX2 = 6;
    FCY = 5, FCY2 = 6;
    fx = 0, fy = 0;
    lastMouv = "", MouvPoss = 0, Mouv = 0;
    MouvPossFnt = [];
    PacMan.style.transform = `translate(${px}px,${py}px)`;
    fantom.style.transform = `translate(${fx}px,${fy}px)`;
    PacMan.style.gridArea = `${PCY}/${PCX}/${PCY2}/${PCX2}`;
    fantom.style.gridArea = `${FCY}/${FCX}/${FCY2}/${FCX2}`;
    if (niveau.id == "niv1") {
        //soundTrack.pause();
        soundBegin.play();
    }

}

function calcTurn(tab) {

    for (i = 0; i < tab.length; i++) {
        let tabBord = Array.from(tab[i].style.borderWidth.replaceAll('px', '')).filter(char => char != " ");
        if (tabBord.length == 2 && tabBord[0] > 0) {
            tabBord.push(`${tabBord[0]}`);
        }
        if (tabBord.length == 2 && tabBord[1] > 0) {
            tabBord.push("0");
            tabBord.push(`${tabBord[1]}`);
        }
        if (tabBord.length < 4 && tabBord[1] > 0) {
            tabBord.push(`${tabBord[1]}`);
        }
        if (tabBord.length < 4) {
            tabBord.push(`${tabBord[1]}`);
        }
        tab[i].style.borderWidth = `${tabBord[3]}px ${tabBord[0]}px ${tabBord[1]}px ${tabBord[2]}px`;
    }

}

function eventPacMan() {

    document.addEventListener("keyup", curEvLisPacMan());
    hammertime.on('swipeleft swiperight swipeup swipedown', function (ev) {
        evLisPacMan(ev)
    })

}

function evLisPacMan(ev) {
    console.log(ev);
    if (life == 1 && score < p && (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 's', 'z', 'q', 'd', 'S', 'Z', 'Q', 'D'].includes(ev.key)) || ['swipeleft', 'swipedown', 'swiperight', 'swipeup'].includes(ev.type)) {
        // anime universel
        anime({
            targets: '#PacT',
            duration: 200,
            keyframes: [
                { rotate: -45 },
                { rotate: 0 }
            ],
            easing: 'easeInOutExpo',
        });
        anime({
            targets: '#PacB',
            duration: 200,
            keyframes: [
                { rotate: 45 },
                { rotate: 0 }
            ],
            easing: 'easeInOutExpo',
        });
        turn++;
        if (turn % 2 == 1 && rotateTui.length > 0) {
            calcTurn(rotateTui);
        }
        if ((['s', 'S', 'ArrowDown'].includes(ev.key) || ['swipedown'].includes(ev.type)) && PCY < 5 && esp[x].style.borderBottomWidth != "2px" && esp[x + 5].style.borderTopWidth != "2px") {
            x += 5;

            PCY = PCY + 1;
            PCY2 += 1;
            PacMan.style.gridArea = `${PCY}/${PCX}/${PCY2}/${PCX2}`;
            py += espH;
            anime({
                targets: '#PacMan',
                translateY: py,
                duration: 100,
                easing: 'easeInOutExpo'
            });
            anime({
                targets: '#PacC',
                rotate: 90,
                easing: 'easeInOutExpo',
                duration: 100
            });

        }
        if ((['z', 'Z', 'ArrowUp'].includes(ev.key) || ['swipeup'].includes(ev.type)) && PCY > 1 && esp[x].style.borderTopWidth != "2px" && esp[x - 5].style.borderBottomWidth != "2px") {
            x -= 5;

            PCY = PCY - 1;
            PCY2 -= 1;
            PacMan.style.gridArea = `${PCY}/${PCX}/${PCY2}/${PCX2}`;
            py -= espH;
            anime({
                targets: '#PacMan',
                translateY: py,
                duration: 100,
                easing: 'easeInOutExpo'
            });
            anime({
                targets: '#PacC',
                rotate: 270,
                easing: 'easeInOutExpo',
                duration: 100
            });
        }
        if ((['d', 'D', 'ArrowRight'].includes(ev.key) || ['swiperight'].includes(ev.type)) && PCX < 5 && esp[x].style.borderRightWidth != "2px" && esp[x + 1].style.borderLeftWidth != "2px") {
            x++;

            PCX = PCX + 1;
            PCX2 += 1;
            PacMan.style.gridArea = `${PCY}/${PCX}/${PCY2}/${PCX2}`;
            px += espW;
            anime({
                targets: '#PacMan',
                translateX: px,
                duration: 100,
                easing: 'easeInOutExpo'
            });
            anime({
                targets: '#PacC',
                rotate: 0,
                easing: 'easeInOutExpo',
                duration: 100
            });
        }
        if ((['q', 'Q', 'ArrowLeft'].includes(ev.key) || ['swipeleft'].includes(ev.type)) && PCX > 1 && esp[x].style.borderLeftWidth != "2px" && esp[x - 1].style.borderRightWidth != "2px") {
            x--;
            PCX = PCX - 1;
            PCX2 -= 1;
            PacMan.style.gridArea = `${PCY}/${PCX}/${PCY2}/${PCX2}`;
            px -= espW;
            anime({
                targets: '#PacC',
                rotate: 180,
                easing: 'easeInOutExpo',
                duration: 100
            });
            anime({
                targets: '#PacMan',
                translateX: px,
                duration: 100,
                easing: 'easeInOutExpo'
            });
        }

        for (i = 0; i < p; i++) {
            if (PacMan.style.gridArea == pointI[i].style.gridArea && pointI[i].style.backgroundColor == "white") {
                pointI[i].style.backgroundColor = "yellow";
                score += 1;
                scoreS.innerText = `Score: ${score}`;
            }
            if (PacMan.style.gridArea != pointI[i].style.gridArea && pointI[i].style.backgroundColor == "yellow") {
                pointI[i].style.visibility = "hidden";
            }
        }
        // Inventaire des possibilité de mouvement pour le fantom
        if (FCY < 5 && esp[f].style.borderBottomWidth != "2px" && esp[f + 5].style.borderTopWidth != "2px") {
            MouvPossFnt.push("down");
            MouvPoss++;
        }
        if (FCY > 1 && esp[f].style.borderTopWidth != "2px" && esp[f - 5].style.borderBottomWidth != "2px") {
            MouvPossFnt.push("up");
            MouvPoss++;
        }
        if (FCX < 5 && esp[f].style.borderRightWidth != "2px" && esp[f + 1].style.borderLeftWidth != "2px") {
            MouvPossFnt.push("right");
            MouvPoss++;
        }
        if (FCX > 1 && esp[f].style.borderLeftWidth != "2px" && esp[f - 1].style.borderRightWidth != "2px") {
            MouvPossFnt.push("left");
            MouvPoss++;
        }
        // choix du mouvement pour Fnt
        if (MouvPossFnt.length == 1) {
            Mouv = MouvPossFnt[0];
        }
        else if (lastMouv == "") {
            Mouv = MouvPossFnt[Math.floor(Math.random() * MouvPoss)];
        }
        else {
            if (lastMouv == "up") {
                MouvPossFnt = MouvPossFnt.filter(word => word != "down");
            }
            if (lastMouv == "down") {
                MouvPossFnt = MouvPossFnt.filter(word => word != "up");
            }
            if (lastMouv == "left") {
                MouvPossFnt = MouvPossFnt.filter(word => word != "right");
            }
            if (lastMouv == "right") {
                MouvPossFnt = MouvPossFnt.filter(word => word != "left");
            }

            if (MouvPossFnt.length == 1) {
                Mouv = MouvPossFnt[0];
            }
            else {
                MouvPoss--;
                Mouv = MouvPossFnt[Math.floor(Math.random() * MouvPoss)];
            }
        }
        lastMouv = Mouv;
        if (Mouv == "right") {
            f++;

            FCX = FCX + 1;
            FCX2 += 1;
            fantom.style.gridArea = `${FCY}/${FCX}/${FCY2}/${FCX2}`;
            fx += espH;
            anime({
                targets: '#fantom',
                translateX: fx,
                duration: 100,
                easing: 'easeInOutExpo'
            });
        }
        if (Mouv == "left") {
            f--;

            FCX = FCX - 1;
            FCX2 -= 1;
            fantom.style.gridArea = `${FCY}/${FCX}/${FCY2}/${FCX2}`;
            fx -= espH;
            anime({
                targets: '#fantom',
                translateX: fx,
                duration: 100,
                easing: 'easeInOutExpo'
            });
        }
        if (Mouv == "up") {
            f -= 5;
            FCY = FCY - 1;
            FCY2 -= 1;
            fantom.style.gridArea = `${FCY}/${FCX}/${FCY2}/${FCX2}`;
            fy -= espH;
            anime({
                targets: '#fantom',
                translateY: fy,
                duration: 100,
                easing: 'easeInOutExpo'
            });
        }
        if (Mouv == "down") {
            f += 5;

            FCY = FCY + 1;
            FCY2 += 1;
            fantom.style.gridArea = `${FCY}/${FCX}/${FCY2}/${FCX2}`;
            fy += espH;
            anime({
                targets: '#fantom',
                translateY: fy,
                duration: 100,
                easing: 'easeInOutExpo'
            });

        }
        MouvPossFnt = [];
        MouvPoss = 0;
    }
    if (fantom.style.gridArea == PacMan.style.gridArea) {
        restartFunc();
    }
    if (score == p) {
        scoreAll += score;
        score = 0, p = 0;
        nextLevelFunc();
    }
}

