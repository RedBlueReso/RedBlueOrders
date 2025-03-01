import React , {useEffect, useState} from 'react';

import { useQuery } from '@apollo/client';
import {GET_ALL_FOOD} from '../graphql/query/food.query.js'
import { useNavigate } from 'react-router-dom';
import Foods from '../components/Foods.jsx';
import ToggleSwitch from '../components/ToggleVeg.jsx';

const typeOptions = ["Rice","Milkshake","Chinese","Fresh Juice","Fast Food","Ice-cream","Combos","Fries","Gravy","Mojitos","tiffen"];

const Home = ({userAdmin = false}) => {
  
  const [foods  , setFoods ] = useState([]);
  const { data : food , loading , refetch : refetchAllFood} = useQuery(GET_ALL_FOOD)
  const [searchItem, setSearchItem] = useState('')
  const [searchCategory , setSearchCategory] = useState('')
  const [isVeg , setVeg] = useState('veg')
  const navigate = useNavigate()
  
  const handleCreate = () => {
    navigate('/create')
  }

  
  useEffect(() => {setFoods(food?.getAllFood)},[foods , loading])
  useEffect(() => {refetchAllFood()},[])
  return ( loading ? <div>Loading...</div> :
  
  
    

  
    <div className="max-w-7xl mx-auto px-4 py-4 relative">
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 bg-white shadow-md z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 whitespace-nowrap">Our Menu</h1>

          {/* Veg - Non-Veg Toggle */}
          <div className="flex items-center px-4 py-2">
            <ToggleSwitch setVeg={setVeg} />
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for products..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="border-2 rounded-md px-4 py-2 w-60 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Category Dropdown */}
          <select
            className="border-2 rounded-md px-4 py-2 w-60 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="">Category</option>
            {typeOptions.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Food Button (for Admins) */}
      {userAdmin && (
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors mt-4 mb-5"
        >
          Add Food
        </button>
      )}

      {/* Food Items */}
      <Foods
        foods={foods}
        isVeg={isVeg}
        searchItem={searchItem}
        searchCategory={searchCategory}
        userAdmin={userAdmin}
      />
    </div>
  );
}
export default Home;