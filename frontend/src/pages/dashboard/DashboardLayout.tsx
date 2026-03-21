import { Link, useLocation } from "react-router-dom";
import { 
  Home, BookOpen, Calendar, TrendingUp, CreditCard, 
  Bell, Settings, LogOut, Menu, X 
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-kanto-feo.png";

const sidebarLinks = [
  { path: "/dashboard", label: "Tableau de bord", icon: Home },
  { path: "/dashboard/courses", label: "Mes cours", icon: BookOpen },
  { path: "/dashboard/calendar", label: "Calendrier", icon: Calendar },
  { path: "/dashboard/progress", label: "Progression", icon: TrendingUp },
  { path: "/dashboard/payments", label: "Paiements", icon: CreditCard },
  { path: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { path: "/dashboard/settings", label: "Paramètres", icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Kanto-Feo" className="h-10" />
        </Link>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200
          lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="hidden lg:flex items-center px-6 py-6 border-b border-border">
              <Link to="/">
                <img src={logo} alt="Kanto-Feo Academy" className="h-12" />
              </Link>
            </div>

            {/* User Info */}
            <div className="px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  RA
                </div>
                <div>
                  <p className="font-semibold text-sm">Ravo Andrianarisoa</p>
                  <p className="text-xs text-muted-foreground">Guitare - Intermédiaire</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <div className="px-4 py-4 border-t border-border">
              <Link 
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Déconnexion
              </Link>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen lg:min-h-[calc(100vh)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
