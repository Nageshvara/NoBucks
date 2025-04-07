import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToCart } from '../redux/slices/cartSlice';
import QuantitySelector from '../components/QuantitySelector';
import { Button } from '../components/ui/button';
import { ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentProduct, loading, error } = useAppSelector(state =>state.products);
  
  const [quantity, setQuantity] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  
  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart({ product: currentProduct, quantity }));
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }
  
  if (error || !currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div 
            className="relative overflow-hidden rounded-xl bg-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`aspect-square ${!isImageLoaded ? 'animate-pulse' : ''}`}>
              <img 
                src={currentProduct.image} 
                alt={currentProduct.name} 
                className={`h-full w-full object-cover object-center transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
          </motion.div>
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-medium mb-2">{currentProduct.name}</h1>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-gray-500">
                  ({currentProduct.rating.toFixed(1)})
                </span>
              </div>
              
              <p className="text-2xl font-medium mb-6">${currentProduct.price.toFixed(2)}</p>
              
              <div className="prose prose-gray max-w-none mb-8">
                <p className="text-gray-600">{currentProduct.description}</p>
              </div>
            </div>
            
            <div className="mt-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <QuantitySelector 
                  quantity={quantity}
                  onIncrease={() => setQuantity(prev => prev + 1)}
                  onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
                />
                
                <Button 
                  className="w-full sm:w-auto"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
              
              <div className="pt-6 border-t text-sm text-gray-500 space-y-2">
                <p>Free shipping on orders over $100</p>
                <p>30-day easy returns</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;