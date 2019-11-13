import PropTypes from 'prop-types';
import React from 'react';
import dayjs from 'dayjs';
import { opacify } from 'polished';
import styled from 'styled-components';
import Button from '../UI/Button';
import ViewElement from './UserViewElement';
import * as utils from '../../utils';
import * as constants from '../../constants';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const StyledWrapper = styled.article`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const StyledContainer = styled.div`
	margin: 1em;
	text-align: left;
  width: 100%;
`;

const StyledButtonContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: no-wrap;
	user-select: none;
	padding: 0.5rem;
	border-radius: 0.2em;
	background-color: ${opacify('0.01', 'rgba(25, 0, 0, 0.1)')};
`;

const UserView = (props) => {
  const {
    history, data, theme, locale, text
  } = props;
  dayjs.locale(locale.slice(0, -1));
  const user = data.getUser;
  const formattedDate = utils.convertUnixTimestamp(
    user.created,
    constants.TIMESTAMP_UNITS.MS,
    '{YYYY} MM-DDTHH:mm:ss SSS [Z] A'
  );

  function handleClick() {
    history.push('/');
  }

  return (
    <StyledWrapper key={user._id}>
      <StyledContainer>
        <h2>User</h2>
        <ViewElement title="Name" value={user.name} />
        <ViewElement title="Surname" value={user.surname} />
        <ViewElement title="Email" value={user.email} />
        <ViewElement title="Phone" value={user.phone} />
        <ViewElement title="Role" value={user.role} />
        <ViewElement
          title="Created"
          value={formattedDate}
        />
      </StyledContainer>
      <StyledButtonContainer>
        <Button
          variant="primary"
          text={text.navigation.back[locale]}
          theme={theme}
          maxWidth="7em"
          handleClick={() => {
            handleClick();
          }}
        />
      </StyledButtonContainer>
    </StyledWrapper>
  );
};

export default UserView;

UserView.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired
};
