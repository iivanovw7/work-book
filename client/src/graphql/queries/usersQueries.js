import { gql } from 'apollo-boost';

export const GET_USER = gql`
  query GetUser($_id: String!){
    getUser(_id: $_id){
      _id,
      email,
      phone,
      name,
      surname,
      created,
      role
  	}
	}
`;
