import React , {useEffect, useState} from 'react';
import { useCart } from '../context/CartContext';
import { useQuery } from '@apollo/client';
import {GET_ALL_FOOD} from '../graphql/query/food.query.js'
import { useNavigate } from 'react-router-dom';

const Home = ({userAdmin = false}) => {
  const { dispatch } = useCart();
  const [foods  , setFoods ] = useState([]);
console.log(userAdmin)
  const { data : food , loading} = useQuery(GET_ALL_FOOD)

  const status = '';
  const navigate = useNavigate()
  const handleUpdate = (food)=>{
    navigate(`/update/${food?._id}`)
  }

  
  useEffect(() => {setFoods(food?.getAllFood)},[foods , loading])
    return ( loading ? <div>Loading...</div> :
  
  
    

  
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Menu</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods?.map((food) => (
          <div key={food?._id || ''} className="bg-white rounded-lg shadow-md overflow-hidden" onClick={ () =>userAdmin && handleUpdate(food)}>
            <img
              src={food?.image}
              alt={food?.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">{food?.name || status}</h3>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                ₹{food?.price.toFixed(2) || status}
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
}
export default Home;