import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { spin } from '../../styles';
import { spinnerBackground, textLinkColorLighten } from '../../theme';
/* eslint react/require-default-props: 0 */

const StyledWrapper = styled.div`
	display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  div {
    margin: ${props => props.margin};
    padding: ${props => props.padding};
  }
`;

const StyledSpinner = styled.div`
  ${spin}
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid ${spinnerBackground};
  border-top-color: ${textLinkColorLighten};

`;

const Spinner = (props) => {
  const { theme, margin, padding } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledWrapper margin={margin} padding={padding}>
        <StyledSpinner variant="secondary" />
      </StyledWrapper>
    </ThemeProvider>
  );
};

export default Spinner;

StyledSpinner.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary'])
};

StyledSpinner.defaultProps = {
  variant: 'primary',
  mgTop: '0',
  padding: '0'
};

Spinner.propTypes = {
  theme: PropTypes.string.isRequired,
  padding: PropTypes.string,
  margin: PropTypes.string
};
