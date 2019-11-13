import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoMatchRoute from './components/noMatchRoute';
import PageRoute from './pageRoute';
import Login from './screens/Login';
import Post from './screens/Post';
import Posts from './screens/Posts';
import Search from './screens/Search';
import User from './screens/User';

const NoMatch = ({ location }) => (
  <NoMatchRoute location={location} />
);

export default (
  <Switch>
    <PageRoute exact path="/" component={Posts} />
    <PageRoute exact path="/posts" component={Posts} />
    <Route exect path="/login" component={Login} />
    <PageRoute path="/user/:id" component={User} protectedRoute />
    <PageRoute path="/posts/update/:id" component={Post} protectedRoute />
    <PageRoute path="/posts/new" component={Post} protectedRoute />
    <PageRoute path="/posts/:id" component={Post} />
    <PageRoute path="/search/:tag" component={Search} />
    <Route component={NoMatch} />
  </Switch>
);

NoMatch.propTypes = {
  location: PropTypes.object.isRequired
};
