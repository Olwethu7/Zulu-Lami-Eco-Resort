import { Facebook, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
              <Button size="icon" variant="ghost" className="hover:bg-background/20" asChild>
                <a href="https://www.facebook.com/p/zululami-eco-resort-61566039264553/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-background/20" asChild>
                <a href="https://wa.me/27832841272" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="opacity-90 hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/sustainability" className="opacity-90 hover:opacity-100 transition-opacity">Sustainability</Link></li>
              <li><Link to="/cultural-heritage" className="opacity-90 hover:opacity-100 transition-opacity">Cultural Heritage</Link></li>
              <li><Link to="/contact" className="opacity-90 hover:opacity-100 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/search" className="opacity-90 hover:opacity-100 transition-opacity">Accommodations</Link></li>
              <li><Link to="/experiences" className="opacity-90 hover:opacity-100 transition-opacity">Cultural Experiences</Link></li>
              <li><Link to="/local-area" className="opacity-90 hover:opacity-100 transition-opacity">Local Area</Link></li>
              <li><Link to="/help" className="opacity-90 hover:opacity-100 transition-opacity">Help & FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="opacity-90">Zululami Road, Othobothini, Jozini, 3969, KwaZulu-Natal, South Africa</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+27796560543" className="opacity-90 hover:opacity-100 transition-opacity">+27 79 656 0543</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 flex-shrink-0" />
                <a href="https://wa.me/27832841272" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity">+27 83 284 1272</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:zululamiecoresort@gmail.com" className="opacity-90 hover:opacity-100 transition-opacity">zululamiecoresort@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} Zulu Lami Eco Resort. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
