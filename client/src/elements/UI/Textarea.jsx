import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { inputsBackground } from '../../theme';
/* eslint react/require-default-props: 0 */

const StyledInput = styled.textarea` 
  ${inputsBackground};
  padding: 0.5em;
  margin-top: 0.5em;
  border: none;
  border-radius: 3px;
  width: 100%;
  resize: vertical;
`;

const StyledSpan = styled.span`
  color: red;
`;

const StyledLabel = styled.label`
  width: 100%;
  margin-top: 2em;
`;

export const Textarea = (props) => {
	const inputRef = React.createRef();
	const {
		label, validate, id, type, rows
	} = props;

	return (
		<StyledLabel
			ref={inputRef}
			htmlFor={id}
			rows={rows}
			onMouseEnter={() => {
				inputRef.current.focus();
			}}
		>
			{label}
			{'  '}
			<StyledSpan>{validate}</StyledSpan>
			<StyledInput theme={{ mode: 'dark' }} type={type} id={id} {...props} />
		</StyledLabel>
	);
};

Textarea.propTypes = {
	label: PropTypes.string.isRequired,
	validate: PropTypes.string,
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired
};
