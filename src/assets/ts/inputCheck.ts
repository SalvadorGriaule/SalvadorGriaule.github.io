let mailRegExp: RegExp =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

function inputCheck(input: string, regExp: RegExp, inverse: boolean = false): boolean {
    if (regExp.test(input)) {
        return inverse ? true : false;
    } else {
        if (input !== "") {
            return inverse ? false : true;
        }
    }
    return false;
}

function basicState(state: number) {
    switch (state) {
        case 0:
            return "border-zinc-500"
        case 1:
            return "border-green-600"
        default:
            return "border-red-600"
    }
}

function the3State(input: string, regExp: RegExp, invers: boolean = false) {
    let state: number
    if (invers) {
        state = input == "" ? 0 : (!inputCheck(input, regExp) ? 1 : 2);
    } else {
        state = input == "" ? 0 : (inputCheck(input, regExp) ? 1 : 2);
    }

    return basicState(state)
}

const checkingAll = (stateCheck: boolean[], input: string) => {
    let state: number
    if (input == "") {
        state = 0
    } else if (stateCheck.find((elem) => elem == false) != undefined) {
        state = 2
    } else {
        state = 1
    }

    return basicState(state)
}

function fullNumCheck(input: string) {
    return the3State(input, /\D/)
}

function nameCheck(input: string) {
    return the3State(input, /[^a-zA-ZéàèçÉÀÈßÇ\s-]/)
}

function emailCheck(input: string) {
    return the3State(input, mailRegExp, true)
}

function sameCheck(input: string, ref: string) {
    let state: number

    state = input == "" ? 0 : (ifSame(input, ref) ? 1 : 2);

    return basicState(state)
}

function ifEmail(input: string) {
    return inputCheck(input, mailRegExp, true)
}

function ifName(input: string) {
    return inputCheck(input, /[^a-zA-ZéàèçÉÀÈßÇ\s-]/)
}

function inputMinL(input: string) {
    return input.length > 8
}

function ifNumCheck(input: string) {
    return inputCheck(input, /\d/, true)
}

function iFOneUpper(input: string) {
    return inputCheck(input, /[A-Z]/, true)
}

function ifOneLower(input: string) {
    return inputCheck(input, /[a-z]/, true)
}

function ifSpecChar(input: string) {
    return inputCheck(input, /[#|~!?,.;§€$£%:\*\(\)]/, true)
}

function ifCheck(input: boolean | string) {
    if (typeof input == "string") {
        return input == "on" || input == "true"
    }
    return input;
}

function ifSame(input: string, ref: string): boolean {
    return input == ref;
}

function selectCheck(input: string, select: string[]) {
    if (select.find((elem) => elem == input)) return true
    return false
}

function ifTel(input: string) {
    let without = input.replaceAll(" ", "")
    if (ifNumCheck(without)) return without.length == 10
    return false
}

function checkHoraire(minH: number, maxH: number, input: string) {

    if (minH < 0 || maxH > 24) return false
    for (let i = minH; i + 1 <= maxH; i++) {
        if (input == `${i}h-${i + 1}h`) return true
    }
    return false
}

function noSpace(input: string) {
    return !(input.includes(" "))
}

function noEndJs(input: string) {
    return !(input.includes(";"))
}

function noChev(input: string) {
    return !(input.includes(">"))
}

function ifDateValide(input: string) {
    let split = input.split("/")
    let newDate = `${split[1]}/${split[0]}/${split[2]}`;
    return new Date(newDate) != undefined;
}

function ifString(input: string) {
    return typeof input == "string"
}

function inputMaxL(input: string) {
    return input.length < 32
}

function ifStrSecure(input: string){
    return ![noChev(input),noEndJs(input),noSpace(input)].includes(false)
}

const testList = {
    tel: ifTel,
    check: ifCheck,
    string: ifString,
    dateValide: ifDateValide,
    name: ifName,
    email: ifEmail,
    numCheck: ifNumCheck,
    oneLower: ifOneLower,
    same: ifSame,
    noSpace: noSpace,
    noEndJs: noEndJs,
    noChev: noChev,
    specChar: ifSpecChar,
    oneUpper: iFOneUpper,
    maxL: inputMaxL,
    strSecure: ifStrSecure
}


export { testList, checkHoraire, checkingAll, inputCheck, fullNumCheck, nameCheck, emailCheck, sameCheck, inputMinL, selectCheck }