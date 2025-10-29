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

  
  return (
    <>
      <main className="w-screen h-screen flex justify-center items-center flex-col">
        <CarouselCircle urlArr={imgHolder} dim={dim} currentImg={current} />
        <div className="mt-8 space-x-1">
          {imgHolder.map((elem, i) => {
            return (
              <button
                onClick={() => handleClick(i)}
                className="bg-linear-to-r from-slate-300 to-slate-400"
                key={i}
              >
                {i}
              </button>
            );
          })}
        </div>
        <p>{current}</p>
      </main>
    </>
  );
}


