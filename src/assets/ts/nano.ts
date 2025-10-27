import { atom } from "nanostores"

export const currentSelect = atom<null | number>(null)

export const setSelect = (num:number) => {
    currentSelect.set(num)
}