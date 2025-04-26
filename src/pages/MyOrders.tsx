
import { useAppSelector } from '../redux/hooks';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';

const MyOrders = () => {
  const { orders } = useAppSelector(state => state.orders);
  const { isLoggedIn } = useAppSelector(state => state.auth);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 md:px-6">
        <div className="text-center max-w-md">
          <PackageOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-medium mb-3">Please Login</h1>
          <p className="text-gray-600">You need to be logged in to view your orders.</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 md:px-6">
        <div className="text-center max-w-md">
          <PackageOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-medium mb-3">No Orders Yet</h1>
          <p className="text-gray-600">You haven't placed any orders yet.</p>
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
        <h1 className="text-2xl md:text-3xl font-medium mb-6">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 px-6 py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ORDER PLACED</p>
                    <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">TOTAL</p>
                    <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ORDER ID</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-6">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium mb-2">{item.product.name}</h3>
                        <p className="text-gray-600 mb-2">{item.product.description}</p>
                        <div className="flex items-center gap-4">
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          <p className="font-medium">Rs.{(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MyOrders;
