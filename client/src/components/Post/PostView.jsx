import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled, { ThemeProvider } from 'styled-components';
import { opacify } from 'polished';
import ErrorMessage from '../../elements/errorMessage';
import Button from '../../elements/UI/Button';
import * as utils from '../../utils';
import { backgroundColorInverse, textColorInverse, linkColor } from '../../theme';
import DeletePost from '../../queryBlocks/DeletePost';
import TagsCloud from '../Tags/TagsCloud';
import TextLink from '../../elements/UI/TextLink';
/* eslint no-underscore-dangle: 0 */

const StyledPostContainer = styled.div`
	margin-bottom: 1em;
	
	code {
		background-color: ${backgroundColorInverse};
		opacity: 0.7;
		color: ${textColorInverse};
		padding: 0.1em;
	}
`;

const StyledText = styled.p`
	padding: 0.5rem;
	border-radius: 0.2em;
	background-color: ${opacify('0.01', 'rgba(25, 0, 0, 0.1)')};
	
	a {
	  color: ${linkColor};
	}
`;

const StyledTimeContainer = styled.p`
	font-size: 0.7em;
`;

const StyledButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: no-wrap;
	user-select: none;
	justify-content: space-between;
	padding: 0.5rem;
	border-radius: 0.2em;
	background-color: ${opacify('0.01', 'rgba(25, 0, 0, 0.1)')};
	
	div:first-of-type {
		display: flex;
		flex-direction: row;
	}
	
`;

const StyledTagsContainer = styled.div`
	display: flex;
`;

const PostView = (props) => {
  const {
    history, data, theme, locale, text
  } = props;
  const post = data.getPost;
  const date = post ? String(post.created) : 'Invalid date';
  const [userAccess, setUserAccess] = useState(false);
  const est = utils.calculateReadingTime(post.text.length, locale);

  useEffect(() => {
    const getAccessRights = async () => setUserAccess(await utils.checkUser());
    utils.runCodePrettify();
    getAccessRights()
      .catch(e => console.log(e));
  }, []);

  function handleClick(id) {
    history.push(`/posts/${id}`);
  }

  if (!data.getPost) {
    return (
      <ErrorMessage
        text="Back"
        theme={theme}
        message="Post not found!"
        handleClick={() => {
          history.push('/posts');
        }}
      />
    );
  }

  return (
    <ThemeProvider theme={{ mode: theme }} key={post._id}>
      <StyledPostContainer>
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
        <h3>
          {post.subject}
        </h3>
        <p className="dates">
          {moment(date, 'x')
            .format('DD MMM YYYY HH:MM A')}
        </p>
        <StyledTimeContainer className="dates">
          {est.minutes}
          {' '}
          {est.ending}
        </StyledTimeContainer>
        <StyledTagsContainer>
          <TagsCloud data={post.tags} tags={data.getPost.tags[0]} history={history} theme={theme} postTags {...props} />
        </StyledTagsContainer>
        <StyledText dangerouslySetInnerHTML={utils.sanitize(post.text)} />
        <StyledButtonsContainer>
          <Button
            variant="primary"
            text={text.navigation.back[locale]}
            theme={theme}
            maxWidth="7em"
            handleClick={() => {
              history.push('/');
            }}
          />
          <div>
            {userAccess && (
              <Button
                variant="primary"
                text={text.navigation.update[locale]}
                theme={theme}
                maxWidth="10em"
                handleClick={() => {
                  history.push(`/posts/update/${post._id}`);
                }}
              />
            )}
            {userAccess && (
              <DeletePost post={post} {...props} />
            )}
          </div>
        </StyledButtonsContainer>
      </StyledPostContainer>
    </ThemeProvider>
  );
};

export default PostView;

PostView.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired
};
