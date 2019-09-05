import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import useStoreon from 'storeon/react';
import styled, { ThemeProvider } from 'styled-components';
import SearchPostsByTag from '../queryBlocks/SearchByTag';
import SearchPostsByKeyword from '../queryBlocks/SearchByKeyword';
import MobileNavBar from '../components/Navigation/MobileNavbar';
import SideBar from '../components/Navigation/SideBar';
import TopBar from '../components/Navigation/TopBar';
import { backgroundColor, textColor } from '../theme';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const StyledSection = styled.section`
	color: ${textColor};
  background-color: ${backgroundColor};
  min-width: 100%
  
  box-sizing: content-box;
`;

const StyledSideBar = styled.aside`
	max-width: inherit;
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
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={3} lg={3}>
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
            </Col>
            <Col xs={12} sm={12} md={9} lg={9}>
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
            </Col>
          </Row>
        </Grid>
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
