import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { inputsBackground } from '../../theme';
/* eslint react/require-default-props: 0 */

const StyledInput = styled.input`
  ${inputsBackground};
  padding: 0.5em;
  margin-top: 0.5em;
  border: none;
  border-radius: 3px;
  width: 100%;
`;

const StyledSpan = styled.span`
  font-size: 0.7em;
  color: red;
`;

const StyledLabel = styled.label`
  width: 100%;
  margin-top: 2em;
`;

const Input = (props) => {
  const inputRef = React.createRef();
  const {
    theme, label, validate, id, type, placeholder, onChange, value, onInput
  } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledLabel
        ref={inputRef}
        htmlFor={id}
        onMouseEnter={() => {
          inputRef.current.focus();
        }}
      >
        {label}
        {'  '}
        <StyledSpan>{validate}</StyledSpan>
        <StyledInput
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onInput={onInput}
          {...props}
        />
      </StyledLabel>
    </ThemeProvider>
  );
};

Input.propTypes = {
  theme: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validate: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onInput: PropTypes.func
};

export default Input;
