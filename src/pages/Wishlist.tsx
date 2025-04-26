
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Button } from '../components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { wishlist } = useAppSelector(state => state.wishlist);
  const dispatch = useAppDispatch();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 md:px-6">
        <div className="text-center max-w-md">
          <Heart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-medium mb-3">Your Wishlist is Empty</h1>
          <p className="text-gray-600">Save items you like to your wishlist!</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-medium mb-6">My Wishlist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 relative group">
              <button 
                onClick={() => dispatch(removeFromWishlist(product._id))}
                className="absolute right-2 z-100 top-2 p-2 rounded-full bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className="h-4 w-4 fill-current" />
              </button>
              
              <div className="aspect-square rounded-md overflow-hidden mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              
              <h3 className="font-medium mb-2">{product.name}</h3>
              <p className="text-lg font-medium text-green-600 mb-4">
                Rs.{product.price}
              </p>
              
              <Button 
                onClick={() => {
                  dispatch(addToCart({ product, quantity: 1 }));
                  dispatch(removeFromWishlist(product._id));
                }}
                className="w-full"
                variant="outline"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Move to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Wishlist;