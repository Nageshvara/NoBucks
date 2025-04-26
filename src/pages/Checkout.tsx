import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setUserDetails } from '../redux/slices/authSlice';
import { placeOrderStart, placeOrderSuccess, placeOrderFailure } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthPrompt from '../components/AuthPrompt';

interface UserFormState {
  email: string;
  phone: string;
  address: string;
  pincode: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  address?: string;
  pincode?: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { items, totalItems, totalPrice } = useAppSelector(state => state.cart);
  const { isLoggedIn, userDetails: savedUserDetails, userId } = useAppSelector(state => state.auth);
  const { loading: orderLoading, orderPlaced } = useAppSelector(state => state.orders);
  
  const [userForm, setUserForm] = useState<UserFormState>({
    email: savedUserDetails?.email || '',
    phone: savedUserDetails?.phone || '',
    address: savedUserDetails?.address || '',
    pincode: savedUserDetails?.pincode || '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  
  useEffect(() => {
    if (savedUserDetails) {
      setUserForm({
        email: savedUserDetails.email,
        phone: savedUserDetails.phone,
        address: savedUserDetails.address,
        pincode: savedUserDetails.pincode,
      });
    }
  }, [savedUserDetails]);
  
  useEffect(() => {
    if (orderPlaced) {
      navigate('/order-success');
    }
  }, [orderPlaced, navigate]);
  
  const validateUserForm = () => {
    const newErrors: FormErrors = {};
    
    if (!userForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userForm.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!userForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!userForm.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!userForm.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUserForm()) return;
    
    try {
      dispatch(setUserDetails(userForm));
      
      dispatch(placeOrderStart());
      
      const response = {
        userId,
        items,
        totalAmount: totalPrice,
        userDetails: userForm,
      };
      
      dispatch(placeOrderSuccess(response));
      
      dispatch(clearCart());
      navigate('/order-success');
    } catch (error) {
      console.error('Order error:', error);
      dispatch(placeOrderFailure('Failed to place order'));
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 md:px-6">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gray-100 rounded-full">
            <ShoppingBag className="h-8 w-8 text-gray-500" />
          </div>
          <h1 className="text-2xl font-medium mb-3">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
          <Button onClick={() => navigate('/')}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          key="checkout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="pl-0" 
              onClick={() => navigate('/cart')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Button>
            <h1 className="text-2xl md:text-3xl font-medium mt-3">Checkout</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              {!isLoggedIn ? (
                <AuthPrompt />
              ) : (
                <div className="space-y-6">
                  <div className="border rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
                    <form onSubmit={handlePlaceOrder}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={userForm.email}
                            onChange={handleUserFormChange}
                            placeholder="your@email.com"
                            className={errors.email ? 'border-red-500' : ''}
                            disabled={orderLoading}
                            required
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={userForm.phone}
                            onChange={handleUserFormChange}
                            placeholder="Your phone number"
                            className={errors.phone ? 'border-red-500' : ''}
                            disabled={orderLoading}
                            required
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="address">Shipping Address</Label>
                          <Textarea
                            id="address"
                            name="address"
                            value={userForm.address}
                            onChange={handleUserFormChange}
                            placeholder="Enter your full address"
                            className={errors.address ? 'border-red-500' : ''}
                            disabled={orderLoading}
                            required
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input
                            id="pincode"
                            name="pincode"
                            type="text"
                            value={userForm.pincode}
                            onChange={handleUserFormChange}
                            placeholder="Enter your pincode"
                            className={errors.pincode ? 'border-red-500' : ''}
                            disabled={orderLoading}
                            required
                          />
                          {errors.pincode && (
                            <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 mt-6 bg-gray-50">
                        <h3 className="text-sm font-medium mb-2">Payment Method</h3>
                        <p className="text-sm text-gray-500">
                          For demo purposes, no payment information is required.
                        </p>
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full mt-6"
                        disabled={orderLoading}
                      >
                        {orderLoading ? 'Processing...' : 'Place Order'}
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-2">
              <div className="border rounded-lg bg-gray-50 overflow-hidden sticky top-24">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="flex gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">
                              {product.name} <span className="text-gray-500">× {quantity}</span>
                            </p>
                            <p className="text-sm font-medium">${(product.price * quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{totalPrice > 100 ? 'Free' : '$10.00'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${(totalPrice * 0.05).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      ${(
                        totalPrice + 
                        (totalPrice > 100 ? 0 : 10) + 
                        (totalPrice * 0.05)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;