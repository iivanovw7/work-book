import { gql } from 'apollo-server-express';

export const userTypes = gql`
  type User {
    _id: String,
    email: String,
    phone: String,
    password: String,
    name: String,
    surname: String,
    created: String,
    role: String
  }
`;
