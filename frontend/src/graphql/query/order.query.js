import { gql } from "@apollo/client";

export const THEIR_ORDERS = gql`
    query {
        theirOrders {
            
            food {
                _id
                name
                price
                image
            }
            addOns {
                ingredient
                quantity
            }
            orderedBy
        }
    }
`