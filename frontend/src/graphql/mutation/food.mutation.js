import {gql} from '@apollo/client'

export const CREATE_FOOD = gql`
    mutation createFood($input : createFoodInput!) {
        createFood(input: $input) {
            _id
            name
            price
        }
    }
`
export const UPDATE_FOOD = gql`
    mutation updateFood($input : updateFoodInput!) {
        updateFood(input: $input) {
            _id
            name
            price
        }
    }
`
export const DELETE_FOOD = gql`
mutation deleteFood($input : ID!) {
    deleteFood(input: $input) {
        _id
        name
        price
    }
}
`