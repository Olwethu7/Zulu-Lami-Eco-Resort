import { X, Info, Map, Leaf, Heart, Mail, Settings, HelpCircle, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
  
}

export const HamburgerMenu = ({ open, onClose }: HamburgerMenuProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Info, label: "About Us", path: "/about" },
    { icon: Map, label: "Local Area", path: "/local-area" },
    { icon: Image, label: "Gallery", path: "/gallery" },
    { icon: Leaf, label: "Sustainability", path: "/sustainability" },
    { icon: Heart, label: "Cultural Heritage", path: "/cultural-heritage" },
    { icon: Mail, label: "Contact", path: "/contact" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help & FAQ", path: "/help" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="font-montserrat text-2xl text-primary">
            Menu
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant="ghost"
                className="justify-start gap-3 h-12"
                onClick={() => handleNavigate(item.path)}
              >
                <Icon className="h-5 w-5" />
                <span className="text-base">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
