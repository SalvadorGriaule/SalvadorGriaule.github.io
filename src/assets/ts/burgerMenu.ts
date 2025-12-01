import anime from "animejs";

function getNav(nav: HTMLElement) {
  let arrNav: { name: string; href: string }[] = [];
  nav.querySelectorAll("li").forEach((elem) => {
    arrNav.push({
      name: elem.querySelector("a").textContent,
      href: elem.querySelector("a").href,
    });
  });

  return arrNav;
}

const navDeskToMob = (
  tabNav: {
    name: string;
    href: string;
  }[],
  target: HTMLElement,
  breakPoint: number = 768
) => {

  let liArr: HTMLLIElement[] = [];
  const resizeTarget: MutationCallback = (mut) => {
    let wid = target.clientWidth;
    for (let li of liArr) {
      li.style.width = wid + "px";
      wid > breakPoint
        ? li.classList.replace("block", "hidden")
        : li.classList.replace("hidden", "block");
    }
  };

  const targetObs = new MutationObserver(resizeTarget);

  const ul = document.createElement("ul");
  ul.className = "absolute left-0 w-full -top-[38%] z-10";
  ul.id = "menuBurger";

  for (let i = 0; i <= tabNav.length - 1; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    li.className =
      "text-center text-xl bg-orange-200 border-[1px] border-solid border-black py-[0.75vh] relative block";
    li.style.width = target.clientWidth + "px";
    if (i == tabNav.length - 1) li.classList.add("rounded-b-lg");
    li.style.zIndex = String(tabNav.length - i);
    a.href = tabNav[i].href;
    a.textContent = tabNav[i].name;
    li.append(a);
    liArr.push(li);
    ul.append(li);
  }

  targetObs.observe(target, { attributes: true, attributeFilter: ["style"] });
  target.append(ul);
  return ul;
};

const animeBurger = (bool: boolean, menu: HTMLElement) => {
  let y: number, startDirection: "first" | "last";
  if (bool) {
    y = menu.clientHeight;
    startDirection = "first";
  } else {
    y = 0;
    startDirection = "last";
  }
  anime({
    targets: menu.children,
    translateY: y,
    duration: 425,
    easing: "easeOutQuart",
    delay: anime.stagger(200, { from: startDirection }),
  });
};

export { getNav, navDeskToMob, animeBurger };
