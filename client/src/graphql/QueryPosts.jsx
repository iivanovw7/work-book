import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { GET_POSTS } from './queries';
import ErrorMessage from '../components/errorMessage';
import PostsList from '../components/Posts/List';
import Spinner from '../components/UI/Spinner';

const QueryPosts = (props) => {
  const { skip, limit } = props;
  const [skipped, setSkipped] = useState(skip);

  return (
    <Query query={GET_POSTS} variables={{ skip, limit }} fetchPolicy="cache-and-network">
      {({
        loading, error, data, fetchMore
      }) => {
        /**
         * Triggers fetching additional results and updating current query results
         * @param {Number} skipRecords - results to be skipped
         * @param {Number} queryLimit - number of results to be fetched
         * @return {*}
         */
        function triggerFetchMore(skipRecords, queryLimit) {
          return fetchMore({
            variables: { skip: skipRecords, limit: queryLimit },
            updateQuery: (previousResult = {}, { fetchMoreResult }) => {
              if (!fetchMoreResult || (skipped === skipRecords)) return previousResult;

              const previousEntries = previousResult.getPosts.posts;
              const newEntries = fetchMoreResult.getPosts.posts;
              setSkipped(skipRecords);

              return {
                ...previousResult,
                getPosts: {
                  ...fetchMoreResult.getPosts,
                  posts: [...previousEntries, ...newEntries]
                }
              };
            }
          });
        }

        if (data && data.getPosts) {
          const postsLength = data.getPosts.posts.length;
          const hasMore = (postsLength < data.getPosts.count);

          return (
            <PostsList
              data={data}
              hasMore={hasMore}
              loading={loading}
              loader={<Spinner theme={props.theme} margin="1em 0 0 0" />}
              atBottomHandler={() => {
                if (!loading && hasMore) {
                  triggerFetchMore(postsLength, limit);
                }
              }}
              {...props}
            />
          );
        }

        if (loading) return <Spinner theme={props.theme} margin="5em 0 0 0" />;
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
      }}
    </Query>
  );
};

QueryPosts.defaultProps = {
  skip: 0,
  limit: 10
};

QueryPosts.propTypes = {
  history: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  skip: PropTypes.number,
  limit: PropTypes.number
};

export default withRouter(QueryPosts);
