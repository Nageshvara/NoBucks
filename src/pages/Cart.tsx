import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { updateQuantity, removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/seperator';

const Cart = () => {
  const { items, totalItems, totalPrice } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  
  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };
  
  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 md:px-6">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gray-100 rounded-full">
            <ShoppingCart className="h-8 w-8 text-gray-500" />
          </div>
          <h1 className="text-2xl font-medium mb-3">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild>
            <Link to="/">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-medium">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {items.map(({ product, quantity }) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start border rounded-lg p-4 bg-white"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <Link to={`/product/${product.id}`} className="font-medium hover:underline">
                        {product.name}
                      </Link>
                      <p className="font-medium">${(product.price * quantity).toFixed(2)}</p>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1">
                      ${product.price.toFixed(2)} each
                    </p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => handleUpdateQuantity(product._id, quantity - 1)}
                          className="p-2"
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(product._id, quantity + 1)}
                          className="p-2"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(product._id)}
                        className="text-red-500 flex items-center text-sm"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{totalPrice > 100 ? 'Free' : '$10.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>${(totalPrice * 0.05).toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>
                  ${(
                    totalPrice + 
                    (totalPrice > 100 ? 0 : 10) + 
                    (totalPrice * 0.05)
                  ).toFixed(2)}
                </span>
              </div>
              
              <Button className="w-full mt-6" asChild>
                <Link to="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                Taxes and shipping calculated at checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
