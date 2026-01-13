type fwf = "svelte" | "react" | "vuejs" | "ts" | "js" | "all";

type Tech =
  | fwf
  | "fastapi"
  | "tailwindcss"
  | "django"
  | "julia"
  | "laravel"
  | "nuxt"
  | "node";

type NameAndImg = { nom: string; image?: string };

type entrerCV = {
  titre: string;
  centre: NameAndImg;
  stage: NameAndImg;
  date: string;
  duréeStage?: string;
  pdf?: string;
  taskStage: string[];
};

enum LinkType {
  GitHub,
  PlayIt,
  Soon,
}

enum Device {
  SmartPhone = "SmartPhone",
  Laptop = "Laptop",
}

interface LinkSlice {
  type: LinkType;
  link: string;
}

interface OngletFunc {
  fn: Function;
  titre: string;
}

interface LibInfo {
  id: number;
  titre: string;
  logo: ("svelte" | "react" | "vuejs" | "ts")[];
  description: string;
  linkBox: LinkSlice[][];
  media: { type: "image" | "vidéo"; link: string; widthMedia?: number };
  date?: Date;
}

interface ProjetInfo {
  titre: string;
  techUse: Tech[];
  date?: Date;
  lien: LinkSlice[];
  device: Device[];
  descritption: string;
  isVid?: { desktop: boolean; phone: boolean };
  desktopSrc?: string;
  phoneSrc?: string;
}

export { LinkType, Device };
export type { LinkSlice, OngletFunc, LibInfo, fwf, Tech, ProjetInfo, entrerCV };
