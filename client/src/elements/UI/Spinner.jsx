import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { textColor, btnBackground } from '../../theme';

const StyledWrapper = styled.div`
	display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  

  div {
  	margin-top: 0.5rem;
  }
`;

const StyledSpinner = styled.div`
	border-top-color: ${textColor}
  margin-top: 1rem
  display: inline-block
  width: 50px
  height: 50px
  border: 3px solid rgba(0, 0, 0, 0.3)
  border-radius: 50%
  border-top-color: ${btnBackground}
  animation: spin 1s ease-in-out infinite
  -webkit-animation: spin 1s ease-in-out infinite

	@keyframes spin
  	to
    	-webkit-transform: rotate(360deg)

	@-webkit-keyframes spin
  	to
    	-webkit-transform: rotate(360deg)
`;

const Spinner = (props) => {
	const { theme } = props;

	return (
		<ThemeProvider theme={{ mode: theme }}>
			<StyledWrapper>
				<StyledSpinner />
			</StyledWrapper>
		</ThemeProvider>
	);
};

export default Spinner;

Spinner.propTypes = {
	theme: PropTypes.string.isRequired
};
