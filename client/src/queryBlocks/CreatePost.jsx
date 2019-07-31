import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { PostForm } from '../components/Post/PostForm';
import { ErrorMessage } from '../elements/errorMessage';
import Spinner from '../elements/UI/Spinner';
import { ADD_POST } from '../graphql/mutations';
import { GET_POSTS } from '../graphql/queries';

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
          {loading && <Spinner theme={theme} />}
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
