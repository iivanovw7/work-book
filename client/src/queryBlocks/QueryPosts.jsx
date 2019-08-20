import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { ErrorMessage } from '../elements/errorMessage';
import { GET_POSTS } from '../graphql/queries';
import PostsList from '../components/Posts/PostsList';
import Spinner from '../elements/UI/Spinner';

const QueryPosts = props => (
  <Query query={GET_POSTS}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner theme={props.theme} mgTop={5} />;
      if (error) {
        return (
          <ErrorMessage
            theme={props.theme}
            text="Back"
            message="Error =( Try again later..."
            handleClick={() => {
              props.history.push('/');
            }}
          />
        );
      }
      return <PostsList data={data} {...props} />;
    }}
  </Query>
);

export default withRouter(QueryPosts);

QueryPosts.propTypes = {
  history: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired
};
