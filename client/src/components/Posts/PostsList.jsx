import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { opacify } from 'polished';
import { gridConfig } from '../../config';
import Button from '../../elements/UI/Button';
import Number from '../../elements/UI/Number';
import TextLink from '../../elements/UI/TextLink';
import * as utils from '../../utils';
/* eslint no-underscore-dangle: 0 */

const PostsWrapper = styled.div`
	@media screen and (max-width: ${gridConfig.container.md}rem) {
 		flex-direction: column;
  	div:first-of-type, div:last-of-type {
  	width: 100%;
  	}
  }
  
  @media screen and (min-width: ${gridConfig.container.md}rem) {
  	flex-direction: row;
  	div:first-of-type {
  		width: 70%;
  	}
  	
  	div:last-of-type {
  		width: 30%;
  	}
  }
  
  display: flex;
	flex-wrap: no-wrap;
	justify-content: space-between;
	user-select: none;
	margin: 0.5em 0 0.5em 0;
	padding: 0.7em;
	border-radius: 0.2em;
	background-color: ${opacify('0.01', 'rgba(25, 0, 0, 0.1)')};
	
	>div:first-of-type {
		flex-wrap: nowrap;
    overflow-wrap: break-word;
	}
	
	>div:last-of-type {
		text-align: right;
	}
`;

const PostsList = (props) => {
  const {
    data, history, theme, locale, text
  } = props;

  function handleClick(id) {
    history.push(`/posts/${id}`);
  }

  return (data.getPosts.map((post) => {
    const date = post.created.toString();
    const est = utils.calculateReadingTime(post.text.length, locale);

    return (
      <PostsWrapper key={post._id}>
        <div>
          <h2>
            <TextLink
              theme={theme}
              text={post.title}
              variant="primary"
              link="/"
              handleClick={(e) => {
                e.preventDefault();
                handleClick(post._id);
              }}
            />
          </h2>
          <h3>{post.subject}</h3>
          <Number
            variant="primary"
            value={est.minutes}
            label={est.ending}
            theme={theme}
          />
        </div>
        <div className="desktop">
          <h3 className="dates">
            {moment(date, 'x')
              .format('MMMM DD, YYYY')}
          </h3>
          <Button
            variant="primary"
            text={text.navigation.readMore[locale]}
            theme={theme}
            handleClick={(e) => {
              e.preventDefault();
              handleClick(post._id);
            }}
          />
        </div>
      </PostsWrapper>
    );
  }));
};

export default PostsList;

PostsList.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired
};
