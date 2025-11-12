import { 
  
  Calendar,
  LogOut,
  User,
  LayoutDashboard,
  Home,
  Users,
  BarChart3
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Calendar, label: "Bookings", path: "/admin/booking-management" },
    { icon: Home, label: "Rooms", path: "/admin/rooms" },
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: BarChart3, label: "Reports", path: "/admin/reports" },
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-primary">
      <div className="p-6 border-b border-primary-foreground/20">
        <div className="space-y-1">
          <h2 className="font-montserrat text-xl font-bold text-primary-foreground">
            Zulu Lami
          </h2>
          <p className="text-xs text-primary-foreground/80">
            Eco-Resort Admin
          </p>
        </div>
      </div>
      
      <div className="px-4 pt-4">
        <p className="text-xs font-semibold text-primary-foreground/60 mb-2">
          Management
        </p>
      </div>
      
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-11",
                isActive 
                  ? "bg-primary-foreground/20 text-primary-foreground font-semibold" 
                  : "text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-foreground/20 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};
