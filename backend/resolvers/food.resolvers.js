import Food from '../models/food.model.js'

const foodResolver = {
    Query : {
        getFood : async (_,{input}) => {
            try {
                const food = await Food.findById(input);
                if(!food){
                    throw new Error('Food not found')
                }
                return food;
            } catch (error) {
                // console.log('error in food-resolver-foods : ', error);
                throw new Error('Internal server Error')
            }
        },
        getAllFood : async () => {
            try {
                // console.log('food')
                const foods = await Food.find();
                if(!foods.length){
                    throw new Error('No food in the menu')
                }
                return foods;
            } catch (error) {
                // console.log('error in food-resolver-allfoods : ', error);
                throw new Error('Internal server Error')

            }
        },
        // getfilter : async (_,{input}) => {
        //     try {
        //         const giveBack = await Food.find({input}).distinct();
        //     } catch (error) {
        //         console.log('error in food-resolver-getback : ', error);
        //     }
        // },
    },
    Mutation : {
        createFood: async (_, { input }) => {
            // console.log("✅ createFood resolver called!"); // Check if resolver runs
            // console.log("Received input:", input); // Log input object
    
            try {
                if(await Food.findOne({ name: input.name })){return new Error('Food Name not Available')}
                const newFood = new Food(input);

                // console.log("✅ Food successfully saved:", newFood);
                await newFood.save();
                return newFood;
            } catch (error) {
                // console.error("❌ Error in createFood resolver:", error);
                throw new Error("Failed to create food item");
            }
        },
        updateFood : async(_,{input}) => {
            try {
                const food = await Food.findByIdAndUpdate(input._id, input, {new : true});
                // console.log(input)

                return food
            } catch (error) {
                // console.log('error in food-resolver-mutation-updatefood : ',error)
                return new Error("Failed to update Food Item")
            }
        },
        deleteFood: async (_, { input }) => {
            try {
              const food = await Food.findByIdAndDelete(input);
          
              if (!food) {
                throw new Error("Food item not found");
              }
          
              
              return food;
            } catch (error) {
            //   console.error("Error in deleteFood resolver:", error);
              throw new Error("Failed to delete food");
            }
          }
          
    },

}

export default foodResolver;