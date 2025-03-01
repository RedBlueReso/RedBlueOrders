
import Customer from "../models/customer.model.js";



const customerResolver = {
    Mutation: {
        login : async(_,{input},context) => {
            try {
                const {username ,phoneNumber , tableNumber} = input;
                if(!username || !phoneNumber || !tableNumber){
                    throw new Error ("all fields required")

                }
            
            

            const newUser = new Customer({
                username, 
                phoneNumber,
                tableNumber

            })
            await newUser.save();
            await context.login(newUser)
            return (newUser)

            } catch (error) {
                console.log('error in user-resolver-signup : ',error.message) 
                throw error  
            }
        },
        logout : async(_,__,context) => {
            try {
                const cus = await Customer.findByIdAndDelete(context.req.session.passport.user)
                await context.logout()
                context.req.session.destroy((err) => {
                    if(err) throw err;
                })
                context.res.clearCookie("connect.sid");
                return {message : "logged out successful"}
            } catch (error) {
                console.log('error in user-resolver-logout : ',error.message)
                throw error  

            }
        }
    },
    Query : {
        authCustomer : async (_,__,context) => {
           try {
            const customer = context.getUser();
            console.log(customer)
            return customer;
           } catch (error) {
            console.log('error in user-resolver-authCustomer : ',error.message)
            throw error 
           }
        }
    }
}

export default customerResolver;