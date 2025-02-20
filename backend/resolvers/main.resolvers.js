import { mergeResolvers } from "@graphql-tools/merge"
import foodResolvers from './food.resolvers.js'

const mergedResolvers = mergeResolvers([foodResolvers])

export default  mergedResolvers;