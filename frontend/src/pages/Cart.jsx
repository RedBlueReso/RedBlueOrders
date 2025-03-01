import React from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation } from '@apollo/client';
import { THEIR_ORDERS } from '../graphql/query/order.query';
import { LOGOUT_CUSTOMER } from '../graphql/mutation/customer.mutation';

const Cart = () => {
  const { data, loading, error } = useQuery(THEIR_ORDERS);
  const [logout] = useMutation(LOGOUT_CUSTOMER,{
    refetchQueries: ['authCustomer'],
  });
  // console.log(error);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const orders = data?.theirOrders || [];

  // Function to merge duplicate orders and add a count
  const mergeOrders = (orders) => {
    const mergedOrders = [];
    const orderMap = new Map();

    orders.forEach((order) => {
      const key = order.food._id;
      if (orderMap.has(key)) {
        const existingOrder = orderMap.get(key);
        existingOrder.count += 1;
      } else {
        orderMap.set(key, { ...order, count: 1 });
      }
    });

    orderMap.forEach((order) => mergedOrders.push(order));
    return mergedOrders;
  };

  const mergedOrders = mergeOrders(orders);

  const handleCheckout = async () => {
    // Implement Google Pay integration here
    try {
      const { data: logoutData } = await logout();
      console.log('Logout message:', logoutData.logout.message);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      {mergedOrders.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {mergedOrders.map((order) => (
                <div key={order._id} className="p-6 flex items-center">
                  <img
                    src={order.food.image}
                    alt={order.food.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{order.food.name}</h3>
                    <p className="text-gray-900 font-medium mt-1">
                      ₹{order.food.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600 mt-1">Count: {order.count}</p>
                    <p className="text-gray-900 font-medium mt-1">
                      ₹{(order.food.price * order.count).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between text-lg font-semibold text-gray-900 mb-4">
              <span>Total:</span>
              <span>₹{mergedOrders.reduce((total, order) => total + order.food.price * order.count, 0).toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Proceed to Checkout
            </button>
    
    </div>
  );
};

export default Cart;