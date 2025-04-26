import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Heart, PackageOpen, LogIn, LogOut } from 'lucide-react';
import { Badge } from "../components/ui/badge";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import { clearCart } from '../redux/slices/cartSlice';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../components/ui/alert-dialog";

const Navbar = () => {
  const { totalItems } = useAppSelector(state => state.cart);
  const { isLoggedIn,username } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  
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

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

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
          NOBucks
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {username?<h3 className='font-medium'>
            Welcome {username}!
          </h3>:''}
          <Link 
            to="/" 
            className={`transition-all hover:text-black/70 ${
              location.pathname === '/' ? 'font-medium' : 'text-gray-600'
            }`}
          >
            Products
          </Link>
          <Link 
            to="/wishlist" 
            className="relative transition-all hover:text-black/70"
          >
            <Heart className="h-5 w-5" />
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
          <Link 
              to="/myorders" 
              className="transition-all hover:text-black/70"
            >
              <PackageOpen className="h-5 w-5" />
            </Link>
          {isLoggedIn ? (
            <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                  <LogOut className='h-5 w-5'/>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will log you out and clear your cart.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No, Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Yes, Logout</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              </>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center transition-all hover:text-black/70"
            >
              <LogIn className="h-5 w-5" />
            </Link>
          )}
        </nav>
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
              to="/wishlist" 
              className="py-2 flex items-center justify-between transition-all"
            >
              <span>Wishlist</span>
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
            {isLoggedIn ? (
              <>
                <Link 
                  to="/my-orders" 
                  className="py-2 transition-all"
                >
                  My Orders
                </Link>
                <button 
                  onClick={handleLogout}
                  className="py-2 text-left transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="py-2 transition-all"
              >
                Account
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;