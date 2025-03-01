import React from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../graphql/mutation/order.mutation.js';

const Food = ({food , userAdmin}) => {
    const [addOrder , {loading : addFoodLoading}]=useMutation(ADD_ORDER)
    const status = 'loading...'
    const navigate = useNavigate()
    const handleUpdate = (food)=>{
      navigate(`/update/${food?._id}`)
    }

    const handleOrder = () => {
      
      addOrder({
        variables : {
          input : {
            food: food._id,
            // size: "Large", // Example size, you can change it as needed
            // addons: [
            //   { ingredient: "Cheese", quantity: 2 },
            //   { ingredient: "Bacon", quantity: 1 }
            // ]
          }
        }
      }).then(response => {
        console.log('Order added:', response.data.addOrder);
      }).catch(error => {
        console.error("Error adding order:", error.message);
      });
      console.log('ID:',food._id)
    }
    
    const ConfirmOrderToast = ({ t, food }) => (
      <div className="p-4 bg-white shadow-md rounded-lg  items-start w-96">
        <div>
          <p className="text-sm text-gray-800  text-center font-bold">Order Item</p>
          <p className="text-sm text-gray-800 text-justify">Food : <span className="font-bold">{food.name}</span></p>
          <p className="text-sm text-gray-800 text-justify">Price: <span className="font-bold">{food.price.toFixed(2)}</span></p>
        </div>
        <br/>
        <div className='flex justify-start'>
          <button
            className=" text-gray-500 w-full hover:text-gray-700 "
            onClick={() => {
              handleOrder(food)
              toast.dismiss(t.id)}
            }
          >
            <p size={18} className=' bg-green-600 text-white px-3 rounded-sm min-h-7 mr-5' >Order</p>
          </button>
          <button
            className="ml-4 text-gray-500 w-full hover:text-gray-700 "
            onClick={() => toast.dismiss(t.id)}
          >
            <p size={18} className=' bg-red-600 text-white px-3 rounded-sm min-h-7 mr-5' >cancel</p>
          </button>
        </div>

      </div>
    );
    
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
          onClick={() => 
            toast.custom((t) => <ConfirmOrderToast t={t} food={food}/> /* , { duration: Infinity } */)
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Place Order
        </button>
      </div>
    </div>

  </div>
  )
}

export default Food