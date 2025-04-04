import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Plus, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

interface ProductCardProps {
  product: {
    _id: string;
    id:number;
    name: string;
    image: string;
    category: string;
    price: number;
  };
}

function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  return (
    <Link
      to={`product/${product._id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover object-center transition-transform duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "scale-105" : "scale-100"}`}
          onLoad={() => setImageLoaded(true)}
        />
        <Button
          size="sm"
          className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          variant="secondary"
          onClick={() => dispatch(addToCart({ product }))}
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
          <span className="font-medium">Rs. {product.price.toFixed(2)}</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => dispatch(addToCart({ product }))}>  
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to Cart</span>
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
