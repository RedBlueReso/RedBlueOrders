import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    shopName : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    shopEdible : {
        type : String,
        required : true,
        enum : ['veg','nonveg','both']
    },
    shopImage : {
        type : String

    },
    shopDescription : {
        type : String
    },
});

const User = mongoose.model('shop' , UserSchema );
export default User;

