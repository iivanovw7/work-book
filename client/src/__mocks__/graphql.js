import {
  GET_POST, GET_POSTS, GET_TAGS, GET_USER, FIND_POSTS_BY_TAG, FIND_POSTS_BY_KEYWORD
} from '../graphql/queries';
import { DELETE_POST, ADD_POST, UPDATE_POST } from '../graphql/mutations';

export const gqlMocks = [
  /**
	 * [0] Returned after success GET POST request
	 */
  {
    request: {
      query: GET_POST,
      variables: {
        _id: '1'
      }
    },
    result: {
      data: {
        getPost: {
          _id: '1',
          text: 'Post text',
          title: 'Post title',
          subject: 'Post subject',
          created: 'Post date',
          author: 'Post author',
          tags: ['1', '2', '3']
        }
      }
    }
  },
  /**
	 * [1] Returned after errored GET POST request
	 */
  {
    request: {
      query: GET_POST,
      variables: {
        _id: '1'
      }
    },
    error: new Error('aw shucks')
  },
  /**
	 * [2] Returned after success DELETE POST mutation
	 */
  {
    request: {
      query: DELETE_POST,
      variables: {
        _id: '1'
      }
    },
    result: {
      deletePost: {
        text: 'Post text',
        title: 'Post title',
        subject: 'Post subject',
        tags: ['1', '2', '3']
      }
    }
  },
  /**
	 * [3] Returned after errored DELETE POST mutation
	 */
  {
    request: {
      query: DELETE_POST,
      variables: {
        _id: '1'
      }
    },
    error: new Error('aw shucks')
  },
  /**
	 * [4] Returned after success ADD POST mutation
	 */
  {
    request: {
      query: ADD_POST,
      variables: {
        text: 'Post text',
        title: 'Post title',
        subject: 'Post subject',
        tags: ['1', '2', '3']
      }
    },
    result: {
      addPost: {
        text: 'Post text',
        title: 'Post title',
        subject: 'Post subject',
        tags: ['1', '2', '3']
      }
    }
  },
  /**
	 * [5] Returned after errored ADD POST mutation
	 */
  {
    request: {
      query: ADD_POST,
      variables: {
        text: 'Post text',
        title: 'Post title',
        subject: 'Post subject',
        tags: ['1', '2', '3']
      }
    },
    error: new Error('aw shucks')
  },
  /**
	 * [6] Returned after success UPDATE POST mutation
	 */
  {
    request: {
      query: UPDATE_POST,
      variables: {
        _id: '1',
        text: 'Post text',
        title: 'Post title',
        subject: 'Post subject',
        tags: ['1', '2', '3']
      }
    },
    result: {
      data: {
        getPost: {
          _id: '1',
          text: 'Post text',
          title: 'Post title',
          subject: 'Post subject',
          created: 'Post date',
          author: 'Post author',
          tags: ['1', '2', '3']
        }
      }
    }
  },
  /**
	 * [7] Returned after success UPDATE POST mutation
	 */
  {
    request: {
      query: UPDATE_POST,
      variables: {
        _id: '1',
        text: 'Post text',
        title: 'Post title',
        subject: 'Post subject',
        tags: ['1', '2', '3']
      }
    },
    error: new Error('aw shucks')
  },
  /**
	 * [8] Returned after success GET POSTS query
	 */
  {
    request: {
      query: GET_POSTS
    },
    result: {
      data: {
        getPosts: [
          {
            _id: '5d283694ddc2cb244f84bdca',
            author: '5cbeba32fb6fc0265f273c94',
            created: '1562915551933',
            subject: 'Cross browser solution for handling mouse wheel events in Angular with Rx.js for',
            tags: ['1', '2', '3'],
            text: 'Post text',
            title: 'Custom Angular mouseWheel scroll directive'
          }
        ]
      }
    }
  },
  /**
	 * [9] Returned after error after GET POSTS query
	 */
  {
    request: {
      query: GET_POSTS
    },
    error: new Error('aw shucks')
  },
  /**
	 * [10] Returned after success GET TAGS query
	 */
  {
    request: {
      query: GET_TAGS
    },
    result: {
      data: {
        getTags: ['1', '2', '3']
      }
    }
  },
  /**
	 * [11] Returned after errored GET TAGS query
	 */
  {
    request: {
      query: GET_TAGS
    },
    error: new Error('aw shucks')
  },
  /**
	 *  [12] Returned after success GET USER query
	 */
  {
    request: {
      query: GET_USER,
      variables: {
        _id: '1'
      }
    },
    result: {
      data: {
        getUser: {
          _id: '1',
          email: 'Email',
          phone: 'Phone',
          name: 'Name',
          surname: 'Surname',
          created: 'Date',
          role: 'Role'
        }
      }
    }
  },
  /**
	 *  [13] Returned after errored GET USER query
	 */
  {
    request: {
      query: GET_USER,
      variables: {
        _id: '1'
      }
    },
    error: new Error('aw shucks')
  },
  /**
   *  [14] Returned after FIND_POSTS_BY_TAG query
   */
  {
    request: {
      query: FIND_POSTS_BY_TAG,
      variables: {
        tag: '1'
      }
    },
    result: {
      data: {
        findPostsByTag: [
          {
            _id: '5d283694ddc2cb244f84bdca',
            author: '5cbeba32fb6fc0265f273c94',
            created: '1562915551933',
            subject: 'Cross browser solution for handling mouse wheel events in Angular with Rx.js for',
            tags: ['1', '2', '3'],
            text: 'Post text',
            title: 'Custom Angular mouseWheel scroll directive'
          }
        ]
      }
    }
  },
  /**
   * [15] Returned after errored FIND_POSTS_BY_TAG query
   */
  {
    request: {
      query: FIND_POSTS_BY_TAG,
      variables: {
        tag: '1'
      }
    },
    error: new Error('aw shucks')
  },
  /**
   *  [16] Returned after FIND_POSTS_BY_KEYWORD query
   */
  {
    request: {
      query: FIND_POSTS_BY_KEYWORD,
      variables: {
        keyword: 'Custom'
      }
    },
    result: {
      data: {
        findPostsByKeyword: [
          {
            _id: '5d283694ddc2cb244f84bdca',
            author: '5cbeba32fb6fc0265f273c94',
            created: '1562915551933',
            subject: 'Cross browser solution for handling mouse wheel events in Angular with Rx.js for',
            tags: ['1', '2', '3'],
            text: 'Post text',
            title: 'Custom Angular mouseWheel scroll directive'
          }
        ]
      }
    }
  },
  /**
   * [17] Returned after errored FIND_POSTS_BY_KEYWORD query
   */
  {
    request: {
      query: FIND_POSTS_BY_KEYWORD,
      variables: {
        keyword: 'Custom'
      }
    },
    error: new Error('aw shucks')
  }
];
