import React , {useEffect, useState} from 'react';

import { useQuery } from '@apollo/client';
import {GET_ALL_FOOD} from '../graphql/query/food.query.js'
import { useNavigate } from 'react-router-dom';
import Foods from '../components/Foods.jsx';

const Home = ({userAdmin = false}) => {
  
  const [foods  , setFoods ] = useState([]);
  const { data : food , loading , refetch : refetchAllFood} = useQuery(GET_ALL_FOOD)
  
  
  const navigate = useNavigate()
  
  const handleCreate = () => {
    navigate('/create')
  }

  
  useEffect(() => {setFoods(food?.getAllFood)},[foods , loading])
  useEffect(() => {refetchAllFood()},[])
    return ( loading ? <div>Loading...</div> :
  
  
    

  
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Menu</h1>
      {userAdmin && <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors mb-5">Add Food</button>}
      
      <Foods foods={foods} userAdmin={userAdmin}  />
    </div>
  );
}
export default Home;