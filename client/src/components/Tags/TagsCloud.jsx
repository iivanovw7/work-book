import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid/v1';
import useStoreon from 'storeon/react';
import TagButton from '../../elements/UI/TagButton';
import * as utils from '../../utils';
import { colorScheme } from '../../config';
/* eslint react/require-default-props: 0 */
/* eslint no-underscore-dangle: 0 */

const TagsCloud = (props) => {
  const {
    data, postTags, history, theme, margin, tags
  } = props;

  const { dispatch } = useStoreon('search');
  const slittedTags = postTags ? utils.words(tags, ',') : data.getTags;

  return (slittedTags.map((tag) => {
    const colorIndex = utils.getRandomInt(0, colorScheme.tagBtnBgColors.length);

    function handleClick() {
      dispatch('search', '');
      history.push(`/search/${tag}`);
    }

    return (
      <TagButton
        key={uuid()}
        text={tag}
        theme={theme}
        margin={margin}
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
  theme: PropTypes.string.isRequired,
  tags: PropTypes.string,
  margin: PropTypes.string
};

export default TagsCloud;
