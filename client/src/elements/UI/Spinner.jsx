import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
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
    margin-top: ${props => props.mgTop}em;
  }
`;

const StyledSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid ${spinnerBackground};
  border-top-color: ${textLinkColorLighten};
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
    	-webkit-transform: rotate(0deg);
		}
		
		100% {
			transform: rotate(360deg);
    	-webkit-transform: rotate(360deg);
		}
	}
 

	@-webkit-keyframes spin {
		0% {
			transform: rotate(0deg);
    	-webkit-transform: rotate(0deg);
		}
		
		100% {
			transform: rotate(360deg);
    	-webkit-transform: rotate(360deg);
    }
  }
`;

const Spinner = (props) => {
  const { theme, mgTop } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledWrapper mgTop={mgTop}>
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
  mgTop: 0
};

Spinner.propTypes = {
  theme: PropTypes.string.isRequired,
  mgTop: PropTypes.number
};
