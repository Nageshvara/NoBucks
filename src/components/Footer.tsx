import { Link } from 'react-router-dom';

const Footer = () => {
  
  return (
    <footer className="w-full border-t mt-auto pt-10 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">NOBucks</h3>
          <p className="text-sm text-gray-500">
            Elegantly designed products for modern living.
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Shop</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Featured
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>
        
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Return Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-10 pt-5 border-t">
        <p className="text-xs text-gray-500 text-center">
          © 2025 NoBucks. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;