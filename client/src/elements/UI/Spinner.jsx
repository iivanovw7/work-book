import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { btnBackground } from '../../theme';

const StyledWrapper = styled.div`
	display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  

  div {
  	margin-top: 5rem;
  }
`;

const StyledSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top-color: ${btnBackground};
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
	const { theme } = props;

	return (
		<ThemeProvider theme={{ mode: theme }}>
			<StyledWrapper>
				<StyledSpinner variant="primary" />
			</StyledWrapper>
		</ThemeProvider>
	);
};

export default Spinner;

Spinner.propTypes = {
	theme: PropTypes.string.isRequired
};

StyledSpinner.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary'])
};

StyledSpinner.defaultProps = {
	variant: 'primary'
};
