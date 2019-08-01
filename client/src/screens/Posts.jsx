import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import useStoreon from 'storeon/react';
import styled, { ThemeProvider } from 'styled-components';
import QueryPosts from '../queryBlocks/QueryPosts';
import MobileNavBar from '../components/MobileNavBar/MobileNavbar';
import SideBar from '../components/SideBar/SideBar';
import TopBar from '../components/TopBar/TopBar';
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

const Posts = (props) => {
  const { theme, locale, localizedText } = useStoreon('theme', 'locale', 'localizedText');

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
                <SideBar theme={theme} locale={locale} text={localizedText} {...props} />
              </StyledSideBar>
            </Col>
            <Col xs={12} sm={12} md={9} lg={9}>
              <section>
                <QueryPosts locale={locale} text={localizedText} theme={theme} {...props} />
              </section>
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

Posts.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.any,
  userAccess: PropTypes.bool.isRequired
};

export default withRouter(Posts);
