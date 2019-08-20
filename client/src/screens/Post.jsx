import PropTypes from 'prop-types';
import React from 'react';
import useStoreon from 'storeon/react';
import { withRouter } from 'react-router-dom';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import styled, { ThemeProvider } from 'styled-components';
import SwitchedPostComponent from '../utils/postHelpers';
import MobileNavBar from '../components/MobileNavBar/MobileNavbar';
import TopBar from '../components/TopBar/TopBar';
import { backgroundColor, textColor } from '../theme';
import SideBar from '../components/SideBar/SideBar';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const StyledSection = styled.div`
	color: ${textColor};
  background-color: ${backgroundColor};
  min-width: 100%
  box-sizing: content-box;
`;

const StyledSideBar = styled.aside`
  max-width: inherit;
`;

const Post = (props) => {
  const { location } = props;
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
                <SideBar
                  theme={theme}
                  locale={locale}
                  text={localizedText}
                  onlyMobile
                  {...props}
                />
              </StyledSideBar>
            </Col>
            <Col xs={12} sm={12} md={9} lg={9}>
              <SwitchedPostComponent
                location={location}
                theme={theme}
                locale={locale}
                text={localizedText}
              />
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

Post.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userAccess: PropTypes.bool.isRequired
};

export default withRouter(Post);
