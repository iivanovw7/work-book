import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { ripples } from '../../styles';
import {
  btnHighlight, textColor, textColorActive, textColorLighten, btnBackground, btnLighten
} from '../../theme';
/* eslint react/require-default-props: 0 */

const activeClassName = 'selected';
const StyledLinkIcon = styled(NavLink)
  .attrs({
    activeClassName
  })`
	${ripples};
  display: flex;
  flex-wrap: nowrap;
  color: ${btnBackground};
  padding: ${props => props.padding};
  text-align: center;
  max-width: 100%;
  width: 100%;
  border-radius: ${props => props.radius};
  flex-direction: ${props => props.direction};
  
  align-items: center;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  font-size: ${props => props.fontSize};
  
  &::-moz-focus-inner {
    border: 0;
  }
  
  &:hover {
    	color: ${btnLighten};
    	transition: all 0.2s ease-in-out;
    	user-select: none;
    	cursor: pointer;
    	outline: none;
  }
  
  &:focus {
    outline: none;
  }
  
  &.${activeClassName} {
    background-color: ${btnHighlight};
    color: ${textColorActive};
    transition: all 0.2s ease-in-out;
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
    
    :hover {
      color: ${textColorLighten};
    }
  }
  
`;

const NavigationLink = (props) => {
  const {
    link, text, variant, theme, icon, direction, padding, fontSize, radius, className
  } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledLinkIcon
        exact
        className={className}
        variant={variant}
        to={link}
        direction={direction}
        padding={padding}
        fontSize={fontSize}
        radius={radius}
      >
        <i className="material-icons">
          {icon}
        </i>
        <span>
          {text}
        </span>
      </StyledLinkIcon>
    </ThemeProvider>
  );
};

NavigationLink.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary'])
};

NavigationLink.defaultProps = {
  variant: 'primary'
};

NavigationLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  variant: PropTypes.string,
  padding: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  radius: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string
};

export default NavigationLink;
