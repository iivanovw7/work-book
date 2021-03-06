import { gql } from 'apollo-boost';

export const GET_POSTS = gql`
  query GetPosts($skip: Int, $limit: Int){
    getPosts(skip: $skip, limit: $limit){
      skip
      limit
      count
      posts{
        _id
        text
        title
        subject
        created
        author
        tags
      }
    }
  }
`;

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

export const FIND_POSTS_BY_TAG = gql`
  query FindPostsByTag($tag: String!){
    findPostsByTag(tag: $tag){
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

export const FIND_POSTS_BY_KEYWORD = gql`
  query FindPostsByKeyword($keyword: String!){
    findPostsByKeyword(keyword: $keyword){
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
