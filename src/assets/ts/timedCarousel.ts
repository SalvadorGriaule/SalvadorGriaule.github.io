import { breakPointAdd } from "./breakPoint";
import anime from "animejs";
let currentImg = 0;

const initNav = (target: HTMLElement, carousel: HTMLElement) => {
    const tabDiv = document.createElement("div");
    tabDiv.className = "flex h-3 w-full mt-2";
    let itemLenght = `${100 / carousel.children.length - 0.5}%`  
    for (let i = 0; i < carousel.children.length; i++) {
        let j = i;
        const div = document.createElement("div");
        const divProg = document.createElement("div");
        div.className = "btnCar h-3 ml-[0.5%] bg-[rgba(0,0,0,0.35)] backdrop-blur-md";
        div.style.width = itemLenght
        div.append(divProg);
        divProg.className = "h-3 w-0 bg-[rgba(255,255,255,0.35)]";
        tabDiv.append(div);
        div.addEventListener("click", () => { toScrollClick(j, carousel) })
    }
    target.append(tabDiv);
    progNav(document.querySelectorAll(".btnCar"), carousel);
    breakPointAdd(inResize, carousel);
}

const progNav = (arrBtn: NodeListOf<Element>, carousel: HTMLElement) => {
    anime({
        targets: arrBtn[currentImg].children[0],
        width: '100%',
        duration: 3400,
        easing: 'linear',
        complete: function () {
            currentImg++;
            arrBtn[currentImg - 1].children[0].style.width = "0%";
            if (currentImg == arrBtn.length) {
                currentImg = 0;
                carousel.scrollLeft = 0;
            } else {
                carousel.scrollBy({
                    left: carousel.children[0].offsetWidth,
                    behavior: "smooth",
                });
            }
            progNav(arrBtn, carousel);
        }
    })
}

const toScrollClick = (pos: number, carousel: HTMLElement) => {
    carousel.scrollLeft = pos * (carousel.children[0].offsetWidth);
    if (currentImg != pos) {
        const btnCar = document.querySelectorAll(".btnCar");
        anime.remove(btnCar[currentImg].children[0])
        btnCar[currentImg].children[0].style.width = "0%";
        currentImg = pos;
        progNav(btnCar, carousel);
    }
}

const inResize = (carousel: HTMLElement) => {
    carousel.scrollLeft = currentImg * (carousel.children[0].offsetWidth);
}

export { initNav, toScrollClick }