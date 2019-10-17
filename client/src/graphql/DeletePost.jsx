import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Redirect, withRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Button from '../elements/UI/Button';
import Spinner from '../elements/UI/Spinner';
import { DELETE_POST } from './mutations';
import { GET_POSTS } from './queries';
/* eslint no-underscore-dangle: 0 */

const StyledContainer = styled.div`
	float: right;
	max-height: 60px;
`;

const DeletePost = (props) => {
  const {
    post, text, history, theme, locale
  } = props;

  return (
    <Mutation
      mutation={DELETE_POST}
      refetchQueries={() => [{ query: GET_POSTS }]}
    >
      {(deletePost, { loading, error, data }) => (
        <StyledContainer>
          <Button
            variant="alert"
            text={text.navigation.delete[locale]}
            theme={theme}
            maxWidth="7em"
            handleClick={() => {
              deletePost({
                variables: {
                  _id: post._id
                }
              });
              return history.push('/posts');
            }}
          />
        </StyledContainer>
      )}
    </Mutation>
  );
};

export default withRouter(DeletePost);

DeletePost.propTypes = {
  history: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired
};
