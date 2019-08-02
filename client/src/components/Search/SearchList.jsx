import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { opacify } from 'polished';
import { fadeInTop } from '../../styles';
import { gridConfig } from '../../config';
import TextLink from '../../elements/UI/TextLink';
import ButtonGroup from './ButtonGroup';
import DescriptionGroup from './DescriptionGroup';
/* eslint no-underscore-dangle: 0 */

const SearchWrapper = styled.div`
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
	}
`;

const SearchList = (props) => {
  const {
    data, history, theme, locale, text, query
  } = props;

  function handlePostClick(id) {
    history.push(`/posts/${id}`);
  }

  function handleTagClick() {
    history.push(`/search/${query}`);
  }

  return (data.findPostsByTag.map(post => (
    <SearchWrapper key={post._id}>
      <div>
        <h2>
          <TextLink
            theme={theme}
            text={post.title}
            variant="primary"
            link="/"
            handleClick={(e) => {
              e.preventDefault();
              handlePostClick(post._id);
            }}
          />
        </h2>
        <h3>{post.subject}</h3>
        <DescriptionGroup
          post={post}
          theme={theme}
          query={query}
          handleTagClick={handleTagClick}
          locale={locale}
        />
      </div>
      <div className="desktop">
        <ButtonGroup
          post={post}
          text={text}
          theme={theme}
          query={query}
          handleTagClick={handleTagClick}
          handlePostClick={handlePostClick}
          locale={locale}
        />
      </div>
    </SearchWrapper>
  )));
};

export default SearchList;

SearchList.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired
};
