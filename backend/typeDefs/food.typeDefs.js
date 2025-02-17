const foodTypeDef = `#graphql
    type Food {
        _id : ID!
        name : String!
        price : Float!
        ingredients : [String!]
        size : Boolean
        type : String
        category : String
        image : String
        mealTime : String
    }
    type Query {
        getFood(id: ID!): Food
    }
    type Mutation {
        createFood(input : createFoodInput) : Food
        updateFood(input : updateFoodInput) : Food
        deleteFood(input : ID!) : Food
    }
    input createFoodInput {
        name : String!
        price : Float!
        ingredients : [String!]!
        size : String
        type : String
        category : String
        image : String
        mealTime : String
    }
    input updateFoodInput {
        name : String
        price : Float
        ingredients : [String!]
        size : String
        type : String
        category : String
        image : String
        mealTime : String
    }

`
export default foodTypeDef;