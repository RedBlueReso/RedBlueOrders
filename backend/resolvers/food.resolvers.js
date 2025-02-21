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
                console.log('error in food-resolver-foods : ', error);
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
                console.log('error in food-resolver-allfoods : ', error);
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
            console.log("✅ createFood resolver called!"); // Check if resolver runs
            console.log("Received input:", input); // Log input object
    
            try {
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
                
            } catch (error) {
                console.log('error in food-resolver-mutation-updatefood : ',error)

            }
        },
        deleteFood : async(_,{input}) => {
            try {
                
            } catch (error) {
                console.log('error in food-resolver-mutation-deletefood : ',error)
            }
        },
    },

}

export default foodResolver;