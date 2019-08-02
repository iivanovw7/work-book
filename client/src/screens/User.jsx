import PropTypes from 'prop-types';
import React from 'react';
import useStoreon from 'storeon/react';
import { withRouter } from 'react-router-dom';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import styled, { ThemeProvider } from 'styled-components';
import QueryUser from '../queryBlocks/QueryUser';
import TopBar from '../components/TopBar/TopBar';
import { textColor, backgroundColor } from '../theme';
import MobileNavBar from '../components/MobileNavBar/MobileNavbar';
import SideBar from '../components/SideBar/SideBar';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const StyledSection = styled.section`
	color: ${textColor};
  background-color: ${backgroundColor};
`;

const StyledSideBar = styled.aside`
	max-width: inherit;
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
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={3} lg={3}>
              <StyledSideBar>
                <SideBar theme={theme} locale={locale} text={localizedText} onlyMobile {...props} />
              </StyledSideBar>
            </Col>
            <Col xs={12} sm={12} md={9} lg={9}>
              <section>
                <QueryUser
                  theme={theme}
                  locale={locale}
                  text={localizedText}
                  id={pathName}
                  {...props}
                />
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

User.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userAccess: PropTypes.bool.isRequired
};

export default withRouter(User);
