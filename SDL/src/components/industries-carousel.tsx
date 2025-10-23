"use client";

import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const industryLogos = [
  { id: 'industry1', src: 'https://picsum.photos/seed/11/140/70', alt: 'Automotive' },
  { id: 'industry2', src: 'https://picsum.photos/seed/12/140/70', alt: 'Healthcare' },
  { id: 'industry3', src: 'https://picsum.photos/seed/13/140/70', alt: 'Retail' },
  { id: 'industry4', src: 'https://picsum.photos/seed/14/140/70', alt: 'Technology' },
  { id: 'industry5', src: 'https://picsum.photos/seed/15/140/70', alt: 'Manufacturing' },
  { id: 'industry6', src: 'https://picsum.photos/seed/16/140/70', alt: 'Aerospace' },
  { id: 'industry7', src: 'https://picsum.photos/seed/17/140/70', alt: 'E-commerce' },
  { id: 'industry8', src: 'https://picsum.photos/seed/18/140/70', alt: 'FMCG' },
  { id: 'industry9', src: 'https://picsum.photos/seed/19/140/70', alt: 'Energy' },
  { id: 'industry10', src: 'https://picsum.photos/seed/20/140/70', alt: 'Logistics' },
];

export function IndustriesCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {industryLogos.map((logo) => (
          <CarouselItem key={logo.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
            <div className="p-1">
              <div className="flex aspect-video items-center justify-center p-6 bg-muted rounded-lg">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={70}
                  className="object-contain"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
