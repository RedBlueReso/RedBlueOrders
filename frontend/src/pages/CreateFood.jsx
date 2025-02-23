import { useState } from "react";
import { CREATE_FOOD } from '../graphql/mutation/food.mutation.js'
import { useMutation } from '@apollo/client';

const sizeOptions = ["small", "medium", "large", "extra large"];
const categoryOptions = ["veg", "nonveg"];
const mealTimeOptions = ["breakfast", "lunch", "snack", "dinner"];
const typeOptions = ["rice"];

export default function CreateFoodForm() {
  const [createFood, { loading }] = useMutation(CREATE_FOOD);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    ingredients: [""],
    size: [],
    type: [],
    category: "veg",
    image: "",
    mealTime: [],
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
    console.log({ ...formData, price: parseFloat(formData.price) });
    const data = await createFood({
      variables: {
        input: {
          ...formData,
          price: parseFloat(formData.price),
        },
      },
    });

    console.log("Data:", data);
  };

  return (
    <div className="w-full max-w-lg bg-white shadow-lg p-6 mx-auto rounded-xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Food Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <div>
          <p className="font-medium text-gray-700">Ingredients:</p>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <input
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <p className="font-medium text-gray-700">Size:</p>
          {sizeOptions.map((option) => (
            <label key={option} className="block mt-1">
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
        <button className="w-full py-3 bg-blue-500 text-white rounded-md text-lg font-semibold hover:bg-blue-600">Create Food</button>
      </form>
    </div>
  );
}
