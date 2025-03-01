import {gql} from '@apollo/client'

export const LOGIN_CUSTOMER = gql`
    mutation login($input : LoginInput!) {
        login(input: $input) {
            # order
            _id
            tableNumber
            
        }
    }
`

export const LOGOUT_CUSTOMER = gql`
    mutation logout{
        logout {
            message
            
        }
    }
`

