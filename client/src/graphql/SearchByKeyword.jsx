import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import SearchList from '../components/Search/SearchList';
import ErrorMessage from '../components/errorMessage';
import { FIND_POSTS_BY_KEYWORD } from './queries';
import Spinner from '../components/UI/Spinner';

const SearchPostsByKeyword = (props) => {
  const { history, keyword, theme } = props;

  return (
    <Query
      query={FIND_POSTS_BY_KEYWORD}
      variables={{ keyword }}
      fetchPolicy="network-only"
      refetchQueries={() => [{
        query: FIND_POSTS_BY_KEYWORD
      }]}
    >
      {({ loading, error, data }) => {
        if (loading) return <Spinner theme={theme} margin="5em 0 0 0" />;
        if (error) {
          return (
            <ErrorMessage
              theme={props.theme}
              text="Back"
              message="Error =( Try again later..."
              handleClick={() => {
                history.push('/');
              }}
            />
          );
        }
        return <SearchList data={data.findPostsByKeyword} query={keyword} {...props} />;
      }}
    </Query>
  );
};

export default withRouter(SearchPostsByKeyword);

SearchPostsByKeyword.propTypes = {
  history: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired
};
