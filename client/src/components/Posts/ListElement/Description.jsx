import PropTypes from 'prop-types';
import React from 'react';
import Number from '../../UI/Number';
import TextLink from '../../UI/TextLink';
import TagsCloud from '../../Tags/TagsCloud';
/* eslint no-underscore-dangle: 0 */

const ListElementDescription = (props) => {
  const {
    theme, post, history, handleClick, TagsContainer, est
  } = props;
  const tags = post.tags[0];

  return (
    <div>
      <h2>
        <TextLink
          theme={theme}
          text={post.title}
          variant="secondary"
          link="/"
          handleClick={(e) => {
            e.preventDefault();
            handleClick(post._id);
          }}
        />
      </h2>
      <h4>{post.subject}</h4>
      <div className="mobile">
        <TagsContainer justifyContent="flex-start">
          <TagsCloud
            history={history}
            postTags
            tags={tags}
            margin="0.2em 0.2em 0.5em 0em"
            {...props}
          />
        </TagsContainer>
      </div>
      <Number
        variant="primary"
        value={est.minutes}
        label={est.ending}
        theme={theme}
      />
    </div>
  );
};

ListElementDescription.propTypes = {
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

export default ListElementDescription;
