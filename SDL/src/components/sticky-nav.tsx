"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/nav-links';

type StickyNavProps = {
  isVisible: boolean;
};

export function StickyNav({ isVisible }: StickyNavProps) {
  return (
    <div
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'
      )}
    >
      <nav className="flex items-center gap-4 bg-background/30 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/10">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-base font-medium text-foreground py-2 px-4 rounded-full transition-colors hover:bg-background/70"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
