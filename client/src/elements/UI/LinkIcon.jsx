import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { btnBackground, btnLighten } from '../../theme';
/* eslint react/require-default-props: 0 */

const StyledLinkIcon = styled.a`
  display: flex;
  flex-wrap: nowrap;
  padding: 1rem 1rem 1rem 1rem;
  text-align: center;
  flex-direction: row;
  color: ${btnBackground};
  align-items: center;
  text-decoration: none;
  
  &:hover {
    color: ${btnLighten};
    transition: all 0.2s ease-in-out;
    user-select: none;
    cursor: pointer;
  }
  
  span:first-of-type {
  	margin-left: 0.6em;
  }
`;

const LinkIcon = (props) => {
	const {
		link, text, icon, variant, handleClick, theme
	} = props;

	return (
		<ThemeProvider theme={{ mode: theme }}>
			<StyledLinkIcon variant={variant} href={link} onClick={handleClick}>
				<i className="material-icons">
					{icon}
				</i>
				<span>
					{text}
				</span>
			</StyledLinkIcon>
		</ThemeProvider>
	);
};

StyledLinkIcon.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary'])
};

StyledLinkIcon.defaultProps = {
	variant: 'primary'
};

LinkIcon.propTypes = {
	text: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	variant: PropTypes.string.isRequired,
	theme: PropTypes.string.isRequired,
	handleClick: PropTypes.func
};

export default LinkIcon;
