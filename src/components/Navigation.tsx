import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  Settings,
  Home
} from "lucide-react";

const Navigation = () => {
  const navigationItems = [
    { 
      path: "/", 
      label: "POS Kasir", 
      icon: LayoutDashboard,
      description: "Sistem kasir dan pemesanan"
    },
    { 
      path: "/inventory", 
      label: "Inventori", 
      icon: Package,
      description: "Kelola stok produk"
    },
    { 
      path: "/reports", 
      label: "Laporan", 
      icon: BarChart3,
      description: "Laporan penjualan"
    }
  ];

  return (
    <nav className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-primary">Dapur Bunda Bahagia</span>
        </div>
        
        <div className="flex items-center gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
        
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Pengaturan
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;