import PropTypes from 'prop-types';
import React from 'react';

const ViewElement = (props) => {
	const { title, value } = props;

	return (
		<p>
			<strong>
				{title}
				{': '}
			</strong>
			{value}
		</p>
	);
};

export default ViewElement;

ViewElement.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired
};
