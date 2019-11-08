import { gql } from 'apollo-server-express';

export const postTypes = gql`
  type Post {
    _id: String!,
    text: String!,
    title: String!,
    subject: String!,
    created: String!,
    author: String,
    tags: [String],
    published: Boolean
  }
  
  type Posts {
    skip: Int!,
    limit: Int!,
    count: Int!,
    posts: [Post]!
  }
`;
