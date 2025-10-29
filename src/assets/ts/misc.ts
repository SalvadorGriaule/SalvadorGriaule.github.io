const makeVisible = (bool: boolean, div: Element | null | undefined) => {
  if (div && bool) {
    div.classList.add("block");
    div.classList.remove("hidden");
  } else if (div) {
    div.classList.add("hidden");
    div.classList.remove("block");
  }
};

const makeVisibleAll = (bool: boolean, list: NodeListOf<Element> | null) => {
    if (list && list.length > 0){
        for(let node of list){
            makeVisible(bool,node)
        }
    }
};

export {makeVisibleAll,makeVisible}
