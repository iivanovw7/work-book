import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ImageDark from '../../assets/img/dark.png';
import ImageLight from '../../assets/img/light.png';
import { switchBackgroundColor } from '../../theme';
/* eslint react/require-default-props: 0 */

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Wrapper = styled.label`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-top: 0.7em;
  width: 70px;
  height: 34px;
`;

const Slider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  transition: .4s;

  cursor: pointer;
  background-color: ${switchBackgroundColor};
  border-radius: 34px;

  &:before {
    z-index: 3;
    position: absolute;
    content: "";
    left: 4px;
    bottom: 4px;
  
    transition: .4s;

    height: 26px;
    width: 26px;
    background-color: white;
    border-radius: 50%;
    
    ${HiddenCheckbox}:focus + & {
      box-shadow: 0 0 1px #3B97D3;
    }

    ${HiddenCheckbox}:checked + & {
      transform: translateX(36px);
    }
  }
`;

export const StyledDiv = styled.div`
    z-index: 2;
    display: ${props => (props.themeSwitch ? 'block' : 'none')};
    position: absolute;
    content: "";
    left: ${props => (props.checked ? 6 : 40)}px;
    bottom: 6px;
    height: 23px;
    width: 23px;
    background-image: url(${props => props.img});
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;
`;

const Switch = (props) => {
  const {
    handleChange, checked, theme, themeSwitch
  } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <Wrapper>
        <HiddenCheckbox onChange={handleChange} checked={checked} />
        <Slider />
        <StyledDiv
          id="switchImgContainer"
          themeSwitch={themeSwitch}
          img={checked ? ImageDark : ImageLight}
          checked={checked}
        />
      </Wrapper>
    </ThemeProvider>
  );
};

Switch.propTypes = {
  handleChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  themeSwitch: PropTypes.bool.isRequired
};

export default Switch;
