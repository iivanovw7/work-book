import PropTypes from 'prop-types';
import React from 'react';
import CreatePost from '../queryBlocks/CreatePost';
import QueryPost from '../queryBlocks/QueryPost';
import UpdatePost from '../queryBlocks/UpdatePost';

// Returns selected queryBlock according to location (pathName) prop
const SwitchedPostComponent = (props) => {
	const {
		location, locale, text, theme
	} = props;
	const pathName = location.pathname.split('/')[2];
	switch (pathName) {
		// Render CreatePost block
		case 'new':
			return <CreatePost locale={locale} text={text} theme={theme} {...props} />;

		// Render UpdatePost block
		case 'update':
			return (
				<UpdatePost id={location.pathname.split('/')[3]} locale={locale} text={text} {...props} />
			);

		// Default UpdatePost block
		default:
			return <QueryPost id={pathName} locale={locale} text={text} theme={theme} {...props} />;
	}
};

export default SwitchedPostComponent;

SwitchedPostComponent.propTypes = {
	locale: PropTypes.string.isRequired,
	location: PropTypes.object.isRequired,
	text: PropTypes.object.isRequired,
	theme: PropTypes.string.isRequired
};
