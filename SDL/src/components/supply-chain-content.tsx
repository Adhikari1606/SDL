"use client";

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CustomersCarousel } from './customers-carousel';
import { ContactForm } from './contact-form';
import { IndustriesCarousel } from './industries-carousel';
import { Map } from './map';
import { GlobalNetwork } from './global-network';
import { GlobalNetworkMap } from './global-network-map';

export function SupplyChainContent() {
  const contentImage = PlaceHolderImages.find(p => p.id === 'supply-chain-technology');
  const chooseUsImage = PlaceHolderImages.find(p => p.id === 'why-choose-us');

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline leading-tight">
              Advanced technology powering supply chain optimisation
            </h2>
            <p className="text-muted-foreground text-lg">
              TVS SCS has a dedicated global technology team that are applying AI, machine learning, 3D printing, robotics, automation and cloud computing to realise the full value from your supply chain and logistics operations.
            </p>
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full">
              Explore technology
              <div className="bg-cyan-600 rounded-full p-1 ml-2">
                <ArrowRight className="h-4 w-4" />
              </div>
            </Button>
          </div>
          <div>
            {contentImage && (
              <Image
                src={contentImage.imageUrl}
                alt={contentImage.description}
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
                data-ai-hint={contentImage.imageHint}
              />
            )}
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline leading-tight">Our Valuable Customers</h2>
              <p className="text-muted-foreground text-lg mt-2">We are trusted by leading companies across the globe.</p>
          </div>
          <CustomersCarousel />
        </div>
        
        <div className="mt-24 md:mt-32 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            {chooseUsImage && (
              <Image
                src={chooseUsImage.imageUrl}
                alt={chooseUsImage.description}
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
                data-ai-hint={chooseUsImage.imageHint}
              />
            )}
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline leading-tight">
              Why Choose Us?
            </h2>
            <p className="text-muted-foreground text-lg">
              We have strong leadership team, with more than 20 years of experience across industry. Our expertise and commitment to delivering exceptional services have made us a preferred choice for businesses seeking reliable and efficient solutions. At SDL, we understand the importance of keeping up with the ever-changing digital landscape and continuously strive to stay ahead of the curve. With our strong dedication to customer satisfaction, you can trust us to deliver tailored solutions that drive success for your business.
            </p>
            <Button size="lg">
              Connect With us?
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline leading-tight">Our Industries Experience</h2>
              <p className="text-muted-foreground text-lg mt-2">We have a proven track record across a wide range of industries.</p>
          </div>
          <IndustriesCarousel />
        </div>

        <div className="mt-24 md:mt-32">
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline leading-tight">Our Global Network</h2>
              <p className="text-muted-foreground text-lg mt-2">Partnering with you wherever your business grows.</p>
          </div>
          <Map />
        </div>

        <div className="mt-24 md:mt-32 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline leading-tight">
              Let's dive into the world of supply chain
            </h2>
            <p className="text-muted-foreground text-lg">
              Connect with one of our supply chain specialists to discover how we can customize our solutions to suit your business needs.
            </p>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
