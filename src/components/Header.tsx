import { useState, useEffect } from 'react';
import { Menu, X, Shield, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Link, useNavigate } from 'react-router-dom'; // Ajout de useNavigate
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate(); // Hook pour la navigation

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '#hero', isExternal: false },
    { name: 'À propos', href: '#about', isExternal: false },
    { name: 'Services', href: '#services', isExternal: false },
    { name: 'Processus', href: '#process', isExternal: false },
    { name: 'Portfolio', href: '#portfolio', isExternal: false },
    { name: 'Tarifs', href: '#tarifs', isExternal: false },
    { name: 'Témoignages', href: '#testimonials', isExternal: false },
    { name: 'Contact', href: '#contact', isExternal: false },
    { name: 'FAQ', href: '/faq', isExternal: false }, // Changé pour pointer vers la page FAQ
  ];

  const handleNavClick = (href: string, isExternal = false) => {
    if (isExternal) {
      window.open(href, '_blank');
    } else if (href.startsWith('#')) {
      // Comportement pour les ancres sur la page actuelle
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else {
      // Navigation vers une autre page
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-center">
          <div className="animate-pulse">Chargement...</div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-105">
                <img src="/images/favicon.png" alt="logo" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-4xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
                VILO ASSIST-PRO
              </h1>
              <p className="text-1xl text-gray-600 dark:text-gray-400 -mt-1">
                Assistance Virtuelle Professionnelle
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href, item.isExternal)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </button>
            ))}

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-left space-x-3">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.isExternal)}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {item.name}
                </button>
              ))}
              {isAdmin && (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex items-center px-4 py-3 text-base font-medium text-vilo-purple-600 dark:text-vilo-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <Shield className="w-5 h-5 mr-3" />
                      Dashboard Admin
                    </div>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;