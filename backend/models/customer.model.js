import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema({
    username : String,
    phoneNumber : Number,
    orders : [{
        food : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'food',
            default : [],
            
        },
        addons : [{
            type : String,
            default : []
    }]}],
    tableNumber : {
        type : Number,
        default : 0
    }
});

const Customer = mongoose.model('customer',CustomerSchema);
export default Customer;
