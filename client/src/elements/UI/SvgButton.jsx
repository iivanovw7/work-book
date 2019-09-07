import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ripples } from '../../styles';
import { btnBackground, btnLighten } from '../../theme';
/* eslint react/require-default-props: 0 */

const StyledIconButton = styled.button`
	${ripples};
  display: flex;
  flex-wrap: nowrap;
  padding: 0.3rem;
  text-align: center;
  flex-direction: row;
  color: ${btnBackground};
  align-items: center;
  border: none;
  background: none;
  outline: none;
  
  &:hover {
    color: ${btnLighten};
    transition: all 0.2s ease-in-out;
    user-select: none;
    cursor: pointer;
  }
  
  &:focus {
    outline: none;
  }
  
  &::-moz-focus-inner {
    border: 0;
  }

`;

const SvgButton = (props) => {
  const {
    Image, variant, handleClick, text, width, height
  } = props;

  return (
    <ThemeProvider theme={{ mode: 'dark' }}>
      <StyledIconButton variant={variant} onClick={handleClick}>
        <Image width={width} height={height} alt={text} />
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

SvgButton.propTypes = {
  handleClick: PropTypes.func,
  Image: PropTypes.any.isRequired,
  variant: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default SvgButton;
