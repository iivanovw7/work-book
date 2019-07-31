import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ripples } from '../../styles';
import { textColor, textColorLighten } from '../../theme';
/* eslint react/require-default-props: 0 */

const StyledIconButton = styled.button`
	${ripples};
  display: flex;
  flex-wrap: nowrap;
  padding: ${props => props.padding};
  text-align: center;
  flex-direction: column;
  color: ${textColor};
  align-items: center;
  border: none;
  max-width: 48px;
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
  
 
`;

const ButtonTextIcon = (props) => {
  const {
    icon, variant, handleClick, text, theme, padding, fontSize
  } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledIconButton
        variant={variant}
        onClick={handleClick}
        padding={padding}
        fontSize={fontSize}
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
  padding: PropTypes.string.isRequired
};

export default ButtonTextIcon;
