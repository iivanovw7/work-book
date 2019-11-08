import { gql } from 'apollo-server';

export const query = gql`
  type Query {
    getUsers: [User],
    getUser(_id: String!): User,
    getPosts(skip: Int, limit: Int): Posts,
    getTags: [String],
    tag: String,
    getPost(_id: String!): Post ,
    findPostsByTag(tag: String!): [Post],
    findPostsByKeyword(keyword: String!): [Post]
  }
`;
