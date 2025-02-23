import { gql } from "@apollo/client"

export const GET_ALL_FOOD = gql`
    query getAllFood {
        getAllFood{
            _id
            name
            price
            ingredients
            image
            category
        }
    }
`

export const GET_FOOD = gql`
    query GetFood ($input : ID!){
        getFood(input: $input){
            
            name
            price 
            ingredients
            size
            type 
            category
            image
            mealTime
            
        }
    }
`

export const GET_FILTER = ``

