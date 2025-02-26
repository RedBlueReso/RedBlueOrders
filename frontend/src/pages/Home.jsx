import React , {useEffect, useState} from 'react';

import { useQuery } from '@apollo/client';
import {GET_ALL_FOOD} from '../graphql/query/food.query.js'
import { useNavigate } from 'react-router-dom';
import Foods from '../components/Foods.jsx';

const typeOptions = ["Rice","Milkshake","Chinese","Fresh Juice","Fast Food","Ice-cream","Combos","Fries","Gravy","Mojitos","tiffen"];

const Home = ({userAdmin = false}) => {
  
  const [foods  , setFoods ] = useState([]);
  const { data : food , loading , refetch : refetchAllFood} = useQuery(GET_ALL_FOOD)
  const [searchItem, setSearchItem] = useState('')
  const [searchCategory , setSearchCategory] = useState('')
  
  const navigate = useNavigate()
  
  const handleCreate = () => {
    navigate('/create')
  }

  
  useEffect(() => {setFoods(food?.getAllFood)},[foods , loading])
  useEffect(() => {refetchAllFood()},[])
    return ( loading ? <div>Loading...</div> :
  
  
    

  
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex  ">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Menu</h1>
          {/* Search */}
          <input
            type="text"
            placeholder="Search for products..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="mb-1 border-2 bg-white p-3 h-10 input input-bordered w-full max-w-xs text-black flex-grow-1 md:min-w-60"
          />
          {/* Category */}
          <select className="mb-1 border-2  bg-white px-3 h-10 select select-bordered md:min-w-60  max-w-xs flex-grow-1 text-black" onChange={(e) => {setSearchCategory(e.target.value)}}>
              <option value=''>category</option>
            {typeOptions.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          </div>
      {userAdmin && <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors mb-5">Add Food</button>}
      
      <Foods foods={foods} searchItem={searchItem} searchCategory={searchCategory} userAdmin={userAdmin}  />
    </div>
  );
}
export default Home;