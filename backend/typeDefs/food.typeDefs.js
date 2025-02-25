const foodTypeDef = `#graphql
    type Food {
        _id : ID!
        name : String!
        price : Float!
        ingredients : [String!]
        size : [String]
        type : [String]
        category : String
        image : String
        mealTime : [String]
    }
    type giveFilter {
        type : [String]
        category : [String]
        mealTime : [String]
    }
    type Query {
        getFood(input: ID!): Food
        getAllFood : [Food]
        getFilter : giveFilter
        
    }
    type Mutation {
        createFood(input : createFoodInput!) : Food
        updateFood(input : updateFoodInput) : Food
        deleteFood(input : ID!) : Food
    }
    input createFoodInput {
        name : String!
        price : Float!
        ingredients : [String!]!
        size : [String]
        type : [String]
        category : String
        image : String
        mealTime : [String]
    }
    input updateFoodInput {
        _id : ID!
        name : String
        price : Float
        ingredients : [String!]
        size : [String]
        type : [String]
        category : String
        image : String
        mealTime : [String]
    }

`
export default foodTypeDef;