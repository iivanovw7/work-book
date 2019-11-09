import PropTypes from 'prop-types';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { UPDATE_POST } from './mutations';
import { GET_POST } from './queries';
import Spinner from '../components/UI/Spinner';
import ErrorMessage from '../components/errorMessage';
import PostForm from '../components/Post/PostForm';

const UpdatePost = (props) => {
  const { id, history, theme } = props;
  return (
    <Query
      query={GET_POST}
      variables={{ _id: id }}
      refetchQueries={() => [{
        query: GET_POST,
        variables: { _id: id }
      }]}
    >
      {({ loading, error, data }) => {
        if (loading) return <Spinner theme={theme} margin="5em 0 0 0" />;
        if (error) {
          return (
            <ErrorMessage
              theme={theme}
              text="Back"
              message="Post not found!"
              handleClick={() => {
                history.push('/posts');
              }}
            />
          );
        }
        return (
          <Mutation mutation={UPDATE_POST}>
            {updatePost => (
              <div>
                <PostForm updatePost={updatePost} data={data} {...props} />
              </div>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default withRouter(UpdatePost);

UpdatePost.propTypes = {
  history: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
};
