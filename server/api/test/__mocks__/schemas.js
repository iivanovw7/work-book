export const getTagsCase = {
  id: 'getTags',
  query: `
    query GetTags{
      getTags
    }
  `,
  variables: {},
  context: {},
  expected: {
    data: {
      getTags: [
        'linux',
        'linux'
      ]
    }
  }
};

export const getPostsCase = {
  id: 'getPosts',
  query: `
    query getPosts($skip: Int, $limit: Int){
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
  `,
  variables: {},
  context: {},
  expected: {
    data: {
      getPosts: {
        skip: 1,
        limit: 1,
        count: 1,
        posts: [
          {
            _id: 'linux',
            text: 'linux',
            title: 'linux',
            subject: 'linux',
            created: 'linux',
            author: 'linux',
            tags: ['linux', 'linux']
          },
          {
            _id: 'linux',
            text: 'linux',
            title: 'linux',
            subject: 'linux',
            created: 'linux',
            author: 'linux',
            tags: ['linux', 'linux']
          }
        ]
      }
    }
  }
};

export const getPostCase = {
  id: 'getPost',
  query: `
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
  `,
  variables: {
    _id: '1'
  },
  context: {},
  expected: {
    data: {
      getPost: {
        _id: 'linux',
        text: 'linux',
        title: 'linux',
        subject: 'linux',
        created: 'linux',
        author: 'linux',
        tags: ['linux', 'linux']
      }
    }
  }
};

export const findPostsByTagCase = {
  id: 'findPostsByTag',
  query: `
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
  `,
  variables: {
    tag: '1'
  },
  context: {},
  expected: {
    data: {
      findPostsByTag: [
        {
          _id: 'linux',
          text: 'linux',
          title: 'linux',
          subject: 'linux',
          created: 'linux',
          author: 'linux',
          tags: ['linux', 'linux']
        },
        {
          _id: 'linux',
          text: 'linux',
          title: 'linux',
          subject: 'linux',
          created: 'linux',
          author: 'linux',
          tags: ['linux', 'linux']
        }
      ]
    }
  }
};

export const findPostsByKeywordCase = {
  id: 'findPostsByKeyword',
  query: `
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
  `,
  variables: {
    keyword: '1'
  },
  context: {},
  expected: {
    data: {
      findPostsByKeyword: [
        {
          _id: 'linux',
          text: 'linux',
          title: 'linux',
          subject: 'linux',
          created: 'linux',
          author: 'linux',
          tags: ['linux', 'linux']
        },
        {
          _id: 'linux',
          text: 'linux',
          title: 'linux',
          subject: 'linux',
          created: 'linux',
          author: 'linux',
          tags: ['linux', 'linux']
        }
      ]
    }
  }
};

export const getUser = {
  id: 'getUser',
  query: `
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
  `,
  variables: {
    _id: '1'
  },
  context: {},
  expected: {
    data: {
      getUser: {
        _id: 'linux',
        email: 'linux',
        phone: 'linux',
        name: 'linux',
        surname: 'linux',
        created: 'linux',
        role: 'linux'
      }
    }
  }
};
