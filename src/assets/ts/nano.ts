import { atom } from "nanostores";

const currentSelect = atom<null | number>(null);
const currentTags = atom<"all" | "react" | "svelte" | "vuejs">("all");
const currentVisible = atom<null | number>(null)

export const setSelect = (num: number) => {
  currentSelect.set(num);
};

export { currentSelect, currentTags, currentVisible };
