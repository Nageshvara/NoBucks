import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Menu, ShoppingCart } from 'lucide-react';
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { RootState } from "../redux/store";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const location = useLocation();
  const cartItems = useSelector((state: RootState) => state.cart.items);

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-3 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to='/' className="text-xl md:text-2xl font-semibold tracking-tighter hover:opacity-80">
          NOBucks
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to='/' className={`transition-all hover:text-black/70 ${location.pathname === '/' ? 'font-medium' : 'text-gray-600'}`}>
            Products
          </Link>
          <Link to='/cart' className="relative transition-all hover:text-black/70">
            <ShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
               <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 mb-4 flex items-center justify-center p-0 text-xs">
               {cartItems.length}
             </Badge>
            )}
          </Link>
        </nav>
        <button className="md:hidden" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {
        isMobileOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-b animate-slide-in">
            <div className="flex flex-col p-4 space-y-4">
              <Link to='/' className={`py-2 transition-all ${location.pathname === '/' ? 'font-medium' : 'text-gray-600'}`}>
                Products
              </Link>
              <Link to='/cart' className="py-2 flex items-center justify-between transition-all">
                <span>Cart</span>
                {cartItems.length > 0 && (
                <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 mb-4 flex items-center justify-center p-0 text-xs">
                {cartItems.length}
                </Badge>
                )}
              </Link>
            </div>
          </div>
        )
      }
    </header>
  );
}

export default Navbar;
