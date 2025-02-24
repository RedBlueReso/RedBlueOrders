import React from 'react'

import Food from './Food'

const Foods = ({foods ,userAdmin}) => {
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods?.map((food) => (
          <Food food={food} key={food._id} userAdmin={userAdmin} />
        ))}
      </div>
  )
}

export default Foods
