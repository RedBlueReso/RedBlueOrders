import React from 'react'

import Food from './Food'

const Foods = ({foods ,userAdmin,searchItem,searchCategory,isVeg}) => {
    const filteredFood = foods?.filter((food)=>{
      return food.name.toLowerCase().includes(searchItem.toLowerCase() ||'') &&
      food.type.some((t)=>t.toLowerCase().includes(searchCategory.toLowerCase() || '')) &&
      food.category === isVeg
      
    })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFood?.map((food) => (
          <Food food={food} key={food._id} userAdmin={userAdmin} />
        ))}
      </div>
  )
}

export default Foods
