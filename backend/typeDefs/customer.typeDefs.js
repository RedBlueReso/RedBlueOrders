const customerTypeDef = `#graphql
    type Customer {
        _id: ID!
        username: String!
        phoneNumber: String!
        order: [Order]  # Ensure Order type is defined elsewhere
        tableNumber: String!
    }

    type Query {
        authCustomer: Customer
    }

    type Mutation {
        login(input: LoginInput!): Customer
        logout: LogoutMsg  # Removed unnecessary input
    }

    input LoginInput {
        username: String!
        phoneNumber: String!
        tableNumber: String!
    }
    type LogoutMsg {
        message: String!
    }
`

export default customerTypeDef;
