type fwf = "svelte" | "react" | "vuejs" | "all";

enum LinkType {
  GitHub,
  PlayIt,
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
  titre: string;
  logo: ("svelte" | "react" | "vuejs" )[];
  description: string;
  linkBox: LinkSlice[][];
  media: { type: "image" | "vidéo"; link: string };
}

export { LinkType, Device };
export type { LinkSlice, OngletFunc, LibInfo, fwf };
