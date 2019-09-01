import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { opacify } from 'polished';
import { fadeInTop } from '../../styles';
import { gridConfig } from '../../config';
import Button from '../../elements/UI/Button';
import Number from '../../elements/UI/Number';
import TextLink from '../../elements/UI/TextLink';
import TagsCloud from '../Tags/TagsCloud';
import * as utils from '../../utils';
/* eslint no-underscore-dangle: 0 */

const PostWrapper = styled.div`
	@media screen and (max-width: ${gridConfig.container.md}rem) {
 		flex-direction: column;
  	>div:first-of-type, >div:last-of-type {
  	width: 100%;
  	}
  }
  
  @media screen and (min-width: ${gridConfig.container.md}rem) {
  	flex-direction: row;
  	>div:first-of-type {
  		width: 70%;
  	}
  	
  	>div:last-of-type {
  		width: 30%;
  		display: flex;
  		flex-direction: column;
  		justify-content: space-between;
  	}
  }
  
  ${fadeInTop};
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
		align-items: flex-end;
	}
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  margin-top: 1em;
`;

const PostsList = (props) => {
  const {
    data, history, theme, locale, text
  } = props;

  function handleClick(id) {
    history.push(`/posts/${id}`);
  }

  return (data.getPosts.map((post) => {
    moment.locale(locale.slice(0, -1));
    const date = post.created.toString();
    const est = utils.calculateReadingTime(post.text.length, locale);

    return (
      <PostWrapper key={post._id}>
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
                data={data}
                history={history}
                postTags
                tags={post.tags[0]}
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
        <div className="desktop">
          <div>
            <h3 className="dates">
              {moment(date, 'x')
                .format('MMMM DD, YYYY')}
            </h3>
            <TagsContainer justifyContent="flex-end">
              <TagsCloud
                data={data}
                history={history}
                postTags
                tags={post.tags[0]}
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
      </PostWrapper>
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
