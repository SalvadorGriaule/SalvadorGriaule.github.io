
function menuPC() {
    nav.children.item(0).style.color = "blue";
    for (i = 0; i < nav.children.length; i++) {
        let j = i;

        nav.children.item(i).addEventListener('click', curChoixVFunc(choixM[j]));

        nav.children.item(i).addEventListener('mouseover', curInitCMenu(j, nav.children));

        nav.children.item(i).addEventListener('mouseleave', curLeaveMenu(j, nav.children));
        index++;
    }
    index = 0;
    window.addEventListener("keyup", curKeyMenu());
}

function keyMenu(ev) {
    if (['s', 'S', 'ArrowDown'].includes(ev.key) && postionCurseur < 2) {
        postionCurseur++;
    }
    if (['z', 'Z', 'ArrowUp'].includes(ev.key) && postionCurseur > 0) {
        postionCurseur--;
    }
    if (ev.key === "Enter") {
        choixVFunc(choixM[postionCurseur]);
    }

    for (i = 0; i < nav.children.length; i++) {
        if (i == postionCurseur) {
            nav.children.item(i).style.color = "blue";
        }
        if (i != postionCurseur) {
            nav.children.item(i).style.color = "yellow";
        }
    }
}

function initCMenu(n, childElem) {

    for (i = 0; i < childElem.length; i++) {
        if (childElem.item(i).style.color == "blue") {
            childElem.item(i).style.color = "yellow";
        }
    }
    childElem.item(n).style.color = "blue";
}

function leaveMenu(n, childElem) {
    childElem.item(n).style.color = "yellow";
}

function choixVFunc(choix) {

    if (choix == "Start") {
        menu.style.display = "none";
        nav.style.display = "none";
        cleanMenu();
        if (scoreAll > 0 || score > 0) {
            scoreAll = 0, nivN = 1;
            changeNiv();
        }
        // Par Baleyage définite une position aux case
        balayArena();
        // initiation des valeur et position
        initPC();
        // Phase de gestion des event
        eventPacMan();

    }
    else if (choix == "Leader Board") {
        nav.style.display = "none";
        cleanMenu();
        leaderBoard();
    }

    function cleanMenu() {

        for (i = 0; i < nav.children.length; i++) {
            let j = i;
            nav.children.item(i).removeEventListener('click', curChoixVFunc(choixM[j]));

            nav.children.item(i).removeEventListener('mouseover', curInitCMenu(j));

            nav.children.item(i).removeEventListener('mouseleave', curLeaveMenu(j));

            index++;
        }
        index = 0;
        window.removeEventListener("keydown", curKeyMenu());
    }
}

function restartFunc() {
    scoreS.innerText = `Game Over`;
    scoreS.style.color = "red";
    life--;
    soundDeath.play();
    restart.appendChild(txtRestart);
    menu.appendChild(restart);
    choixFinFunc();
    document.addEventListener('keyup' , curKeyChoixFiN('restart'));
    yes.addEventListener('click', initRestard);
}

function initRestard() {
    yes.removeEventListener('click', initRestard);
    document.removeEventListener('keyup' , curKeyChoixFiN('restart'));
    menu.style.display = "none";
    restart.remove();
    choixFinNiv.remove();
    score = 0;
    scoreS.style.color = "yellow";
    scoreS.innerText = `Score: ${score}`;
    initPC();
}

function nextLevelFunc() {
    scoreS.innerText = `Victoire`;
    nextLevel.appendChild(txtNextLevel);
    menu.appendChild(nextLevel);
    choixFinFunc();
    document.addEventListener('keyup' , curKeyChoixFiN('nextLevel'));
    yes.addEventListener('click', initNextLevel);
}

function choixFinFunc() {
    menu.appendChild(choixFinNiv);
    choixFinNiv.setAttribute("id", "menuChEnd");
    yes.appendChild(yesTxt);
    choixFinNiv.appendChild(yes);
    no.appendChild(noTxt);
    choixFinNiv.appendChild(no);
    nextLevel.style.width = "150px";
    menu.style.display = "flex";
    menu.style.height = "95px";
    menu.style.marginBlock = "250px";
    menu.style.position = "absolute";
    menu.style.zIndex = "1";
    no.addEventListener('click', returnScore);
}

function initNextLevel() {
    console.log("combien de next level",handlersKCF);
    
    menu.style.display = "none";
    yes.removeEventListener('click', initNextLevel);
    document.removeEventListener('keyup' , curKeyChoixFiN('nextLevel'));
    nextLevel.remove();
    choixFinNiv.remove();
    PacMan.remove();
    fantom.remove();
    niveau.style.display = "none";
    if (score == 0) {
        nivN = nivN + 1;
    }
    changeNiv();
    balayArena();
    initPC();
}

function changeNiv() {
    niveau = document.getElementById(`niv${nivN}`);
    niveau.style.display = "grid";
    esp = niveau.getElementsByClassName("esp");
    pointI = niveau.getElementsByClassName("point");
    if (niveau.getElementsByClassName("rotate").length > 0) {
        rotateTui = niveau.getElementsByClassName("rotate");
    }
    scoreS.style.color = "yellow";
    scoreS.innerText = `Score: ${score}`;
    x = 0, p = 0, turn = 0;
    esp[x].appendChild(PassNivPM);
    PassNivPM.setAttribute("id", "PacMan");
    PassNivPM.appendChild(PacC);
    PacC.setAttribute("id", "PacC");
    PacC.appendChild(PacT);
    PacT.setAttribute("id", "PacT");
    PacC.appendChild(PacB);
    PacB.setAttribute("id", "PacB");
    PacMan = document.getElementById("PacMan");
    esp[esp.length - 1].appendChild(PassNivFnt);
    PassNivFnt.setAttribute("id", "fantom");
    fantom = document.getElementById("fantom");
    PCX = 1, PCX2 = 2;
    PCY = 1, PCY2 = 2;
}

function backFunc() {
    back.removeEventListener('click', backFunc);
    back.style.display = "none";
    affLB.style.display = "none";
    nextLevel.remove();
    choixFinNiv.remove();
    restart.remove();
    menu.removeAttribute("style");
    nav.style.display = "flex";
    nav.children.item(2).style.color = "yellow";
    menuPC();
}

function keyChoixFiN(ev, mode) {
    if (['d', 'D', 'ArrowRight'].includes(ev.key) && postionCurseur < 1) {
        postionCurseur++;
    }
    if (['q', 'Q', 'ArrowLeft'].includes(ev.key) && postionCurseur > 0) {
        postionCurseur--;
    }
    if (ev.key === "Enter") {
        if (postionCurseur === 0) {
            console.log(mode);
            if (mode === 'restart') {
                initRestard();
            }
            else {
                initNextLevel();
            }
        }
        else {
            returnScore();
        }
    }

    for (i = 0; i < choixFinNiv.children.length; i++) {
        if (i == postionCurseur) {
            choixFinNiv.children.item(i).style.color = "blue";
        }
        if (i != postionCurseur) {
            choixFinNiv.children.item(i).style.color = "yellow";
        }
    }
}