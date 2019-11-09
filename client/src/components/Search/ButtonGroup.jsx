import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { colorScheme } from '../../config';
import Button from '../UI/Button';
import TagButton from '../UI/TagButton';
import * as utils from '../../utils';
/* eslint no-underscore-dangle: 0 */

const StyledPostDescription = styled.div`
	display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-content: center;
  justify-content: space-between;
  
  >div:last-of-type {
  	justify-content: flex-end;
  }
`;

const ButtonGroup = (props) => {
  const {
    theme, locale, text, query, post, handlePostClick, handleTagClick
  } = props;
  const colorIndex = utils.setColorIndex(query.length, colorScheme.tagBtnBgColors);
  const date = post.created.toString();

  return (
    <StyledPostDescription>
      <div>
        <h3 className="dates">
          {moment(date, 'x')
            .format('MMMM DD, YYYY')}
        </h3>
        <Button
          variant="primary"
          text={text.navigation.readMore[locale]}
          theme={theme}
          maxWidth="10em"
          handleClick={(e) => {
            e.preventDefault();
            handlePostClick(post._id);
          }}
        />
      </div>
      <TagButton
        text={query}
        theme={theme}
        label={text.search.query[locale]}
        bgColor={colorScheme.tagBtnBgColors[colorIndex]}
        textColor={colorScheme.tagBtnTextColors[colorIndex]}
        handleClick={(e) => {
          e.preventDefault();
          handleTagClick();
        }}
      />
    </StyledPostDescription>
  );
};

ButtonGroup.propTypes = {
  locale: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  handlePostClick: PropTypes.func.isRequired,
  handleTagClick: PropTypes.func.isRequired
};

export default ButtonGroup;
