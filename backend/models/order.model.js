import mongoose, { mongo } from "mongoose";

const OrderSchema = mongoose.Schema({   
    food : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'food',
        default : [],
        
    },
    size : String,
    status : {
        type : String,
        enum : ['inQueue','started','served'],
        default : 'inQueue'
    },
    addons : [{
            ingredient : String,
            quantity : Number,
            default : []
    }],
    orderedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customer',
        required : true
    }
},{timestamps : true});

const Order = mongoose.model('order' , OrderSchema);
export default Order