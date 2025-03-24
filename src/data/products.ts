export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
    category: string;
  }
  
  export const products: Product[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones with superior sound quality and up to 30 hours of battery life. The perfect companion for your music needs, featuring deep bass and crystal clear highs.',
      price: 299.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Electronics'
    },
    {
      id: '2',
      name: 'Minimalist Smart Watch',
      description: 'Elegant smartwatch with health monitoring, notifications, and a battery life that lasts for days. Track your fitness goals and stay connected with style.',
      price: 199.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Electronics'
    },
    {
      id: '3',
      name: 'Ergonomic Office Chair',
      description: 'Premium ergonomic office chair designed for maximum comfort during long work sessions. Adjustable height, lumbar support, and breathable mesh material.',
      price: 349.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Furniture'
    },
    {
      id: '4',
      name: 'Ultra-thin Laptop',
      description: 'High-performance ultra-thin laptop with a stunning display, powerful processor, and all-day battery life. Perfect for professionals on the go.',
      price: 1299.99,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Electronics'
    },
    {
      id: '5',
      name: 'Handcrafted Leather Wallet',
      description: 'Luxurious handcrafted leather wallet with multiple card slots and a sleek, minimalist design. Made from premium full-grain leather that ages beautifully.',
      price: 79.99,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Accessories'
    },
    {
      id: '6',
      name: 'Premium Coffee Maker',
      description: 'Advanced coffee maker with customizable brewing options and temperature control. Brew the perfect cup of coffee every morning with this sleek and modern machine.',
      price: 149.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Kitchen'
    },
    {
      id: '7',
      name: 'Designer Sunglasses',
      description: 'Premium designer sunglasses with UV protection and a timeless design. Made with high-quality materials and attention to detail for a comfortable fit.',
      price: 129.99,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Accessories'
    },
    {
      id: '8',
      name: 'Portable Bluetooth Speaker',
      description: 'Compact and powerful Bluetooth speaker with excellent sound quality and waterproof design. Perfect for outdoor adventures or home use.',
      price: 89.99,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Electronics'
    },
  ];
  