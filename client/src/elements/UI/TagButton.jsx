import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { ripples } from '../../styles';

const Button = styled.button`
	${ripples};
  float: none;
  display: inline-block;
  border-radius: 0.2em;
  border: 0;
  outline: 0;
  margin: 0.2em;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor}
  
  &:hover {
    user-select: none;
    cursor: pointer;
  }
`;

const TagButton = (props) => {
	const {
		handleClick, text, bgColor, textColor
	} = props;

	return (
		<Button
			onClick={handleClick}
			bgColor={bgColor}
			textColor={textColor}
			{...props}
		>
			{text}
		</Button>
	);
};

TagButton.propTypes = {
	handleClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	bgColor: PropTypes.string,
	textColor: PropTypes.string
};

export default TagButton;
