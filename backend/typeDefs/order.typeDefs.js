const orderTypeDefs = `#graphql
    # Define AddOns as an output type
    type AddOns {
        ingredient: String!
        quantity: Int!
    }
    type Order {
        food: Food!
        addOns: [AddOns!]
        orderedBy: ID!
    }

    # Define AddOnsInput as an input type (for mutations)
    input AddOnsInput {
        ingredient: String!
        quantity: Int!
    }

    type Query {
        allOrders: [Order]
        theirOrders: [Order]
    }

    type Mutation {
        addOrder(input: AddOrderInput!): Order
    }

    input AddOrderInput {
        food: ID!
        size: String
        addons: [AddOnsInput!]
    }
`

export default orderTypeDefs;