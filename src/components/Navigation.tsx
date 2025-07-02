'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { User } from '@/types';

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const { user, isAuthenticated, logout } = useAuth();
  
  const isAdminUser = (user: User | null) => {
    return user?.role === 'admin' && user?.email === 'isha.bahati@hotmail.com';
  };
  
  const baseAuthenticatedNavItems = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/chat", label: "AI Chat" },
    { href: "/profile", label: "Profile" },
  ];

  const authenticatedNavItems = isAdminUser(user) 
    ? [...baseAuthenticatedNavItems, { href: "/admin", label: "Admin" }]
    : baseAuthenticatedNavItems;

  const unauthenticatedNavItems = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/auth", label: "Login" },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : unauthenticatedNavItems;

  return (
    <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">AITechJ</h1>
            <span className="ml-2 text-sm text-blue-400">
              {currentPage === "admin" ? "Admin Portal" : "Learning Platform"}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  currentPage === item.label.toLowerCase() ||
                  (currentPage === "home" && item.href === "/")
                    ? "text-white font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
            {isAuthenticated && (
              <button
                onClick={logout}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
