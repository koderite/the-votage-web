"use client"
import { Logo } from '../ui/logo';
import { ChevronDown, Menu, X } from 'lucide-react';
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

  const getDropdownIconColor = () => {
    if (darkText && !isScrolled) return 'text-black/80 group-hover:text-black';
    return 'text-white/80 group-hover:text-white';
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
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
        <motion.div
          className="shrink-0 rounded-full overflow-hidden bg-white/10 cursor-pointer"
          animate={{
            width: isScrolled ? '3.5rem' : '3.75rem',
            height: isScrolled ? '3.5rem' : '3.75rem',
            scale: [1, 1.05, 1, 1, 1.05, 1],
            rotate: [0, 0, 0, 360, 360, 360],
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
            scale: {
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            },
            rotate: {
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            },
          }}
        >
          <Logo />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              className={`group flex items-center gap-1.5 ${getTextColor()} font-sans text-base transition-colors`}
              animate={{
                fontSize: isScrolled ? '0.875rem' : '1rem',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Link
                href={link.href || `/${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-1.5"
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown className={`w-4 h-4 ${getDropdownIconColor()} transition-transform group-hover:rotate-180`} />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="hidden lg:block"
          animate={{
            scale: isScrolled ? 0.9 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
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
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className={`lg:hidden p-2 ${darkText && !isScrolled ? 'text-black' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          animate={{
            scale: isScrolled ? 0.9 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </motion.button>
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
                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
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
