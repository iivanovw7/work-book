import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { GET_POST } from './queries';
import ErrorMessage from '../components/errorMessage';
import PostView from '../components/Post/PostView';
import Spinner from '../components/UI/Spinner';

const QueryPost = (props) => {
  const { history, id, theme } = props;

  return (
    <Query query={GET_POST} variables={{ _id: id }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner theme={theme} margin="5em 0 0 0" />;
        if (error) {
          return (
            <ErrorMessage
              theme={theme}
              text="Back"
              message="Post not found!"
              handleClick={() => {
                history.push('/');
              }}
            />
          );
        }
        return <PostView data={data} history={history} theme={theme} {...props} />;
      }}
    </Query>
  );
};

export default withRouter(QueryPost);

QueryPost.propTypes = {
  history: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
};
