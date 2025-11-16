import { atom } from "nanostores";

const currentSelect = atom<null | number>(null);
const currentTags = atom<"all" | "react" | "svelte" | "vuejs" | "ts">("all");
const currentVisible = atom<null | number>(null);

export const setSelect = (num: number) => {
  currentSelect.set(num);
};

const linearColor = [
  "oklch(80.9% 0.105 251.813)",
  "oklch(70.7% 0.165 254.624)",
  "oklch(62.3% 0.214 259.815)",
  "oklch(54.6% 0.245 262.881)",
];

export { currentSelect, currentTags, currentVisible, linearColor };
