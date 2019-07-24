import { gql } from 'apollo-boost';

export const GET_POSTS = gql`
  query GetPosts{
    getPosts{
      _id
      text
      title
      subject
      created
      author
      tags
    }
  }
`;

// export const GET_POSTS_BY_TAG = gql`
// `;

export const GET_TAGS = gql`
  query GetTags{
    getTags
  }
`;

export const GET_POST = gql`
  query GetPost($_id: String!){
    getPost(_id: $_id){
      _id
      text
      title
      subject
      created
      author
      tags
    }
  }
`;
