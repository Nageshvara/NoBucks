import { useEffect, useState } from "react"
import axios from "axios"
import {motion} from 'framer-motion'
import ProductCard from "../components/ProductCard"

interface Product {
  _id: string;
  id:number;
  name: string;
  image: string;
  category: string;
  price: number;
}


function MainPage() {

  const [products,setProducts] = useState<Product[]>([])
  const[isLoading,SetIsLoading] = useState(true)

  useEffect(()=>{
    const fetchProducts = async ()=> {
    try {
      const res = await axios.get("https://nobucks.onrender.com/api/products");
      setProducts(res.data)
    } catch (error) {
      console.error(error)
    }
    finally{
      SetIsLoading(false)
    }
  };

  fetchProducts(); },[])

  const container = {
    hidden:{opacity:0},
    show:{
      opacity:1,
      transition:{
        staggerChildern:0.1
      }
    }
  };

  const item = {
    hidden:{opacity:0,y:20},
    show:{opacity:1,y:0,transition:{type:'tween',ease:'easeOut'}}
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 text-center">
          <motion.h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}>
            Discover our Premium Products
          </motion.h1>
          <motion.p className="text-lg text-gray-600 max-w-3xl mx-auto" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4,duration:0.6}}>
            Elegant Designs for Modern Living. Crafted with love and care.
          </motion.p>
        </div>
        {
          isLoading?(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_,i)=>(
                <div key={i} className="rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ):(
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={container} initial="hidden" animate="show">
              {
                products.map((product)=>(
                  <motion.div key={product._id} variants={item}>
                    <ProductCard product={product}/>
                  </motion.div>
                ))
              }
            </motion.div>
          )
        }
      </div>
    </div>
  )
}

export default MainPage
