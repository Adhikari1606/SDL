import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Logo1 } from './logo1';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Contact Info */}
          <div className="space-y-4">
            <Logo1 />
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Head Office</p>
              <p>A-411, ATS Bouquet, Sector 132, Noida<br />Uttar Pradesh (201301)</p>
            </div>
            <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Phone:</span> +91-9211330926</p>
                <p><span className="font-semibold">Email:</span> reachus@smartdl.com</p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Business Hours</p>
              <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
              <p>Sun: 10:00 AM - 5:00 PM</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">What we do</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Who we are</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Supply Chain Management</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Logistics & Distribution</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">AI & Data Analytics</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cloud Solutions</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">CRM Implementation</Link></li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SmartDL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
