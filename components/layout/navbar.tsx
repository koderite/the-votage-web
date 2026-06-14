"use client"
import { Logo } from '../ui/logo';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', hasDropdown: false },
  { name: 'About', hasDropdown: true },
  { name: 'Connect', hasDropdown: true },
  { name: 'Sermons', hasDropdown: false },
  { name: 'Give', hasDropdown: false },
  { name: 'Contact', hasDropdown: true },
  { name: 'Growth Track', href: '/growth-track', hasDropdown: false },
];

interface NavbarProps {
  darkText?: boolean;
}

export const Navbar = ({ darkText = false }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [hasAnimated, setHasAnimated] = useState(true);

  // Only run animation on initial browser load, not on client-side navigation
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('navbarAnimated');
    if (!hasVisited) {
      // First visit - allow animation by setting hasAnimated to false
      setHasAnimated(false);
      sessionStorage.setItem('navbarAnimated', 'true');
    }
    // If hasVisited exists, keep hasAnimated as true (no animation on subsequent visits)
  }, []);

  const handlePlanYourVisitClick = () => {
    if (pathname === '/plan-your-visit') {
      // Already on the page, scroll to form
      const contactForm = document.querySelector('#contact-form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to the page
      router.push('/plan-your-visit');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine text color based on darkText prop and scroll state
  const getTextColor = () => {
    if (darkText && !isScrolled) return 'text-black/90 hover:text-black';
    return 'text-white/90 hover:text-white';
  };

  return (
    <motion.nav
      initial={hasAnimated ? false : { y: -100 }}
      animate={hasAnimated ? false : { y: 0 }}
      transition={hasAnimated ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
      className={`
        fixed top-0 left-0 right-0 z-50 w-full
        transition-all duration-300 ease-in-out max-h-20
        ${isScrolled 
          ? 'bg-black/70 backdrop-blur-lg shadow-lg border-b border-white/10' 
          : darkText 
            ? 'bg-transparent backdrop-blur-[2px] border-b border-black/5'
            : 'bg-nav-bg/5 backdrop-blur-[2px] border-b border-white/5'
        }
      `}
    >
      <div className={`
        max-w-360 mx-auto px-6 lg:px-20 flex items-center justify-between
        transition-all duration-300 ease-in-out
        ${isScrolled ? 'h-16' : 'h-20'}
      `}>
        {/* Logo */}
        <div
          className="shrink-0 rounded-full overflow-hidden bg-white/10 cursor-pointer h-[3.75rem] w-[3.75rem]"
        >
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <div
              key={link.name}
              className={`group flex items-center gap-1.5 ${getTextColor()} font-sans text-base transition-colors`}
            >
              <Link
                href={link.href || `/${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-1.5"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div
          className="hidden lg:block"
        >
          <Button 
            variant="nav-cta" 
            className={`font-body text-lg px-8 py-3 rounded-full border-opacity-60 transition-all duration-300 ${
              darkText && !isScrolled 
                ? 'text-black border-black hover:bg-black hover:text-white' 
                : 'text-white border-white hover:bg-white hover:text-black'
            }`}
            onClick={handlePlanYourVisitClick}
          >
            Plan Your Visit
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden p-2 ${darkText && !isScrolled ? 'text-black' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6 items-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  className="text-white text-xl font-medium flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={link.href || `/${link.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-2">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Button 
                  variant="nav-cta" 
                  className="w-full max-w-xs mt-4"
                  onClick={() => {
                    handlePlanYourVisitClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Plan Your Visit
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
