import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart,Menu, X } from 'lucide-react';
import { Badge } from "../components/ui/badge";
import { useAppSelector } from '../redux/hooks';


const Navbar = () => {
  const { totalItems } = useAppSelector(state => state.cart);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);


  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-3 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-semibold tracking-tighter transition-all hover:opacity-80"
        >
          MINIMALIST
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`transition-all hover:text-black/70 ${
              location.pathname === '/' ? 'font-medium' : 'text-gray-600'
            }`}
          >
            Products
          </Link>
          <Link 
            to="/cart" 
            className="relative transition-all hover:text-black/70"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {totalItems}
              </Badge>
            )}
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? 
            <X className="h-6 w-6" /> : 
            <Menu className="h-6 w-6" />
          }
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-b animate-slide-in">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/" 
              className={`py-2 transition-all ${
                location.pathname === '/' ? 'font-medium' : 'text-gray-600'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              className="py-2 flex items-center justify-between transition-all"
            >
              <span>Cart</span>
              {totalItems > 0 && (
                <Badge variant="secondary" className="h-5 flex items-center justify-center text-xs">
                  {totalItems} items
                </Badge>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;