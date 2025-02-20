import mongoose from "mongoose";

const FoodSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    price : {
        type : Number,
        required : true,

    },
    ingredients : [{
        type : String
    }],
    size : [{
        type : String,
        default : 'medium',
        enum : ['small', 'medium', 'large','extra large']
        
    }],
    
    type : [{
        type : String,
        
        
    }],
    category : {
        type : String,
        required : true,
        default : 'veg',
        enum : ['veg','nonveg']
    },
    image : {
        type : String,
        default : 'https://www.thefuzzyduck.co.uk/wp-content/uploads/2024/05/image-coming-soon-placeholder-01-660x660.png'
    },
    mealTime : [{
        type : String,
        requried : true,
        default : 'snack',
        enum : ['breakfast','lunch','snack','dinner']
    }],

})

const Food = mongoose.model('food', FoodSchema);
export default Food;