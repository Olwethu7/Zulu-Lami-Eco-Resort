import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-primary text-background py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-montserrat text-2xl font-bold mb-4">Zulu Lami</h3>
            <p className="text-sm opacity-90 mb-4">
              Authentic eco-tourism experiences in the heart of KwaZulu-Natal
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="hover:bg-background/20">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-background/20">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-background/20">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="opacity-90 hover:opacity-100 transition-opacity">About Us</a></li>
              <li><a href="/sustainability" className="opacity-90 hover:opacity-100 transition-opacity">Sustainability</a></li>
              <li><a href="/cultural-heritage" className="opacity-90 hover:opacity-100 transition-opacity">Cultural Heritage</a></li>
              <li><a href="/contact" className="opacity-90 hover:opacity-100 transition-opacity">Contact</a></li>
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/search" className="opacity-90 hover:opacity-100 transition-opacity">Accommodations</a></li>
              <li><a href="/experiences" className="opacity-90 hover:opacity-100 transition-opacity">Cultural Experiences</a></li>
              <li><a href="/local-area" className="opacity-90 hover:opacity-100 transition-opacity">Local Area</a></li>
              <li><a href="/help" className="opacity-90 hover:opacity-100 transition-opacity">Help & FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="opacity-90">KwaZulu-Natal, South Africa</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-90">+27 (0) 123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-90">info@zululami.co.za</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} Zulu Lami Eco-Resort. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
