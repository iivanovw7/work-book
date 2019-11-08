import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import TagsCloud from '../components/Tags/TagsCloud';
import Spinner from '../components/UI/Spinner';
import { GET_TAGS } from './queries';

const QueryTags = (props) => {
  const { history, theme } = props;

  return (
    <Query query={GET_TAGS}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner theme={theme} />;
        if (error) return <p>Error!</p>;
        return <TagsCloud data={data} history={history} postTags={false} {...props} />;
      }}
    </Query>
  );
};

export default withRouter(QueryTags);

QueryTags.propTypes = {
  history: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired
};
