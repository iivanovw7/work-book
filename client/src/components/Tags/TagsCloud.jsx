import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid/v1';
import TagButton from '../../elements/UI/TagButton';
import * as utils from '../../utils';
import { colorScheme } from '../../config';
/* eslint no-underscore-dangle: 0 */

const TagsCloud = (props) => {
  const {
    data, postTags, history, theme
  } = props;
  const tags = postTags ? utils.words(data.getPost.tags[0]) : data.getTags;

  return (tags.map((tag) => {
    const colorIndex = utils.getRandomInt(0, colorScheme.tagBtnBgColors.length);

    function handleClick() {
      history.push(`/search/${tag}`);
    }

    return (
      <TagButton
        key={uuid()}
        text={tag}
        theme={theme}
        bgColor={colorScheme.tagBtnBgColors[colorIndex]}
        textColor={colorScheme.tagBtnTextColors[colorIndex]}
        handleClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      />
    );
  }));
};

TagsCloud.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired
};

export default TagsCloud;
