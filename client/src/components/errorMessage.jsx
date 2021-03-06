import PropTypes from 'prop-types';
import React from 'react';
import Button from './UI/Button';

const ErrorMessage = (props) => {
  const {
    handleClick, text, message, theme
  } = props;

  return (
    <div>
      <p style={{ color: 'red' }}>{message}</p>
      <Button
        variant="primary"
        text={text}
        theme={theme}
        maxWidth="7em"
        handleClick={handleClick}
      />
    </div>
  );
};

ErrorMessage.propTypes = {
  handleClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
};

export default ErrorMessage;
