import { mergeTypeDefs } from '@graphql-tools/merge'

import foodTypeDef from './food.typeDefs.js'

const mergedTypeDefs = mergeTypeDefs([foodTypeDef]);
// todo => add getfileter
export default  mergedTypeDefs