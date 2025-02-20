import mongoose, { mongo } from "mongoose";

const OrderSchema = mongoose.Schema({
    food : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'food',
        requried : true
    },
    addons : [{
        type : String,
        default : ''
    }],
    tableNumber : {
        type : Number,
        requried : true,
        
    }
},{timestamps : true});

const Order = mongoose.model('orders' , OrderSchema);
export default Order