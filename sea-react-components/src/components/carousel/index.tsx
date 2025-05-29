"use client";
import { Icon, iconExists } from "@iconify/react";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

export type Props = {
  name: string;
  items: React.ReactNode[];
  auto?: boolean;
  duration?: number;
  nextButton?: React.ReactNode;
  previousButton?: React.ReactNode;
  showNextPreviousButtons?: boolean;
  dot?: React.ReactNode;
  showDots?: boolean;
  itemsPerSlide?: number;
  dropAndDregControl?: boolean;
  autoHeight?: boolean;
};
export default function Carousel({
  name,
  items,
  auto = false,
  duration = 3000,
  nextButton,
  previousButton,
  showNextPreviousButtons = true,
  dot,
  showDots = true,
  itemsPerSlide = 1,
  dropAndDregControl = false,
  autoHeight = true,
}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (itemsPerSlide > items.length) itemsPerSlide = items.length;
  if (itemsPerSlide <= 0) itemsPerSlide = 1;

  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  if (totalSlides <= 1) {
    showDots = false;
    showNextPreviousButtons = false;
  }

  const goToSlide = (slide: number) => {
    setCurrentSlide((slide + totalSlides) % totalSlides);
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const previousSlide = () => goToSlide(currentSlide - 1);

  // Auto-slide functionality
  useEffect(() => {
    if (auto) {
      intervalRef.current = setInterval(nextSlide, duration);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [auto, duration, currentSlide]);

  // Drag functionality
  useEffect(() => {
    if (!dropAndDregControl || !carouselRef.current) return;

    let startX = 0;
    let isDragging = false;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      if (startX - e.pageX > 50) {
        nextSlide();
        isDragging = false;
      } else if (startX - e.pageX < -50) {
        previousSlide();
        isDragging = false;
      }
    };

    const onMouseUp = () => (isDragging = false);

    const element = carouselRef.current;
    element.addEventListener("mousedown", onMouseDown);
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseup", onMouseUp);

    return () => {
      element.removeEventListener("mousedown", onMouseDown);
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("mouseup", onMouseUp);
    };
  }, [dropAndDregControl, currentSlide]);

  // Auto height functionality
  useEffect(() => {
    if (autoHeight && carouselRef.current) {
      let max = 0;

      let end = currentSlide * itemsPerSlide + itemsPerSlide;
      if (end > items.length) end = items.length;

      for (let i = currentSlide * itemsPerSlide; i < end; i++) {
        const slide = carouselRef.current.children[i]?.children[0];

        if (max < (slide as HTMLElement).offsetHeight)
          max = (slide as HTMLElement).offsetHeight;
      }
      setCarouselHeight(max);
    }
  }, [currentSlide, autoHeight]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={autoHeight ? { height: carouselHeight || "auto" } : undefined}
    >
      {/* Items */}
      <div
        ref={carouselRef}
        className={clsx(
          "flex transition-transform duration-500",
          dropAndDregControl && "cursor-grabbing"
        )}
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${name}-carousel-${index}`}
            className="flex-shrink-0"
            style={{
              width: `${100 / itemsPerSlide}%`,
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {showNextPreviousButtons && (
        <>
          <button
            onClick={previousSlide}
            aria-label="Previous Slide"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
          >
            {previousButton || (
              <Icon
                icon="ooui:next-rtl"
                className={clsx(
                  "transition-all duration-300 ease-in-out text-secondary hover:text-opacity-50"
                )}
              />
            )}
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
          >
            {nextButton || (
              <Icon
                icon="ooui:next-ltr"
                className={clsx(
                  "transition-all duration-300 ease-in-out text-secondary hover:text-opacity-50"
                )}
              />
            )}
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? "bg-secondary" : "bg-gray-300"
              }`}
            >
              {dot || ""}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
