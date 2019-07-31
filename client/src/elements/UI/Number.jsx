import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { btnBackground, btnTextColor } from '../../theme';
/* eslint react/require-default-props: 0 */

const StyledContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 0.8em;
`;

const StyledNumber = styled.span`
	 margin-right: 0.8em;
   border-radius: 100%;
   background-color: ${btnBackground};
   color: ${btnTextColor};
   width: 1.4em;
   height: 1.4em;
   padding: 0.1em;
   text-align: center;
   display: inline-block;
`;
const Number = (props) => {
  const {
    value, label, variant, theme
  } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledContainer className="dates">
        <StyledNumber variant={variant}>
          {value}
        </StyledNumber>
        {' '}
        {label}
      </StyledContainer>
    </ThemeProvider>
  );
};

StyledNumber.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary'])
};

StyledNumber.defaultProps = {
  variant: 'primary'
};

Number.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  variant: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
};

export default Number;
