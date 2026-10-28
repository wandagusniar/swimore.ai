import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSessionStore } from '@/store/session-store';

interface NavbarProps {
  onSignInClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSignInClick }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, syncSession, loginWithBackend } = useSessionStore();

  useEffect(() => {
    syncSession();
  }, [syncSession]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Models', path: '/models' },
    { label: 'Marketplace Partner', path: '/marketplace' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Docs', path: '/docs' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full pt-6 pb-2 px-4 sm:px-6 flex justify-center sticky top-0 z-50 pointer-events-none">
      <header className="relative w-[1240px] max-w-full px-5 sm:px-6 py-2.5 rounded-full border border-[#22272B] bg-[#0A0C0E]/90 backdrop-blur-md flex items-center justify-between shadow-2xl pointer-events-auto transition-all">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-5 h-5 rounded-md border border-[#333A40] flex items-center justify-center bg-[#060808] group-hover:border-[#00E599] transition-colors">
            <div className="w-2.5 h-2.5 rounded-[1px] border border-[#F5F5F2] group-hover:border-[#00E599]" />
          </div>
          <span className="font-mono text-xs tracking-widest font-semibold text-[#F5F5F2] uppercase">
            SWIMORE AI
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-normal">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 tracking-wide transition-colors ${active ? 'text-[#F5F5F2] font-medium' : 'text-[#98A0A8] hover:text-[#F5F5F2]'}`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F5F5F2]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button (Hard Right on <md) */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="md:hidden ml-auto text-xl font-bold text-[#F5F5F2] cursor-pointer px-2 py-0.5"
        >
          ☰
        </button>

        {/* Right: Auth & CTA (Hard Right on md+) */}
        <div className="hidden md:flex items-center gap-4 text-xs flex-shrink-0">
          {user ? (
            <Link
              to="/dashboard/keys"
              className="text-[#98A0A8] hover:text-[#F5F5F2] transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
              {user.name}
            </Link>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                loginWithBackend();
                onSignInClick?.();
              }}
              className="text-[#98A0A8] hover:text-[#F5F5F2] transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}
          <Link
            to="/chat"
            className="px-5 py-2 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] font-medium transition-all shadow-sm active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-[#0A0C0E] border border-[#22272B] p-4 rounded-2xl shadow-2xl z-50">
            <nav className="flex flex-col space-y-3 w-full text-xs">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-center py-2 transition-colors ${active ? 'text-[#F5F5F2] font-medium' : 'text-[#98A0A8] hover:text-[#F5F5F2]'}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {user ? (
                <Link
                  to="/dashboard/keys"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 transition-colors text-[#98A0A8] hover:text-[#F5F5F2]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
                  {user.name}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    loginWithBackend();
                    onSignInClick?.();
                  }}
                  className="flex items-center justify-center py-2 transition-colors text-[#98A0A8] hover:text-[#F5F5F2] w-full"
                >
                  Sign In
                </button>
              )}
              <Link
                to="/chat"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center px-5 py-2.5 rounded-full bg-[#F5F5F2] hover:bg-white text-[#060808] font-medium shadow-sm active:scale-95 w-full"
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};