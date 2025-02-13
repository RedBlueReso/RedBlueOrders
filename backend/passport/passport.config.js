// IMPORTING
import passport from "passport";
import {GraphQLLocalStrategy} from 'graphql-passport'

import bcrypt from 'bcryptjs'

// local import
import  User  from "../models/user.model.js";

// EXECUTION
export const configurePassport = async()=> {
    // Serilizing a user (what user data should be stored in the session when creating ) {done(error , data)}
    passport.serializeUser(async(user , done) => {
       
        try {
            done(null , user?.id);
        } catch (error) {
            console.log('Error in passport.config.js-configurePasport-serializeUser : ',error)
            done(error , null)
        }
    })

    passport.deserializeUser(async(id , done) => {
        try {
            const user = await UserActivation.findById(id)
            done(null , user)
        } catch (error) {
            console.log('Error in passport.config.js-configurePasport-deserializeUser : ',error)
            done(error , null)
        }
    })

    passport.use(
        new GraphQLLocalStrategy( async(shopName , password , done) => {
            try {
                // User validaton
                const user = await User.findOne({ shopName });
                if (!user) {
                    throw new Error('No User Found')
                }
                // Password validation
                const validPassword = bcrypt.compare(password , user?.password)
                if(!validPassword){
                    throw new Error('Invalid Password')
                }

                // valid user
                done(null , user)

            } catch (error) {
                console.log('Error in passport.config.js-configurePasport-use-graphqllocalstrategy : ',error);
                return done(error , null)
            }
        })
    )
}