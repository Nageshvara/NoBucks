import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAppDispatch } from '../redux/hooks';
import { addToCart,Product } from '../redux/slices/cartSlice';
import { addToWishlist } from '../redux/slices/wishlistSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product }));
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link
      to={`/product/${product._id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover object-center transition-all duration-500 ${imageLoaded ? 'loaded' : 'loading'} ${isHovered ? 'scale-105' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
        />
        </Link>
        <Button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          size="sm"
          variant="secondary"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
        
        <h3 className="mb-1 text-sm font-medium">{product.name}</h3>
        
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-medium">${product.price.toFixed(2)}</span>
          <div>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={()=>dispatch(addToWishlist(product))}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
      </div>
  );
};

export default ProductCard;