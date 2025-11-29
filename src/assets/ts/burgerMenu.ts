import anime from "animejs";

function getNav(nav: HTMLElement) {
    let arrNav: { name: string, href: string }[] = []
    nav.querySelectorAll("li").forEach(elem => {
        arrNav.push({ name: elem.querySelector("a").textContent, href: elem.querySelector("a").href });
    });

    return arrNav;
}

const navDeskToMob = (tabNav: {
    name: string;
    href: string;
}[], target: HTMLElement) => {
    const ul = document.createElement("ul");
    ul.className = "absolute left-0 -top-[38%] z-10";
    ul.id = "menuBurger";
    for (let i = 0; i <= tabNav.length - 1; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        li.className = "text-center text-xl bg-orange-200 border-[1px] border-solid border-black py-[0.75vh] relative";
        li.style.width = target.clientWidth + "px";
        if (i == tabNav.length - 1) li.classList.add("rounded-b-lg")
        li.style.zIndex = String(tabNav.length - i);
        a.href = tabNav[i].href;
        a.textContent = tabNav[i].name;
        li.append(a);
        ul.append(li)
    }
    target.append(ul);
    console.log("ul",ul);
    
    return ul;
}

const animeBurger = (bool: boolean, menu: HTMLElement) => {
    let y: number, startDirection: 'first' | 'last';
    if (bool) {
        y = menu.clientHeight;
        startDirection = 'first';
    } else {
        y = 0;
        startDirection = 'last'
    }
    anime({
        targets: menu.children,
        translateY: y,
        duration: 425,
        easing: 'easeOutQuart',
        delay: anime.stagger(200, { from: startDirection })
    });
}

export { getNav, navDeskToMob, animeBurger }