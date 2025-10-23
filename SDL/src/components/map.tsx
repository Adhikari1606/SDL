import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Map({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label="Smart DL Home">
      <Image
        src="/map.png"
        alt="Map"
        width={1600}
        height={1600}
        className="w-auto mx-auto justify-center"
      />
    </Link>
  );
}