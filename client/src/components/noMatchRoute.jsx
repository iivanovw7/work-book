import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import useStoreon from 'storeon/react';
import { backgroundColorDarken, textColor } from '../theme';

const StyledSection = styled.section`
  background-color: ${backgroundColorDarken};
  color: ${textColor};
  min-height: 100vh;
  min-width: 100vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;

const NoMatchRoute = (props) => {
  const { locale, localizedText } = useStoreon('locale', 'localizedText');
  const { location } = props;

  return (
    <StyledSection locale={locale}>
      <article>
        <ins>{location.pathname}</ins>
        {' | '}
        {localizedText.pageNotFound.notification[locale]}
        <p>
          <a href="/">
            {localizedText.pageNotFound.linkText[locale]}
          </a>
        </p>
      </article>
    </StyledSection>
  );
};

export default NoMatchRoute;

NoMatchRoute.propTypes = {
  location: PropTypes.object.isRequired
};
