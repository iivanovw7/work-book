import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { gridConfig } from '../config';
import * as utils from '../utils';

const ContentLayout = (props) => {
  const { userAccess, children } = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    // Verifies if there is a token in cookies
    if (utils.ifTokenExists()) {
      // If so, checks if it is valid or not
      const getAccessRights = async () => {
        const userData = await utils.checkUser(true);
        setUser(userData);
      };
      getAccessRights()
        .catch(e => console.log(e));
    }
  }, []);

  return (
    <ThemeProvider theme={gridConfig}>
      {React.cloneElement(children, {
        user,
        userAccess
      })}
    </ThemeProvider>
  );
};

export default ContentLayout;

ContentLayout.propTypes = {
  children: PropTypes.object.isRequired,
  userAccess: PropTypes.bool.isRequired
};
