import { gql } from "@apollo/client";

export const ADD_ORDER = gql`
    mutation addOrder($input: AddOrderInput!) {
        addOrder(input: $input) {
            food{
                name
                _id
            }
            
            orderedBy
        }
    }
`