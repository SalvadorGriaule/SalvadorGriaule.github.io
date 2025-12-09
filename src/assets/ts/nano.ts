import { type LibInfo, type ProjetInfo, LinkType, Device } from "@svelte/type";
import { atom, map, computed } from "nanostores";
import ImgOfUploader from "@public/img/ImgCardUploader.png";
import CarouselGif from "@public/img/CircleCarCut.webm";
import BtnCarousel from "@public/img/BtnCarousel.webm";
import PWInput from "@public/img/PasswordInput.png";
import MultiSelect from "@public/img/MultiSelact.png";
import VidBurger from "@public/img/BurgerMenu.webm";
import SMWPhone from "@public/img/SoMuchWaterPhone.png";
import SMWLaptop from "@public/img/SoMuchWaterDesktop.png";
import LecteurPhone from "@public/img/LecteurV2.png";
import LecteurDesktop from "@public/img/LecteurV2Desktop.png";
import PacManDesktop from "@public/img/PacManWishDesktop.png";

const currentSelect = atom<null | number>(null);
const currentTags = atom<"all" | "react" | "svelte" | "vuejs" | "ts">("all");

interface CardVisible {
  id: number | null;
  cardSection: HTMLElement | null;
}

const currentVisible = map<CardVisible>({ id: null, cardSection: null });

const inSlot = computed(currentVisible, (elem) => {
  if (elem.cardSection) return elem.cardSection.querySelector(".slotCard");
  return null;
});

export const setSelect = (num: number) => {
  currentSelect.set(num);
};

const linearColor = [
  "oklch(80.9% 0.105 251.813)",
  "oklch(70.7% 0.165 254.624)",
  "oklch(62.3% 0.214 259.815)",
  "oklch(54.6% 0.245 262.881)",
];

const projet: ProjetInfo[] = [
  {
    titre: "SoMuchWater",
    desktopSrc: SMWLaptop.src,
    phoneSrc: SMWPhone.src,
    lien: [
      {
        link: "https://github.com/SalvadorGriaule/SoMuchWater",
        type: LinkType.GitHub,
      },
    ],
    descritption: "ici",
    techUse: ["nuxt", "fastapi", "ts", "tailwindcss", "julia"],
    device: [Device.SmartPhone, Device.Laptop],
  },
  {
    titre: "Lecteur",
    desktopSrc: LecteurDesktop.src,
    phoneSrc: LecteurPhone.src,
    lien: [
      {
        link: "https://github.com/SalvadorGriaule/LecteurV2",
        type: LinkType.GitHub,
      },
    ],
    descritption: "ici",
    techUse: ["js"],
    device: [Device.SmartPhone, Device.Laptop],
  },
  {
    titre: "pacman",
    desktopSrc: PacManDesktop.src,
    lien: [
      {
        link: "https://github.com/SalvadorGriaule/PacMan-",
        type: LinkType.GitHub,
      },
      {
        link: "/demo/pacman",
        type: LinkType.PlayIt,
      },
    ],
    descritption: "ici",
    techUse: ["js"],
    device: [Device.Laptop],
    date: new Date("August 19, 2020 23:15:30")
  },
];

const lib = new Map<number, LibInfo>([
  [
    0,
    {
      id: 0,
      titre: "Carousel en cercle",
      logo: ["svelte", "react"],
      description:
        "Le composant gère automatiquement le passage d'une image à l'autre avec un effet de fondu circulaire, en ajustant les dimensions et la position des images.",
      linkBox: [
        [
          {
            type: LinkType.GitHub,
            link: "https://github.com/SalvadorGriaule/CarouselCircle",
          },
        ],

        [
          {
            type: LinkType.GitHub,
            link: "https://github.com/SalvadorGriaule/CircleCarouselReact",
          },
        ],
      ],
      media: { type: "vidéo", link: CarouselGif, widthMedia: 11 },
    },
  ],
  [
    1,
    {
      id: 1,
      titre: "Uploader en Drag and Drop",
      logo: ["svelte", "vuejs"],
      description:
        "Ce composant est un Dropzone personnalisé permettant le téléchargement de fichiers avec plusieurs fonctionnalités avancées.",
      linkBox: [
        [
          {
            type: LinkType.GitHub,
            link: "https://github.com/SalvadorGriaule/FileUploader",
          },
        ],
        [
          {
            type: LinkType.GitHub,
            link: "https://github.com/SalvadorGriaule/FileUploaderVue",
          },
        ],
      ],
      media: { type: "image", link: ImgOfUploader.src },
    },
  ],
  [
    2,
    {
      id: 2,
      titre: "Password input",
      logo: ["svelte"],
      description: "Composant de champs pour password interactive",
      linkBox: [
        [
          {
            type: LinkType.GitHub,
            link: "https://github.com/SalvadorGriaule/PasswordInput",
          },
        ],
      ],
      media: { type: "image", link: PWInput.src },
    },
  ],
  [
    3,
    {
      id: 3,
      titre: "Carousel à bouton",
      logo: ["ts"],
      description: "Carousel à bouton",
      linkBox: [
        [
          {
            type: LinkType.GitHub,
            link: "https://github.com/SalvadorGriaule/CarouselBtn",
          },
        ],
      ],
      media: { type: "vidéo", link: BtnCarousel, widthMedia: 19 },
    },
  ],
  [
    4,
    {
      id: 4,
      titre: "MultiSelect",
      logo: ["svelte"],
      description:
        "un sélecteur multiple avancé avec hiérarchie qui offre une expérience utilisateur riche avec recherche, hiérarchie visuelle, et feedback immédiat des sélections.",
      linkBox: [
        [
          {
            type: LinkType.GitHub,
            link: "https://github.com/SalvadorGriaule/multiSelect",
          },
        ],
      ],
      media: { type: "image", link: MultiSelect.src },
    },
  ],
  [
    5,
    {
      id: 5,
      titre: "Menu burger",
      logo: ["ts"],
      description:
        "transforme un menu classique en menu burger animé en tiroire",
      linkBox: [
        [
          {
            type: LinkType.GitHub,
            link: "",
          },
        ],
      ],
      media: { type: "vidéo", link: VidBurger, widthMedia: 24 },
    },
  ],
]);

export {
  currentSelect,
  currentTags,
  currentVisible,
  inSlot,
  linearColor,
  lib,
  projet,
};
