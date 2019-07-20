import React from 'react';
import uuid from 'uuid/v1';
import TagButton from '../../elements/UI/TagButton';
import * as utils from '../../utils';
import { colorScheme } from '../../config';
/* eslint no-underscore-dangle: 0 */

export const TagsCloud = (props) => {
	const { data, postTags } = props;
	const tags = postTags ? utils.words(data.getPost.tags[0]) : data.getTags;

	return (tags.map((tag) => {
		const colorIndex = utils.getRandomInt(0, colorScheme.tagBtnBgColors.length);

		return (
			<TagButton
				key={uuid()}
				text={tag}
				bgColor={colorScheme.tagBtnBgColors[colorIndex]}
				textColor={colorScheme.tagBtnTextColors[colorIndex]}
				handleClick={() => {
					console.log('tag clicked!');
				}}
			/>
		);
	}));
};
