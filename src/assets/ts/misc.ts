import { lib } from "./nano"

let components: { comp: Element, id: number }[] = []

const stockComp = (div: Element | null | undefined, id: number) => {
  if (div == null || div == undefined) return
  if (components.length == 0) return components.push({ comp: div, id })
  for (let comp of components) {
    if (div == comp.comp) return
  }
  return components.push({ comp: div, id })
}

const cleanArr = () => {
  components = []
}

const mountCoponants = (fw: string, id:number) => {
  if (components.length > 0) {
    for (let comp of components) {
      console.log(comp);
      if (comp.id == id && comp.comp.classList.contains(fw)) return comp
    }
  }
  return
}

const getListComp = () => {
  return components
}

const makeVisible = (bool: boolean, div: Element | null | undefined) => {
  if (div && bool) {
    div.classList.add("flex");
    div.classList.remove("hidden");
  } else if (div) {
    div.classList.add("hidden");
    div.classList.remove("flex");
  }
};

const makeVisibleAll = (bool: boolean, list: NodeListOf<Element> | null) => {
  if (list && list.length > 0) {
    for (let node of list) {
      makeVisible(bool, node)
    }
  }
};

const testURL = (urlCheck: string) => {
  if (window) {
    if (window.location.href == `http://${urlCheck}/`) return true
    if (window.location.href == `https://${urlCheck}/`) return true
  }
  return false
}

const compOpe = {
  add: stockComp,
  clear: cleanArr,
  mount: mountCoponants,
  list: getListComp
}

export { makeVisibleAll, makeVisible, testURL, compOpe }
