import type { entrerCV } from "@svelte/type";

import Ceppic from "@assets/logo-ceppic-white.svg";
import Yzel from "@assets/logoRecadre.svg";

import RefPrépa from "@public/pdf/i0201-se-preparer-a-entrer-en-formation-dans-le-numerique_v2-1.pdf";
import RefDevWeb from "@public/pdf/i5202-developpeur-web-web-mobile-1.pdf";
import RefFullStack from "@public/pdf/i6201-concepteur-developpeur-web-full-stack.pdf";

export const entrer: entrerCV[] = [
    {
        titre: "Formation développeur full-stack",
        centre: { nom: "Ceppic - isneauville", image: Ceppic.src },
        stage: { nom: "en recherche" },
        date: "2025 - 2026",
        niveau: 3,
        pdf: RefFullStack,
        taskStage: [],
    },
    {
        titre: "Formation développeur web et web mobile",
        centre: { nom: "Ceppic - isneauville", image: Ceppic.src },
        stage: { nom: "Yzel conseils", image: Yzel.src },
        date: "2024 - 2025",
        niveau: 2,
        duréeStage: "2 mois",
        pdf: RefDevWeb,
        taskStage: [
            "Gestion des inscriptions et des authentification",
            "Développement d’un service d’envoi de mail polyvalent",
            "Messagerie interne avec pièce joint",
            "Gestion dynamique de rendez-vous entre client et employer",
            "Page d’accueil dynamique au scroll",
            "Développement d’une partie administrateur",
        ],
    },
    {
        titre: "Se préparer au métiers de l'informatique et du numérique",
        centre: { nom: "Ceppic - isneauville", image: Ceppic.src },
        stage: { nom: "Yzel conseils", image: Yzel.src },
        date: "2023 - 2024",
        duréeStage: "2 semaines",
        niveau: 0,
        pdf: RefPrépa,
        taskStage: [
            "Élaboration du designe du site",
            "Création de la page d’accueil et du formualire de contact",
        ],
    },
];
