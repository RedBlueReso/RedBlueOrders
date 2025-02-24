import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx';

const Food = ({food , userAdmin}) => {
  const { dispatch } = useCart();
    const status = 'loading...'
    const navigate = useNavigate()
    const handleUpdate = (food)=>{
        navigate(`/update/${food?._id}`)
      }
  return (
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
  )
}

export default Food
