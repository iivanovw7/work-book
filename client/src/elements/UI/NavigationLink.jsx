import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { ripples } from '../../styles';
import {
  btnHighlight, textColor, textColorActive, textColorLighten
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
  padding: ${props => props.padding};
  text-align: center;
  max-width: 48px;
  width: 100%;
  border-radius: ${props => props.borderRadius};
  flex-direction: ${props => props.direction};
  color: ${textColor};
  align-items: center;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  font-size: ${props => props.fontSize};
  
  &:hover {
    	color: ${textColorLighten};
    	transition: all 0.2s ease-in-out;
    	user-select: none;
    	cursor: pointer;
  }
  
  &.${activeClassName} {
    background-color: ${btnHighlight};
    color: ${textColorActive};
    transition: all 0.2s ease-in-out;
  }
  
`;

const NavigationLink = (props) => {
  const {
    link, text, variant, theme, highlight, icon, direction, padding, fontSize, radius
  } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledLinkIcon
        variant={variant}
        selected={highlight}
        exact
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
  highlight: PropTypes.bool.isRequired,
  icon: PropTypes.string
};

export default NavigationLink;
