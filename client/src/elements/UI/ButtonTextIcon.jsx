import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ripples } from '../../styles';
import { textColor, textColorLighten, btnBackground } from '../../theme';
/* eslint react/require-default-props: 0 */

const StyledIconButton = styled.button`
	${ripples};
  display: flex;
  flex-wrap: nowrap;
  padding: ${props => props.padding};
  text-align: center;
  border-radius: ${props => props.borderRadius};
  flex-direction: ${props => props.direction};
  color: ${btnBackground};
  align-items: center;
  border: none;
  max-width: 100%;
  width: 100%;
  background: none;
  text-decoration: none;
  font-size: ${props => props.fontSize};
  font-style: inherit;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    color: ${textColorLighten};
    transition: all 0.2s ease-in-out;
    user-select: none;
    cursor: pointer;
  }
  
  &:focus {
    outline: none;
  }
  
  span:first-of-type {
      margin-left: 0.6em;
  }
  
  &.mobile {
    max-width: 48px;
    color: ${textColor};
    
    span:first-of-type {
      margin-left: 0em;
    }
  }
`;

const ButtonTextIcon = (props) => {
  const {
    icon, variant, handleClick, text, theme, padding, fontSize, direction, borderRadius, className
  } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledIconButton
        className={className}
        variant={variant}
        onClick={handleClick}
        padding={padding}
        fontSize={fontSize}
        direction={direction}
        borderRadius={borderRadius}
      >
        <i className="material-icons">
          {icon}
        </i>
        <span>
          {text}
        </span>
      </StyledIconButton>
    </ThemeProvider>
  );
};

StyledIconButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary'])
};

StyledIconButton.defaultProps = {
  variant: 'primary'
};

ButtonTextIcon.propTypes = {
  handleClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default ButtonTextIcon;
