import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema({
    username :{
        type:String,
        required:true
    } ,
    phoneNumber :{
        type:String,
        required:true
    },
    orders : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'order',
        default : []
    }],
    tableNumber : {
        type : String,
        default : '0'
    }
});

const Customer = mongoose.model('customer',CustomerSchema);
export default Customer;
