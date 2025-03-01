import Customer from '../models/customer.model.js'
import Order from "../models/order.model.js";

const orderResolver = {
    Mutation : {
        addOrder : async(_,{input},context) => {
            try {
                console.log(context.getUser())
                const order = new Order({...input, orderedBy: context.getUser()._id });
                const result = await order.save();
                const customer = await Customer.findById(context.getUser()._id);
                customer.orders.push(result.food);
                await customer.save();
                // console.log(result)
                return result.populate("food")
            } catch (error) {
                console.log('error in addOrder-resolver : ',error.message)
                return error
            }
        }
    },
    Query : {
        allOrders : async() => {
            try {
                const orders = await Order.find().populate("customer").populate("food");
                return orders;
            } catch (error) {
                console.log('error in allorders-order-resolver : ',error.message)
                return error
            }
        },
        theirOrders : async(_,__,context) => {
            try {
                const user = context.getUser();
                if (!user) {
                    throw new Error("User not authenticated");
                }
                const orders = await Order.find({ orderedBy: user._id }).populate("food");
                // console.log('orders', orders)
                // console.log(user.username)
                return orders;
            } catch (error) {
                console.log('error in theirOrders-order-resolver : ',error.message)
                return error
            }
        }
    }
}

export default orderResolver;