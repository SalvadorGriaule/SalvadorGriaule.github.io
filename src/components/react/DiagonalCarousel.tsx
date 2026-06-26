"use client";

import { useCallback, useRef, useMemo } from "react";
import anime from "animejs";
import type { ImageMetadata } from "astro";

interface DiagonalCarouselProps {
  slides: (string | ImageMetadata)[];
  distance?: number | { x: number; y: number };
  navBtn?: boolean;
  classNameWH?: string;
  classNamePrin?: string;
}

export default function DiagonalCarousel({
  slides,
  distance = 65,
  navBtn = false,
  classNameWH = "w-130 h-130",
  classNamePrin,
}: DiagonalCarouselProps) {
  const normalizeSlide = useMemo(
    () => slides.map((elem) => (typeof elem === "string" ? elem : elem.src)),
    [slides]
  );

  const slideCount = normalizeSlide.length;

  const ecartSlide = useMemo(() => {
    if (slideCount > 0) {
      if (typeof distance === "number") {
        return { x: distance / slideCount, y: distance / slideCount };
      }
      return { x: distance.x / slideCount, y: distance.y / slideCount };
    }
    return { x: 1, y: 1 };
  }, [distance, slideCount]);

  // slideRefs[i] = élément DOM de la slide d'index i ( stable )
  const slideRefs = useRef<HTMLDivElement[]>([]);

  // visualOrder[i] = index de la slide à la position visuelle i
  // position 0 = bas (derrière), position slideCount-1 = haut (devant)
  const visualOrderRef = useRef<number[]>(
    Array.from({ length: slideCount }, (_, i) => i)
  );

  const lockedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const arraySwitch = useCallback(
    (arr: number[], sens: "down" | "up") => {
      const next = [...arr];
      if (sens === "down") {
        // Le haut de la pile passe en bas
        const save = next.pop()!;
        next.unshift(save);
      } else {
        // Le bas de la pile passe en haut
        const save = next.shift()!;
        next.push(save);
      }
      return next;
    },
    []
  );

  const setZIndexes = useCallback(
    (order: number[]) => {
      order.forEach((slideIndex, position) => {
        const el = slideRefs.current[slideIndex];
        if (el) el.style.zIndex = String(position);
      });
    },
    []
  );

  const navigateCarousel = useCallback(
    (sens: "down" | "up") => {
      if (lockedRef.current || slideCount <= 1) return;
      lockedRef.current = true;

      const currentOrder = visualOrderRef.current;
      const isDown = sens === "down";

      // Slide qui traverse la pile (haut → bas ou bas → haut)
      const movingSlideIndex = isDown
        ? currentOrder[slideCount - 1]
        : currentOrder[0];

      const movingEl = slideRefs.current[movingSlideIndex];

      // Phase 1 : fade out de la slide mobile
      anime({
        targets: movingEl,
        opacity: 0,
        duration: 700,
        easing: "easeInQuad",
        complete: () => {
          // Nouvel ordre visuel
          const newOrder = arraySwitch([...currentOrder], sens);
          visualOrderRef.current = newOrder;

          // Mise à jour du zIndex AVANT la translation
          setZIndexes(newOrder);

          // Téléportation invisible de la slide mobile à sa nouvelle position
          const newPosition = newOrder.indexOf(movingSlideIndex);
          movingEl.style.transform = `translateX(${newPosition * ecartSlide.x}px) translateY(${newPosition * ecartSlide.y}px)`;

          // Phase 2 : fade in de la slide mobile + translation des autres
          anime({
            targets: movingEl,
            opacity: 1,
            duration: 700,
            easing: "easeInQuad",
          });

          // Translation des autres slides
          currentOrder.forEach((slideIndex) => {
            if (slideIndex === movingSlideIndex) return;

            const newPosition = newOrder.indexOf(slideIndex);
            anime({
              targets: slideRefs.current[slideIndex],
              duration: 700,
              translateX: newPosition * ecartSlide.x,
              translateY: newPosition * ecartSlide.y,
              easing: "easeInQuad",
            });
          });

          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            lockedRef.current = false;
          }, 700);
        },
      });
    },
    [arraySwitch, ecartSlide.x, ecartSlide.y, setZIndexes, slideCount]
  );

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? "down" : "up";
      navigateCarousel(direction);
    },
    [navigateCarousel]
  );

  return (
    <div
      onWheel={onWheel}
      data-testid="carousel-container"
      className={`relative flex items-center justify-center w-screen h-fit ${classNamePrin ?? ""}`}
    >
      {navBtn && (
        <button
          type="button"
          data-testid="nav-up"
          onClick={() => navigateCarousel("up")}
          className="text-4xl text-blue-500 cursor-pointer"
        >
          ◄
        </button>
      )}

      <div className={`relative ${classNameWH}`}>
        {normalizeSlide.map((slide, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) slideRefs.current[i] = el;
            }}
            data-testid={`slide-${i}`}
            id={String(i)}
            className="rounded-2xl absolute inset-0 bg-linear-to-br from-sky-500 to-cyan-800 p-1"
            style={{
              transform: `translateX(${i * ecartSlide.x}px) translateY(${i * ecartSlide.y}px)`,
              zIndex: i,
            }}
          >
            <div
              className="h-full w-full rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide})` }}
            />
          </div>
        ))}
      </div>

      {navBtn && (
        <button
          type="button"
          data-testid="nav-down"
          onClick={() => navigateCarousel("down")}
          className="text-4xl text-blue-500 cursor-pointer"
          style={{ marginLeft: ecartSlide.x * 2 }}
        >
          ►
        </button>
      )}
    </div>
  );
}
