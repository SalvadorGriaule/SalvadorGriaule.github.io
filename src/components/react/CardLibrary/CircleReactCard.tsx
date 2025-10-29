import CarouselCircle from "../CarouselCircle";
import { useState, useCallback } from "react";

import ImgHolder1 from "../../../assets/imgHolder.jpg";
import ImgHolder2 from "../../../assets/imgHolder2.jpg";
import ImgHolder3 from "../../../assets/imgHolder3.jpg";

export default function CircleCard() {
  const imgHolder = [ImgHolder1, ImgHolder2, ImgHolder3];
  const [current, setCurrent] = useState(0);
  const dim = 500;

  const handleClick = useCallback((num: number) => {
    setCurrent(num);
  }, []);

  console.log(imgHolder);
  
  return (

      <main className="flex justify-center items-center flex-col">
        <CarouselCircle urlArr={imgHolder} dim={dim} currentImg={current} />
        <div className="mt-4 space-x-2">
          {imgHolder.map((elem, i) => {
            return (
              <button
                onClick={() => handleClick(i)}
                className="p-2 bg-linear-to-l from-blue-300/30 to-blue-400/30 rounded-2xl"
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


