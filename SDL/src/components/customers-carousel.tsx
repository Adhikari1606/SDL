"use client";

import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const customerLogos = [
  { id: 'logo1', src: 'https://picsum.photos/seed/1/140/70', alt: 'Customer 1' },
  { id: 'logo2', src: 'https://picsum.photos/seed/2/140/70', alt: 'Customer 2' },
  { id: 'logo3', src: 'https://picsum.photos/seed/3/140/70', alt: 'Customer 3' },
  { id: 'logo4', src: 'https://picsum.photos/seed/4/140/70', alt: 'Customer 4' },
  { id: 'logo5', src: 'https://picsum.photos/seed/5/140/70', alt: 'Customer 5' },
  { id: 'logo6', src: 'https://picsum.photos/seed/6/140/70', alt: 'Customer 6' },
  { id: 'logo7', src: 'https://picsum.photos/seed/7/140/70', alt: 'Customer 7' },
  { id: 'logo8', src: 'https://picsum.photos/seed/8/140/70', alt: 'Customer 8' },
  { id: 'logo9', src: 'https://picsum.photos/seed/9/140/70', alt: 'Customer 9' },
  { id: 'logo10', src: 'https://picsum.photos/seed/10/140/70', alt: 'Customer 10' },
];

export function CustomersCarousel() {
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
        {customerLogos.map((logo) => (
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
