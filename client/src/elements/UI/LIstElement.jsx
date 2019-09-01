import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { typography } from '../../config';
import { btnBackground, textColorInverse } from '../../theme';
/* eslint react/require-default-props: 0 */

const StyledListItem = styled.li`
  font-family: ${typography.baseFontFamily};
  font-size: ${props => props.fontSize};
  margin: 0.3em;
  
  >span:first-of-type {
    background-color: ${btnBackground};
    color: ${textColorInverse};
  }
  
  >span:last-of>type {
    color: ${textColorInverse};
  }
  
`;

const ListItem = (props) => {
  const {
    theme, text, description, variant, fontSize
  } = props;

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <StyledListItem variant={variant} fontSize={fontSize}>
        <span>
          {text}
        </span>
        {' - '}
        <span>
          {description}
        </span>
      </StyledListItem>
    </ThemeProvider>
  );
};

StyledListItem.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary'])
};

StyledListItem.defaultProps = {
  variant: 'primary'
};

ListItem.propTypes = {
  theme: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  description: PropTypes.string,
  fontSize: PropTypes.string.isRequired,
  variant: PropTypes.string
};

export default ListItem;
