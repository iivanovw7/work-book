import { gql } from 'apollo-boost';

export const ADD_POST = gql`
  mutation AddPost($subject: String!, $text: String!, $title: String!, $tags: [String]){
    addPost(
      subject: $subject
      text: $text
      title: $title
      tags: $tags
    ) {
      subject
      text
      tags
      title
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($_id: String!){
    deletePost(_id: $_id) {
      subject
      tags
      text
      title
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($_id: String!, $subject: String!, $text: String!, $title: String!, $tags: [String]){
    updatePost(
      _id: $_id,
      subject: $subject
      text: $text
      title: $title
      tags: $tags
    ) {
      subject
      text
      tags
      title
    }
  }
`;
