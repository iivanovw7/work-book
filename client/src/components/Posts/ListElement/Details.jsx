import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Button from '../../UI/Button';
import TagsCloud from '../../Tags/TagsCloud';
/* eslint no-underscore-dangle: 0 */

const StyledTimeContainer = styled.p`
	font-size: 0.9em;
	max-height: 1em;
`;

const ListElementDetails = (props) => {
  const {
    theme, date, post, history, locale, handleClick, text, TagsContainer
  } = props;
  const tags = post.tags[0];

  return (
    <div className="desktop">
      <div>
        <StyledTimeContainer className="dates">
          {moment(date, 'x')
            .format('MMMM DD, YYYY')}
        </StyledTimeContainer>
        <TagsContainer justifyContent="flex-end">
          <TagsCloud
            history={history}
            postTags
            tags={tags}
            margin="0.2em"
            {...props}
          />
        </TagsContainer>
      </div>
      <Button
        variant="primary"
        text={text.navigation.readMore[locale]}
        theme={theme}
        maxWidth="10em"
        handleClick={(e) => {
          e.preventDefault();
          handleClick(post._id);
        }}
      />
    </div>
  );
};

ListElementDetails.propTypes = {
  est: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  TagsContainer: PropTypes.object.isRequired
};

export default ListElementDetails;
