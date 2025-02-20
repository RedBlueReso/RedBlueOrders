import React from 'react';
import { foods } from '../data/dummyData';
import { useCart } from '../context/CartContext';

export const Home = () => {
  const { dispatch } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Menu</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">{food.name}</h3>
              <p className="text-gray-600 mt-2">{food.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ${food.price.toFixed(2)}
                </span>
                <button
                  onClick={() => dispatch({ type: 'ADD_ITEM', payload: food })}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};