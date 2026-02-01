import { Device, type ProjetInfo, LinkType } from "@svelte/type";

import SMWPhone from "@public/img/SoMuchWaterPhone.png";
import SMWLaptop from "@public/img/SoMuchWaterDesktop.png";
import LecteurPhone from "@public/img/LecteurV2.png";
import LecteurDesktop from "@public/img/LecteurV2Desktop.png";
import PacManDesktop from "@public/img/PacManWishDesktop.png";
import YzelDesktop from "@public/vidéo/ShotCutYzelDesktop.mp4";
import YzelPhone from "@public/vidéo/ShotCutYzelPhone.mp4";
import ImgYzelDesktop from "@public/img/Yzel_Conseil.png";
import ImgYzelPhone from "@public/img/Phone_Yzel_Conseil.png";

export const projet: ProjetInfo[] = [
    {
        titre: "Yzel conseils",
        desktopSrc: { vid: YzelDesktop, img: ImgYzelDesktop.src },
        phoneSrc: { vid: YzelPhone, img: ImgYzelPhone.src },
        lien: [
            {
                link: "",
                type: LinkType.Soon,
            },
        ],
        descritption: "ici",
        techUse: ["svelte", "tailwindcss", "ts", "node"],
        device: [Device.SmartPhone, Device.Laptop],
    },
    {
        titre: "SoMuchWater",
        desktopSrc: { img: SMWLaptop.src },
        phoneSrc: { img: SMWPhone.src },
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
        desktopSrc: { img: LecteurDesktop.src },
        phoneSrc: { img: LecteurPhone.src },
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
        desktopSrc: { img: PacManDesktop.src },
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
        date: new Date("August 19, 2020 23:15:30"),
    },
];

