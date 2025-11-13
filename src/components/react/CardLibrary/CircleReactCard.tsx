import CarouselCircle from "../CarouselCircle";
import { useState, useCallback } from "react";

import ImgHolder1 from "../../../assets/imgHolder.jpg";
import ImgHolder2 from "../../../assets/imgHolder2.jpg";
import ImgHolder3 from "../../../assets/imgHolder3.jpg";

export default function CircleCard() {
  const imgHolder = [ImgHolder1, ImgHolder2, ImgHolder3];
  const [current, setCurrent] = useState(0);
  const dim = 500;

  let gradient: string[] = [];

  for (let i = 0; i < 3; i++) {
    gradient.push(`from-blue-${300 + i * 100}/30 to-blue-${400 + i * 100}/30`);
  }

  const handleClick = useCallback((num: number) => {
    setCurrent(num);
  }, []);

  return (
    <main className="flex justify-center items-center flex-col">
      <CarouselCircle urlArr={imgHolder} dim={dim} currentImg={current} />
      <div className="mt-5 space-x-2">
        {imgHolder.map((elem, i) => {
          return (
            <button
              onClick={() => handleClick(i)}
              className={"p-2 bg-linear-to-l rounded-2xl " + gradient[i]}
              key={i}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </main>
  );
}
