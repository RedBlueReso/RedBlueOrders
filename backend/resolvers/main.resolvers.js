import { mergeResolvers } from "@graphql-tools/merge"
import foodResolvers from './food.resolvers.js'
import customerResolver from "./customer.resolvers.js";
import orderResolvers from "./order.resolvers.js";

const mergedResolvers = mergeResolvers([foodResolvers,customerResolver,orderResolvers])

export default  mergedResolvers;