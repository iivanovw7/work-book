import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ripples } from '../../styles';
import { btnBackground, btnLighten, btnTextColor } from '../../theme';
/* eslint react/require-default-props: 0 */

const StyledButton = styled.button`
	${ripples};
  background-color: ${btnBackground};
  color: ${btnTextColor};
  float: none;
  display: inline-block;
  border-radius: 0.2em;
  border: 0;
  outline: 0;
  padding: 0.5em;
  margin: 0.2em;
  font-weight: 600;
  width: 100%;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '100%')};
  
  &:hover {
    background-color: ${btnLighten};
    transition: all 0.2s ease-in-out;
    user-select: none;
    cursor: pointer;
    outline: none;
  }
  
  &:focus {
    outline: none;
  }
  
`;

const Button = (props) => {
  const {
    handleClick, text, theme, variant, maxWidth
  } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledButton
        variant={variant}
        className="bold ripple"
        maxWidth={maxWidth}
        onClick={handleClick}
      >
        {text}
      </StyledButton>
    </ThemeProvider>
  );
};

StyledButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'alert'])
};

StyledButton.defaultProps = {
  variant: 'primary'
};

Button.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  maxWidth: PropTypes.string,
  variant: PropTypes.string
};

export default Button;
