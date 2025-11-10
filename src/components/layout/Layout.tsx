import { useState } from "react";
import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";
import { HamburgerMenu } from "./HamburgerMenu";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { ChatWidget } from "@/components/chatbot/ChatWidget";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuToggle={() => setMenuOpen(true)} />
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      
      <main className="flex-1 pb-16 md:pb-0">
        {children}
      </main>
      
      <BottomNavigation />
      <InstallPrompt />
      <ChatWidget />
    </div>
  );
};
