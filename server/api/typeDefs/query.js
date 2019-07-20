import { gql } from 'apollo-server';

export const query = gql`
  type Query {
    getUsers:[User],
    getUser(_id: String!):User,
    getPosts:[Post],
    getTags: [String],
    tag: String,
    getPost(_id: String!): Post ,
    findPostsByTag(tag: String!): [Post]
  }
`;
