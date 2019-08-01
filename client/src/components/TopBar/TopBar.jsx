import PropTypes from 'prop-types';
import React from 'react';
import useStoreon from 'storeon/react';
import styled from 'styled-components';
import SvgButton from '../../elements/UI/SvgButton';
import { stylesConfig } from '../../config';
import { topBarColor, textColor } from '../../theme';
import IconEng from '../../assets/img/eng.svg';
import IconRus from '../../assets/img/rus.svg';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const TopBarWrapper = styled.nav`
  width: 100%;
  position: fixed;
  display: flex;
  top: 0;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: ${stylesConfig.topBarHeight};
  background-color: ${topBarColor};
  padding: 0.1em 1em 0.1em 1em;
  color: ${textColor};
  z-index: 100;
`;

const TopBar = (props) => {
  const { locale, text } = props;
  const { dispatch } = useStoreon();

  return (
    <TopBarWrapper>
      <SvgButton
        Image={text.locales[locale] === 'eng' ? IconRus : IconEng}
        text={text.locales[locale]}
        variant="primary"
        width="25px"
        height="15px"
        handleClick={() => {
          dispatch('changeLocale');
        }}
      />
    </TopBarWrapper>
  );
};

TopBar.propTypes = {
  locale: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired
};

export default TopBar;
