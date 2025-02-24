import { useEffect, useState } from "react";
import {UPDATE_FOOD ,DELETE_FOOD} from '../graphql/mutation/food.mutation.js'
import { GET_FOOD } from "../graphql/query/food.query.js";
import { useMutation , useQuery } from '@apollo/client';
import {useNavigate , useParams} from 'react-router-dom'
import toast from "react-hot-toast";




const sizeOptions = ["small", "medium", "large", "extra large"];
const categoryOptions = ["veg", "nonveg"];
const mealTimeOptions = ["breakfast", "lunch", "snack", "dinner"];
const typeOptions = ["rice"];

export default function UpdateFoodForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {data : food , loading : getloading , refetch: refetchFood} = useQuery(GET_FOOD , {
    variables: { input: id },
    skip: !id
  });
  // UPDATE
  const [updateFood , {loading : updateLoading , error : errorUpdate}] = useMutation(UPDATE_FOOD , {
    refetchQueries : ['getFood'],
    onCompleted : () => {toast.success('Food Update Success'), navigate('/update')},
    onError : (error) => toast.error(error.message),
  });
  // DELETE
  const [deleteFood , {loading : deleteLoading , error : errorDelete}] = useMutation(DELETE_FOOD , {
    
    onCompleted : () => {toast.success('Food Delete Success'); navigate('/update')},
    onError : (error) => toast.error(error.message),
  })


  const [formData, setFormData] = useState({
    name: food?.getFood?.name || "",
    price: food?.getFood?.price ||"",
    ingredients:food?.getFood?.ingredients || [""],
    size:food?.getFood?.size || [],
    type: food?.getFood?.type ||[],
    category:food?.getFood?.category || "veg",
    image:food?.getFood?.image || "",
    mealTime:food?.getFood?.mealTime || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => {
      const updatedArray = checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value);
      return { ...prev, [name]: updatedArray };
    });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const addIngredientField = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  };

  const removeIngredientField = (index) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateFood({
      variables : {
        input : {
          ...formData,
          price : parseFloat(formData.price),
          _id : id
        }
      }
    })

    
  };

  const handleDelete = async(e)  => {
    e.preventDefault();
   
    const data = await deleteFood({
      variables : {
        input : id
      }
    })
    console.log(data)
  }

  useEffect(() => {
    if(food?.getFood){
      setFormData({
        name: food?.getFood?.name || "",
        price: food?.getFood?.price ||"",
        ingredients:food?.getFood?.ingredients || [""],
        size:food?.getFood?.size || [],
        type: food?.getFood?.type ||[],
        category:food?.getFood?.category || "veg",
        image:food?.getFood?.image || "",
        mealTime:food?.getFood?.mealTime || [],
      })
    }
  },[food])
  useEffect(() => {
    refetchFood();
  })

  return (
    <div className="w-full max-w-lg bg-white shadow-lg p-6 mx-auto rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-primary mb-4">Update Food Item</h2>
      {getloading ? <div>Loading...</div>: <div className="card-body">
        <form  className="space-y-4">
        <p className="font-semibold">Name:</p>
        <input
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <p className="font-semibold">Price:</p>
          <input
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="price"
          
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
          <div>
            <p className="font-semibold">Ingredients:</p>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingredient"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
                <button type="button" className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => removeIngredientField(index)}>X</button>
              </div>
            ))}
            <button type="button" className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md" onClick={addIngredientField}>+ Add Ingredient</button>
          </div>
          <div>
            <p className="font-semibold">Size:</p>
            {sizeOptions.map((option) => (
              <label key={option} className="block">
                <input
                  type="checkbox"
                  name="size"
                  value={option}
                  checked={formData.size.includes(option)}
                  onChange={handleCheckboxChange}
                /> {option}
              </label>
            ))}
          </div>
          <div>
            <p className="font-semibold">Type:</p>
            {typeOptions.map((option) => (
              <label key={option} className="block">
                <input
                  type="checkbox"
                  name="type"
                  value={option}
                  checked={formData.type.includes(option)}
                  onChange={handleCheckboxChange}
                /> {option}
              </label>
            ))}
          </div>
          <p className="font-semibold">Category:</p>
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <p className="font-semibold">Image:</p>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <div>
            <p className="font-semibold">Meal Time:</p>
            {mealTimeOptions.map((option) => (
              <label key={option} className="block">
                <input
                  type="checkbox"
                  name="mealTime"
                  value={option}
                  checked={formData.mealTime.includes(option)}
                  onChange={handleCheckboxChange}
                /> {option}
              </label>
            ))}
          </div>
          <button onClick = {handleSubmit}className="w-full py-3 bg-blue-500 text-white rounded-md text-lg font-semibold hover:bg-blue-600">{updateLoading ? "Updating ...":"Update Food"}</button>
          <button onClick = {handleDelete} className="w-full py-3 bg-red-500 text-white rounded-md text-lg font-semibold hover:bg-red-600">{deleteLoading ? "Deleting ...":"Delete Food"}</button>
        </form>
      </div>}
    </div>
  );
}
