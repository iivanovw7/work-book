import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import validate from 'validate.js';
import Button from '../UI/Button';
import Input from '../UI/Input';
import * as utils from '../../utils';
import { textColor, backgroundColorDarken } from '../../theme';

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const StyledForm = styled.form`
  transition: all 0.2s ease;
	position: absolute;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  padding: 2em;
  background-color: ${backgroundColorDarken};
  color: ${textColor};
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 10px 20px rgba(0,0,0,0.24);

  @media (min-width: 736px) and (max-width: 1157px) {
  	left: 15%;
    right: 15%;
    top: 15%;
    width: 400px;
    height: 380px;
  }
  
  @media (min-width: 1157px) {
  	left: 25%;
    right: 25%;
    top: 15%;
    width: 400px;
    height: 380px;
  }
  
  @media (max-width: 736px) {
  	left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    max-height: 100%;
  }
  
  div {
    width: 100%;
  }
  
`;

const LoginForm = (props) => {
  const {
    history, theme, locale, text
  } = props;
  const [response, setResponse] = useState({ success: false, message: '' });
  const [emailValidation, setEmailValidation] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const { value: email, bind: bindEmail, reset: resetEmail } = utils.useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = utils.useInput('');
  const [userAccess, setUserAccess] = useState(false);

  // Checking current user access rights every time route has been called
  useEffect(() => {
    if (utils.ifTokenExists()) {
      const getAccessRights = async () => setUserAccess(await utils.checkUser());
      getAccessRights()
        .catch(e => console.log(e));
    }
  }, []);

  function validateInput() {
    const validationResult = validate({
      email,
      password
    }, utils.constraintsLogin);

    if (validationResult) {
      if (validationResult.email) {
        setEmailValidation(validationResult.email[0][locale]);
      } else {
        setEmailValidation('');
      }
      if (validationResult.password) {
        setPasswordValidation(validationResult.password[0][locale]);
      } else {
        setPasswordValidation('');
      }
    } else {
      setEmailValidation('');
      setPasswordValidation('');
    }

    return validationResult;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponse('');
    if (!validateInput()) {
      const loginResult = await utils.loginUser(email, password, locale, text);
      resetEmail();
      resetPassword();
      if (loginResult) {
        setResponse(loginResult);
        if (loginResult.success) {
          history.push('/');
        }
      }
    }
  };

  if (userAccess) {
    return <Redirect to="/" />;
  }

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <Row>
        <StyledForm onSubmit={handleSubmit}>
          <Col>
            <Input
              id="email"
              type="text"
              label="Email"
              validate={emailValidation}
              theme={theme}
              {...bindEmail}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              validate={passwordValidation}
              theme={theme}
              {...bindPassword}
            />
            <p style={{ height: '30px', color: response.success ? 'green' : 'red' }}>
              {response.message}
            </p>
          </Col>
          <Col>
            <Row>
              <Button
                text={text.login.loginButtonText[locale]}
                type="submit"
                theme={theme}
                value="Submit"
                maxWidth="7em"
                variant="primary"
              />
              <Button
                text={text.login.homeButtonText[locale]}
                theme={theme}
                variant="primary"
                maxWidth="7em"
                handleClick={() => {
                  history.push('/');
                }}
              />
            </Row>
          </Col>
        </StyledForm>
      </Row>
    </ThemeProvider>
  );
};

export default withRouter(LoginForm);

LoginForm.propTypes = {
  history: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired
};
