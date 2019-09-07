import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ripples } from '../../styles';
/* eslint react/require-default-props: 0 */

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-wrap: wrap;
	font-size: 0.8em;
	outline: none;
`;

const Button = styled.button`
	${ripples};
  float: none;
  display: inline-block;
  border-radius: 0.2em;
  border: 0;
  outline: none;
  margin: ${props => (props.margin ? props.margin : '0.2em')};
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  text-decoration: none;
  
  &:hover {
    user-select: none;
    cursor: pointer;
    outline: none;
    border: 0;
  }
  
  &:focus {
    outline: none;
    border: 0;
  }
  
  &::-moz-focus-inner {
    border: 0;
  }

`;

const TagButton = (props) => {
  const {
    handleClick, text, bgColor, textColor, theme, label, margin
  } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledWrapper className="dates">
        {label}
        <Button
          margin={margin}
          onClick={handleClick}
          bgColor={bgColor}
          textColor={textColor}
          {...props}
        >
          {text}
        </Button>
      </StyledWrapper>
    </ThemeProvider>
  );
};

TagButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  label: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  margin: PropTypes.string
};

export default TagButton;
