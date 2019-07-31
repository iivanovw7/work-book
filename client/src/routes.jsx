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
    <PageRoute exact path="/" component={Posts} privateRoute={false} />
    <PageRoute exact path="/posts" component={Posts} privateRoute={false} />
    <Route path="/login" component={Login} />
    <PageRoute path="/user/:id" component={User} privateRoute />
    <PageRoute path="/posts/update/:id" component={Post} privateRoute />
    <PageRoute path="/posts/new" component={Post} privateRoute />
    <PageRoute path="/posts/:id" component={Post} privateRoute={false} />
    <PageRoute path="/search/:tag" component={Search} privateRoute={false} />
    <Route component={NoMatch} />
  </Switch>
);

NoMatch.propTypes = {
  location: PropTypes.object.isRequired
};
