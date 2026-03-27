import { ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, Calendar, 
  MessageSquare, BarChart3, Upload, Settings, LogOut, Menu, X,
  Bell, Search, Moon, Sun, ChevronDown
} from 'lucide-react';
import { getCurrentUser, getCurrentSchool, logout } from '../lib/data';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
}

export default function Layout({ children, currentPage }: LayoutProps) {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const school = getCurrentSchool();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Set dark theme by default
    document.documentElement.classList.add('dark');
  }, []);

  if (!user || !school) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    if (user.role === 'admin') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { id: 'students', label: 'Students', icon: GraduationCap, path: '/admin/students' },
        { id: 'teachers', label: 'Teachers', icon: Users, path: '/admin/teachers' },
        { id: 'classes', label: 'Classes', icon: BookOpen, path: '/admin/classes' },
        { id: 'attendance', label: 'Attendance', icon: Calendar, path: '/admin/attendance' },
        { id: 'communications', label: 'Communications', icon: MessageSquare, path: '/admin/communications' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
        { id: 'national-export', label: 'National Export', icon: Upload, path: '/admin/national-export' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
      ];
    } else if (user.role === 'teacher') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/teacher/dashboard' },
        { id: 'classes', label: 'My Classes', icon: BookOpen, path: '/teacher/classes' },
        { id: 'attendance', label: 'Attendance', icon: Calendar, path: '/teacher/attendance' },
        { id: 'communications', label: 'Messages', icon: MessageSquare, path: '/teacher/communications' },
      ];
    } else {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
        { id: 'classes', label: 'My Classes', icon: BookOpen, path: '/student/classes' },
        { id: 'attendance', label: 'Attendance', icon: Calendar, path: '/student/attendance' },
        { id: 'grades', label: 'Grades', icon: BarChart3, path: '/student/grades' },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-border">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4f6ef7] via-[#7c5cfc] to-[#22d3ee] flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(79,110,247,0.4)]">
            S
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">Sybella</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">School OS</div>
          </div>
        </div>

        {/* School selector */}
        <div className="m-3 p-3 bg-muted rounded-xl border border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22d3ee] to-[#4f6ef7] flex items-center justify-center text-xs font-bold text-white">
              {school.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold truncate">{school.name}</div>
              <div className="text-[10px] text-muted-foreground capitalize">{user.role} Workspace</div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground px-4 mb-2">
            Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${
                  isActive
                    ? 'bg-gradient-to-r from-[rgba(79,110,247,0.15)] to-[rgba(124,92,252,0.1)] text-[#4f6ef7] border border-[rgba(79,110,247,0.2)]'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User info */}
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2 p-2 rounded-xl hover:bg-muted cursor-pointer transition-colors">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4f6ef7] to-[#7c5cfc] flex items-center justify-center text-xs font-bold text-white">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold truncate">{user.name}</div>
              <div className="text-[10px] text-muted-foreground truncate">{user.email}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center gap-4 px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-foreground font-semibold capitalize">{currentPage}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-muted border border-border rounded-xl px-3 py-2 w-60">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
              />
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <button className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef4444] rounded-full border-2 border-card"></span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-[#ef4444] transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card px-6 py-3 flex items-center justify-between text-[10px] text-muted-foreground">
          <div>© 2026 Sybella Systems. All rights reserved.</div>
          <div>Powered by Sybella School OS v1.0</div>
        </footer>
      </div>
    </div>
  );
}