import anime from "animejs";

export const progress = (animePoint: anime.AnimeParams, animeBar: anime.AnimeParams, reverse: boolean) => {

    let animeSense = reverse ? [animePoint, animeBar] : [animeBar, animePoint];

    let tl = anime
        .timeline({
            easing: "easeOutQuint",
            duration: 600,
        })
        .add(animeSense[0])
        .add(animeSense[1], reverse ? "-=200" : "-=80");
};
