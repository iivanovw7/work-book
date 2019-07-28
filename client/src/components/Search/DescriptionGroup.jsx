import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { colorScheme } from '../../config';
import Number from '../../elements/UI/Number';
import TagButton from '../../elements/UI/TagButton';
import * as utils from '../../utils';

const StyledBottomContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const DescriptionGroup = (props) => {
	const {
		theme, query, handleTagClick, post, locale
	} = props;

	const est = utils.calculateReadingTime(post.text.length, locale);
	const colorIndex = utils.getRandomInt(0, colorScheme.tagBtnBgColors.length);

	return (
		<StyledBottomContainer>
			<Number
				variant="primary"
				value={est.minutes}
				label={est.ending}
				theme={theme}
			/>
			<div className="mobile">
				<TagButton
					text={query}
					theme={theme}
					bgColor={colorScheme.tagBtnBgColors[colorIndex]}
					textColor={colorScheme.tagBtnTextColors[colorIndex]}
					handleClick={(e) => {
						e.preventDefault();
						handleTagClick();
					}}
				/>
			</div>
		</StyledBottomContainer>
	);
};

export default DescriptionGroup;

DescriptionGroup.propTypes = {
	theme: PropTypes.string.isRequired,
	query: PropTypes.string.isRequired,
	post: PropTypes.object.isRequired,
	handleTagClick: PropTypes.func.isRequired,
	locale: PropTypes.string.isRequired
};
