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
export { makeVisibleAll, makeVisible, testURL }
