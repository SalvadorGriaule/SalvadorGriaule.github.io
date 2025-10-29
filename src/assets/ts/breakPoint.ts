interface SlicePile {
    fn: Function;
    value: any[]
}

let pileFunc:SlicePile[] = []

const breakPointAdd = (func:Function, ...value:any[]) => {
    pileFunc.push({ fn: func, value: value });
    execBreakPoint()
}

const execBreakPoint = () => {
    for(let i = 0;i < pileFunc.length;i++){
        pileFunc[i].fn.apply(null,pileFunc[i].value);
    }

    window.onresize = execBreakPoint
}

export { breakPointAdd, execBreakPoint }