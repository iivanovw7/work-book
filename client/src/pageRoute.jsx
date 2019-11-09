import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Redirect, Route } from 'react-router-dom';
import { client } from './config';
import * as utils from './utils';
import ContentLayout from './layouts/contentLayout';

const PageRoute = ({ component: Component, ...rest }) => {
  const { protectedRoute } = rest;
  const [userAccess, setUserAccess] = useState(false);

  // Checking current user access rights every time route has been called
  useEffect(() => {
    if (utils.ifTokenExists()) {
      const getAccessRights = async () => setUserAccess(await utils.checkUser());
      getAccessRights().catch(e => console.log(e));
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if ((protectedRoute && userAccess) || !protectedRoute) {
          return (
            <ApolloProvider client={client}>
              <ContentLayout userAccess={userAccess}>
                <Component {...props} />
              </ContentLayout>
            </ApolloProvider>
          );
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default PageRoute;

PageRoute.propTypes = {
  component: PropTypes.func.isRequired
};
