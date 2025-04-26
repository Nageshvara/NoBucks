
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { Button } from '../components/ui/button';
import { Check, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { currentOrder } = useAppSelector(state => state.orders);

  useEffect(() => {
    if (!currentOrder) {
      navigate('/');
    }
  }, [currentOrder, navigate]);

  if (!currentOrder) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-medium mb-2">Order Successfully Placed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Order Summary</h2>
          <div className="space-y-4">
            {currentOrder.items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                  <p className="text-sm font-medium">${(product.price * quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Shipping Details</h2>
          <div className="space-y-2 text-sm">
            <p>Email: {currentOrder.userDetails.email}</p>
            <p>Phone: {currentOrder.userDetails.phone}</p>
            <p>Address: {currentOrder.userDetails.address}</p>
            <p>Pincode: {currentOrder.userDetails.pincode}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span>${currentOrder.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Shipping:</span>
            <span>{currentOrder.totalAmount > 100 ? 'Free' : '$10.00'}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Tax (5%):</span>
            <span>${(currentOrder.totalAmount * 0.05).toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between items-center font-medium">
              <span>Total:</span>
              <span>${(
                currentOrder.totalAmount + 
                (currentOrder.totalAmount > 100 ? 0 : 10) + 
                (currentOrder.totalAmount * 0.05)
              ).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={() => navigate('/')} className="min-w-[200px]">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;