import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
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
  color: red;
`;

const StyledLabel = styled.label`
  width: 100%;
  margin-top: 2em;
`;

const Input = (props) => {
  const inputRef = React.createRef();
  const {
    label, validate, id, type
  } = props;

  return (
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
      <StyledInput theme={{ mode: 'dark' }} type={type} id={id} {...props} />
    </StyledLabel>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  validate: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Input;
