import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Spinner from '../elements/UI/Spinner';
import { GET_USER } from '../graphql/queries';
import { ErrorMessage } from '../elements/errorMessage';
import UserView from '../components/User/UserView';

const QueryUser = (props) => {
  const { history, id, theme } = props;

  return (
    <Query query={GET_USER} variables={{ _id: id }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner theme={theme} />;
        if (error) {
          return (
            <ErrorMessage
              theme={theme}
              text="Back"
              message="User not found!"
              handleClick={() => {
                history.push('/posts');
              }}
            />
          );
        }
        return <UserView data={data} history={history} {...props} />;
      }}
    </Query>
  );
};

export default withRouter(QueryUser);

QueryUser.propTypes = {
  history: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
};
