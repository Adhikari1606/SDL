import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label="Smart DL Home">
      <Image
        src="/logo_sdl.png"
        alt="Smart DL Logo"
        width={120}
        height={40}
        className="h-10 w-auto"
      />
    </Link>
  );
}
