import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  LayoutDashboard,
  Loader2,
  LogIn,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";
import { useUserProfile } from "../hooks/useQueries";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/instructors", label: "Instructors" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();
  const { data: profile } = useUserProfile();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isLoggedIn = !!identity;
  const principalStr = identity?.getPrincipal().toString();
  const displayName =
    profile?.name || (principalStr ? `${principalStr.slice(0, 8)}...` : "");

  const allLinks = [
    ...navLinks,
    ...(isLoggedIn ? [{ href: "/dashboard", label: "Dashboard" }] : []),
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Backdrop blur bar */}
      <div className="bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/assets/uploads/nexxtexh-1-1.jpeg"
              alt="NexXTechs"
              className="h-10 object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {allLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isInitializing ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 hover:bg-muted transition-colors"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {displayName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground max-w-[100px] truncate">
                      {displayName}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Settings className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => clear()}
                    className="text-destructive cursor-pointer flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={login}
                disabled={isLoggingIn}
                size="sm"
                className="gap-2 bg-primary text-primary-foreground hover:opacity-90"
              >
                {isLoggingIn ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {allLinks.map((link) => {
                const isActive = currentPath === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.label === "Courses" && (
                      <BookOpen className="h-4 w-4" />
                    )}
                    {link.label === "Instructors" && (
                      <Users className="h-4 w-4" />
                    )}
                    {link.label === "Dashboard" && (
                      <LayoutDashboard className="h-4 w-4" />
                    )}
                    {link.label === "Admin" && <Settings className="h-4 w-4" />}
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-border">
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={() => {
                      clear();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-muted transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                ) : (
                  <Button
                    onClick={() => {
                      login();
                      setMobileOpen(false);
                    }}
                    disabled={isLoggingIn}
                    className="w-full gap-2"
                    size="sm"
                  >
                    {isLoggingIn ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <LogIn className="h-4 w-4" />
                    )}
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
