import { mergeTypeDefs } from '@graphql-tools/merge'

import foodTypeDef from './food.typeDefs.js'
import customerTypeDef from './customer.typeDefs.js'
import orderTypeDefs from './order.typeDefs.js';

const mergedTypeDefs = mergeTypeDefs([foodTypeDef , customerTypeDef , orderTypeDefs]);

export default  mergedTypeDefs