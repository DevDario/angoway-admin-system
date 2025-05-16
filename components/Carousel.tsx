import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../src/components/ui/carousel";

export function CustomCarousel({
  children,
  customStyle,
}: {
  children: React.ReactNode[];
  customStyle?: React.CSSProperties | undefined;
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full carousel"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      style={customStyle}
    >
      <CarouselContent className="-ml-1 flex gap-4">
        {children.map((child, index) => (
          <CarouselItem key={index} className="basis-auto flex-1 p-0">
            <div className="flex items-center justify-center w-full">{child}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
