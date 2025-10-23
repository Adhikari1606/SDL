
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { StickyNav } from '@/components/sticky-nav';
import { SupplyChainContent } from '@/components/supply-chain-content';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { Footer } from '@/components/footer';
import { GlobalNetworkMap } from '@/components/global-network-map';

export default function Home() {
  const supplyChainImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  const technologyImage = PlaceHolderImages.find(p => p.id === 'hero-technology');
  const [activeDomain, setActiveDomain] = useState<'supply-chain' | 'technology'>('supply-chain');
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const contentRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout>();
  const isManuallyInteracting = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowStickyNav(true);
      } else {
        setShowStickyNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const startAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    autoplayIntervalRef.current = setInterval(() => {
      isManuallyInteracting.current = false;
      carouselApi?.scrollNext();
    }, 10000);
  };

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
  };
  
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    
    startAutoplay();
 
    carouselApi.on("select", () => {
      // Only sync the active domain if it was a manual interaction
      if (isManuallyInteracting.current) {
        const newActiveDomain = carouselApi.selectedScrollSnap() === 0 ? 'supply-chain' : 'technology';
        setActiveDomain(newActiveDomain);
      }
    });

    carouselApi.on('pointerDown', () => {
        isManuallyInteracting.current = true;
        stopAutoplay();
    });
    carouselApi.on('settle', () => {
        // Reset manual interaction flag after settling and restart autoplay
        isManuallyInteracting.current = false;
        startAutoplay();
    });
    
    return () => {
      stopAutoplay();
      carouselApi.off('select');
      carouselApi.off('pointerDown');
      carouselApi.off('settle');
    };
  }, [carouselApi]);

  const handleToggle = (checked: boolean) => {
    isManuallyInteracting.current = true;
    const newDomain = checked ? 'technology' : 'supply-chain';
    setActiveDomain(newDomain);
    carouselApi?.scrollTo(newDomain === 'supply-chain' ? 0 : 1);
  };
  
  const handleHeroButtonClick = (domain: 'supply-chain' | 'technology') => {
    isManuallyInteracting.current = true;
    setActiveDomain(domain);
    carouselApi?.scrollTo(domain === 'supply-chain' ? 0 : 1);
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <StickyNav isVisible={showStickyNav} />
      <div className="relative h-screen">
        <div className="absolute top-0 left-0 right-0 z-20 container mx-auto px-4 md:px-6 py-4">
          <Header />
        </div>
        <Carousel setApi={setCarouselApi} className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-screen w-full">
                {supplyChainImage && (
                  <Image
                    src={supplyChainImage.imageUrl}
                    alt={supplyChainImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={supplyChainImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <main className="relative flex flex-col items-center justify-center h-full z-10">
                  <section className="container mx-auto flex flex-col items-center justify-center px-4 md:px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-white">
                      Smart Technology for Resilient Supply Chain & Finance Operations
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8">
                      Driving global transformation through innovation, automation, and data intelligence.
                    </p>
                    <Button size="lg" onClick={() => handleHeroButtonClick('supply-chain')}>Discover Our Services</Button>
                  </section>
                </main>
              </div>
            </CarouselItem>
            <CarouselItem>
            <div className="relative h-screen w-full">
                {technologyImage && (
                  <Image
                    src={technologyImage.imageUrl}
                    alt={technologyImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={technologyImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-black/60" />
                <main className="relative flex flex-col items-center justify-center h-full z-10">
                  <section className="container mx-auto flex flex-col items-center justify-center px-4 md:px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-white">
                      Transforming Data Into Smarter Decisions
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8">
                      We build enterprise-grade solutions in Supply Chain and CRM, powered by AI, data engineering, and cloud innovation.
                    </p>
                    <Button size="lg" onClick={() => handleHeroButtonClick('technology')}>Explore Technology</Button>
                  </section>
                </main>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      
      <section ref={contentRef} className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center mb-12">
            <div className="flex items-center space-x-3">
              <Label htmlFor="domain-toggle" className={`text-lg font-medium transition-colors ${activeDomain === 'supply-chain' ? 'text-primary' : 'text-muted-foreground'}`}>
                Supply Chain
              </Label>
              <Switch 
                id="domain-toggle" 
                checked={activeDomain === 'technology'}
                onCheckedChange={handleToggle}
              />
              <Label htmlFor="domain-toggle" className={`text-lg font-medium transition-colors ${activeDomain === 'technology' ? 'text-primary' : 'text-muted-foreground'}`}>
                Technology
              </Label>
            </div>
          </div>
          <div>
            {activeDomain === 'supply-chain' && (
              <SupplyChainContent />
            )}
            {activeDomain === 'technology' && (
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Technology Content</h2>
                <p className="text-muted-foreground">Content for Technology will go here.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

    