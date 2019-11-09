import PropTypes from 'prop-types';
import React from 'react';
import useStoreon from 'storeon/react';
import { withRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import QueryUser from '../graphql/QueryUser';
import TopBar from '../components/Navigation/TopBar';
import MobileNavBar from '../components/Navigation/MobileNavbar';
import SideBar from '../components/Navigation/SideBar';
import { textColor, backgroundColor } from '../theme';
import { wrapper, content, aside } from '../styles';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const StyledSection = styled.section`
  color: ${textColor};
  background-color: ${backgroundColor};
`;

const StyledWrapper = styled.section`
  ${wrapper}
`;

const StyledSideBar = styled.aside`
  ${aside}
`;

const StyledContainer = styled.div`
  ${content}
`;

const User = (props) => {
  const { location } = props;
  const { theme, locale, localizedText } = useStoreon('theme', 'locale', 'localizedText');
  const pathName = location.pathname.split('/')[2];

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledSection className="container">
        <section>
          <TopBar locale={locale} text={localizedText} {...props} />
        </section>
        <StyledWrapper>
          <StyledSideBar>
            <SideBar
              theme={theme}
              locale={locale}
              location={location}
              text={localizedText}
              onlyMobile
              {...props}
            />
          </StyledSideBar>
          <StyledContainer>
            <QueryUser
              theme={theme}
              locale={locale}
              text={localizedText}
              id={pathName}
              {...props}
            />
          </StyledContainer>
        </StyledWrapper>
        <section className="mobile">
          <MobileNavBar theme={theme} locale={locale} text={localizedText} {...props} />
        </section>
      </StyledSection>
    </ThemeProvider>
  );
};

User.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userAccess: PropTypes.bool.isRequired
};

export default withRouter(User);
