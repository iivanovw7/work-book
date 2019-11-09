import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import useStoreon from 'storeon/react';
import styled, { ThemeProvider } from 'styled-components';
import SearchPostsByTag from '../graphql/SearchByTag';
import SearchPostsByKeyword from '../graphql/SearchByKeyword';
import MobileNavBar from '../components/Navigation/MobileNavbar';
import SideBar from '../components/Navigation/SideBar';
import TopBar from '../components/Navigation/TopBar';
import { wrapper, content, aside } from '../styles';
import { backgroundColor, textColor } from '../theme';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const StyledSection = styled.section`
  color: ${textColor};
  background-color: ${backgroundColor};
  min-width: 100%;
  box-sizing: content-box;
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

const Search = (props) => {
  const { location } = props;
  const {
    theme, locale, localizedText, search
  } = useStoreon('theme', 'locale', 'localizedText', 'search');
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
              onlyMobile={false}
              {...props}
            />
          </StyledSideBar>
          <StyledContainer>
            { search !== '' && (
              <SearchPostsByKeyword
                keyword={search}
                locale={locale}
                text={localizedText}
                theme={theme}
                {...props}
              />
            )}
            { search === '' && (
              <SearchPostsByTag
                tag={pathName}
                locale={locale}
                text={localizedText}
                theme={theme}
                {...props}
              />
            )}
          </StyledContainer>
        </StyledWrapper>
        <section className="mobile">
          <MobileNavBar theme={theme} locale={locale} text={localizedText} {...props} />
        </section>
      </StyledSection>
    </ThemeProvider>
  );
};

Search.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.any,
  userAccess: PropTypes.bool.isRequired
};

export default withRouter(Search);
