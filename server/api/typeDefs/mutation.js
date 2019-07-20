import { gql } from 'apollo-server';

export const mutation = gql`
  type Mutation {
        addUser(
          email: String!, 
          phone: String!,
          name: String!,
          password: String!,
          surname: String!,
          role: String!
        ): User,
        
        addPost(
          subject: String!, 
          text: String!, 
          title: String!,
          tags: [String],
          author: String,
          published: Boolean
        ): Post,
        
        updatePost(
          _id: String!,
          subject: String!, 
          text: String!, 
          title: String!,
          tags: [String],
          author: String,
          published: Boolean
        ): Post,
        
        deletePost(
          _id: String!
        ): Post
    }
`;
