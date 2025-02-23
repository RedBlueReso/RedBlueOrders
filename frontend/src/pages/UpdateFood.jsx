import { useEffect, useState } from "react";
import {UPDATE_FOOD} from '../graphql/mutation/food.mutation.js'
import { GET_FOOD } from "../graphql/query/food.query.js";
import { useMutation , useQuery } from '@apollo/client';
import {useParams} from 'react-router-dom'



const sizeOptions = ["small", "medium", "large", "extra large"];
const categoryOptions = ["veg", "nonveg"];
const mealTimeOptions = ["breakfast", "lunch", "snack", "dinner"];
const typeOptions = ["rice"];

export default function UpdateFoodForm() {
  const {id} = useParams()
  const {data : food , loading : getloading , error} = useQuery(GET_FOOD , {
    variables: { input: id },
    skip: !id
  });
  // console.log(getloading)
  console.log(food?.getFood)
  // console.log(error)
  const [updateFood , {loading}] = useMutation(UPDATE_FOOD);
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
    const data = await updateFood({
      variables : {
        input : {
          ...formData,
          price : parseFloat(formData.price),
          _id : id
        }
      }
    })

    console.log("Data:", data );
  };

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

  return (
    <div className="card w-full max-w-lg bg-base-100 shadow-2xl p-8 mx-auto rounded-lg">
      <h2 className="text-2xl font-bold text-center text-primary mb-4">Update Food Item</h2>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input input-bordered w-full p-3 rounded-lg"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="input input-bordered w-full p-3 rounded-lg"
            name="price"
            type="number"
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
                  className="input input-bordered w-full p-3 rounded-lg"
                  placeholder="Ingredient"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
                <button type="button" className="btn btn-error" onClick={() => removeIngredientField(index)}>X</button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary mt-2" onClick={addIngredientField}>+ Add Ingredient</button>
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
          <select
            className="select select-bordered w-full p-3 rounded-lg"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <input
            className="input input-bordered w-full p-3 rounded-lg"
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
          <button className="btn btn-primary w-full p-3 text-lg rounded-lg">{loading ? "Updating ...":"Update Food"}</button>
        </form>
      </div>
    </div>
  );
}
