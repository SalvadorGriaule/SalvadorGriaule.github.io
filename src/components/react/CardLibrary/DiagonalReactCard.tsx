import DiagonalCarousela from "../DiagonalCarousel";

import ImgHolder1 from "@assets/imgHolder.jpg";
import ImgHolder2 from "@assets/imgHolder2.jpg";
import ImgHolder3 from "@assets/imgHolder3.jpg";

export default function DiagonaleCard() {
    const imgHolder = [ImgHolder1, ImgHolder2, ImgHolder3];

    return (
        <main className="flex justify-center items-center flex-col">
            <DiagonalCarousela slides={imgHolder}/>

        </main>
    )
}