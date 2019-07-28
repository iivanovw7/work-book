import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ripples } from '../../styles';

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-wrap: wrap;
	font-size: 0.8em;
`;

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
		handleClick, text, bgColor, textColor, theme, label
	} = props;

	return (
		<ThemeProvider theme={{ mode: theme }}>
			<StyledWrapper className="dates">
				{label}
				<Button
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
	textColor: PropTypes.string
};

export default TagButton;
