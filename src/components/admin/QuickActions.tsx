import { Button } from "@/components/ui/button";
import { Calendar, Home, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface QuickActionsProps {
  pendingCount?: number;
}

export const QuickActions = ({ pendingCount }: QuickActionsProps) => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Calendar,
      label: "Manage Bookings",
      badge: pendingCount,
      path: "/admin/booking-management",
    },
    {
      icon: Home,
      label: "View Rooms",
      path: "/admin/rooms",
    },
    {
      icon: Users,
      label: "Customer List",
      path: "/admin/customers",
    },
    {
      icon: BarChart3,
      label: "View Reports",
      path: "/admin/reports",
    },
  ];

  return (
    <div className="space-y-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.path}
            variant="ghost"
            className="w-full justify-between h-12 px-4 hover:bg-muted"
            onClick={() => navigate(action.path)}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{action.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {action.badge && action.badge > 0 && (
                <Badge className="bg-primary text-primary-foreground">
                  {action.badge} pending
                </Badge>
              )}
              <span className="text-muted-foreground">→</span>
            </div>
          </Button>
        );
      })}
    </div>
  );
};
