import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PostForm from '../components/Post/PostForm';
import ErrorMessage from '../components/errorMessage';
import Spinner from '../components/UI/Spinner';
import { ADD_POST } from './mutations';
import { GET_POSTS } from './queries';

const CreatePost = (props) => {
  const { theme, history } = props;

  return (
    <Mutation
      mutation={ADD_POST}
      refetchQueries={() => [{ query: GET_POSTS }]}
    >
      {(addPost, { loading, error, data }) => (
        <div>
          <PostForm addPost={addPost} data={data} {...props} />
          {loading && <Spinner theme={theme} margin="5em 0 0 0" />}
          {error && (
            <ErrorMessage
              theme={theme}
              text="Back"
              message="Error =( Try again later..."
              handleClick={() => {
                history.push('/');
              }}
            />
          )}
        </div>
      )}
    </Mutation>
  );
};

export default withRouter(CreatePost);

CreatePost.propTypes = {
  history: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired
};
