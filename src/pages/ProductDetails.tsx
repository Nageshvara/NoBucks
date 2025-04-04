  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
  import QuantitySelector from "../components/QuantitySelector";
  import { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import axios from "axios";
  import { Button } from "../components/ui/button";
  import { ArrowLeft, ShoppingCart } from "lucide-react";
  import { Star, StarHalf } from "lucide-react";
  import { motion } from "framer-motion";
  import { useDispatch } from "react-redux";
  import { addToCart } from "../redux/slices/cartSlice";


  function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
      window.scrollTo(0, 0);

      const fetchProduct = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/products/${id}`);
          setProduct(res.data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProduct();
    }, [id]);

    const renderStars = (rating: number) => {
      const fullStars = Math.floor(rating);
      const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;
      const stars = [];

      for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`full-${i}`} className="text-yellow-500" />);
      }

      if (halfStar) {
        stars.push(<StarHalf key="half" className="text-yellow-500" />);
      }

      for (let i = 0; i < emptyStars; i++) {
        stars.push(<Star key={`empty-${i}`} className="text-yellow-500 opacity-30" />);
      }
      return stars;
    };

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading product details...</p>
        </div>
      );
    }

    if (!product) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
            <Button onClick={() => navigate("/")}> 
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </div>
        </div>
      );
    }

    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-28 pb-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <Button variant="ghost" className="mb-6 pl-0" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <motion.div className="relative overflow-hidden rounded-xl bg-gray-100" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <div className={`aspect-square ${!isImageLoaded ? 'animate-pulse' : ''}`}>
                  <img src={product.image} alt={product.name} className={`h-full w-full object-cover object-center transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setIsImageLoaded(true)} />
                </div>
              </motion.div>
              <motion.div className="flex flex-col" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <div>
                  <h1 className="text-2xl md:text-3xl font-medium mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex space-x-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">{product.rating?.toFixed(1)}</span>
                  </div>
                  <p className="text-2xl font-medium mb-6">Rs. {product.price?.toFixed(2)}</p>
                  <div className="prose prose-gray max-w-none mb-8">
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                </div>
                <div className="mt-auto space-y-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <QuantitySelector 
                      quantity={quantity}
                      onIncrease={() => setQuantity(prev => prev + 1)}
                      onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
                    />
                    <Button className="w-full sm:w-auto" onClick={() => dispatch(addToCart({ product }))}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                  <div className="pt-6 border-t text-sm text-gray-500 space-y-2">
                    <p>Free Shipping on orders over Rs.500</p>
                    <p>30-day easy returns.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  export default ProductDetails;
