import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { textLinkColor, textLinkColorLighten } from '../../theme';
/* eslint react/require-default-props: 0 */

const StyledTextLink = styled.a`
  color: ${textLinkColor};
  text-decoration: none;
  
  &:hover {
    color: ${textLinkColorLighten};
    transition: all 0.2s ease-in-out;
    user-select: none;
    cursor: pointer;
    outline: none;
  }
  
  &:focus {
    outline: none;
  }
  
`;

const TextLink = (props) => {
  const {
    link, text, variant, handleClick, theme
  } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledTextLink variant={variant} href={link} onClick={handleClick}>
        {text}
      </StyledTextLink>
    </ThemeProvider>
  );
};

StyledTextLink.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary'])
};

StyledTextLink.defaultProps = {
  variant: 'primary'
};

TextLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  handleClick: PropTypes.func
};

export default TextLink;
