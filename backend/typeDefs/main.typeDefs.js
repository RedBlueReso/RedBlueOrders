import { mergeTypeDefs } from '@graphql-tools/merge'

import foodTypeDef from './food.typeDefs.js'

const mergedTypeDefs = mergeTypeDefs([foodTypeDef]);

export default  mergedTypeDefs