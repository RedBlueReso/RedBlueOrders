import {gql} from '@apollo/client'

export const CREATE_FOOD = gql`
    mutation createFood($input : createFoodInput!) {
        createFood(input: $input) {
            
            name
            price
        }
    }
`
export const UPDATE_FOOD = gql`
    mutation updateFood($input : updateFoodInput!) {
        updateFood(input: $input) {
            
            name
            price
        
        }
    }
`
export const DELETE_FOOD = gql`
mutation deleteFood($input : ID!) {
    deleteFood(input: $input) {
        
        name
        price
    }
}
`