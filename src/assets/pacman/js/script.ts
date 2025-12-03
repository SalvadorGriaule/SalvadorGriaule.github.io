const area = document.getElementById("area");
const scoreS = document.getElementById("Score");
//************  valeur pour perso */
var fantom = document.getElementById("fantom");
var PacMan = document.getElementById("PacMan");
const PassNivPM = document.createElement("div");
const PacC = document.createElement("div");
const PacT = document.createElement("div");
const PacB = document.createElement("div");
const PassNivFnt = document.createElement("div"); 
//************ valeur pour niv */
var niveau = document.getElementById("niv1");
var esp = niveau.getElementsByClassName("esp");
let espH = esp[0].clientHeight;
let espW = esp[0].clientWidth;
var pointI = niveau.getElementsByClassName("point");
var rotateTui = 0;
/************  valeur text fin niv */
const restart = document.createElement("p");
const txtRestart = document.createTextNode("Restart ?");
const nextLevel = document.createElement("p");
const txtNextLevel = document.createTextNode("Next Level ?");
const choixFinNiv = document.createElement("ul");
const yes = document.createElement("li");
const yesTxt = document.createTextNode("Oui");
const no = document.createElement("li");
const noTxt = document.createTextNode("Non");
/***************valeur de fonctionnementt */
var score = 0,scoreAll = 0, life = 0, nivN = 1,turn = 0;

var PCX = 1, PCX2 = 2;
var PCY = 1, PCY2 = 2;
var px = 0, py = 0;

var FCX = 5, FCX2 = 6;
var FCY = 5, FCY2 = 6;
var fx = 0, fy = 0;
var MouvPossFnt = [];
var lastMouv = "";
var MouvPoss = 0, Mouv = 0;
var bordure = [0,0,0,0];

var x = 0, p = 0;
var f = 24;
var i = 0, i2 = 0, i3 = 0;
/******************Valeur tactile*************************/
let hammertime = new Hammer(area);
hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
//********************Valeur pour menu****************** */
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
const handlers = {}, handlersT = {}, handlersEV = {};
const handlersC = {}, handlersK = {}, handlersKCF = {};

var postionCurseur = 0, index = 0;
var choixM = ["Start", "Option", "Leader Board"];
var choixV = "";
//********************Valeur pour Leader Board****************** */
const affLB = document.getElementById("ldAff");
const back = document.getElementById("back");
const inputN = document.getElementById("inputName");
const formN = document.getElementById("formN");
const formNval = document.forms[0];

var dbLB = new Dexie("LeaderBoard");
dbLB.version(1).stores({
    bestScores:`id,nameLB,scoreLB`,
});

//******************Valeur pour l'audio***************** */
const soundBegin = new Audio('asset/audio/pacman_beginning.wav');
const soundDeath = new Audio('asset/audio/pacman_death.wav');

/****************Fontion curryfié************************ */
var curLeaveMenu = function (Var,Var2) {
    return handlersT[index] || (handlersT[index] = function curried_func(e) {
        leaveMenu(Var,Var2);
    });
}
var curChoixVFunc = function (Var) {
    return handlersC[index] || (handlersC[index] = function curried_func(e) {
        choixVFunc(Var);
    });
}
var curInitCMenu = function (Var,Var2) {
    return handlers[index] || (handlers[index] = function curried_func(e) {
        initCMenu(Var,Var2);
    });
}
var curKeyMenu = function () {
    return handlersK[index] || (handlersK[index] = function curried_func(e) {
        keyMenu(e);
    });
}
var curEvLisPacMan = function () {
    return handlersEV[index] || (handlersEV[index] = function curried_func(e) {
        evLisPacMan(e);
    });
}
var curKeyChoixFiN = function (Var) {
    return handlersKCF[index] || (handlersKCF[index] = function curried_func(e) {
        keyChoixFiN(e,Var);
    });
}

dbLB.bestScores.bulkPut([
    { id: 1, nameLB: "PAC", scoreLB: 15 },
    { id: 2, nameLB: "MAN", scoreLB: 12 },
    { id: 3, nameLB: "SET", scoreLB: 10 }])
    
menuPC();
