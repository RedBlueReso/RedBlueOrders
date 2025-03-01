import { gql } from "@apollo/client"

export const AUTH_CUSTOMER = gql`
    query authUser{
        authCustomer {
            _id
            tableNumber
        }
    }
`