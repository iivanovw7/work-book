import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { debounce } from 'debounce';
import ListElementContainer from './ListElement/Container';
import { gridConfig, stylesConfig } from '../../config';
import * as utils from '../../utils';
/* eslint no-underscore-dangle: 0 */

const { appBarHeight, topBarHeight } = stylesConfig;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  @media screen and (max-width: ${gridConfig.container.md}rem) {
    padding-bottom: ${props => (props.hasMore ? `calc(2em + ${stylesConfig.appBarHeight}px)` : '0em')};
  }
  
  @media screen and (min-width: ${gridConfig.container.md}rem) {
    padding-bottom: ${props => (props.hasMore ? '5em' : '0em')};
  }
  
`;

const PostsList = (props) => {
  const {
    data, history, locale, atBottomHandler, hasMore, loading, loader
  } = props;
  const { posts } = data.getPosts;
  const [listHeight, setListHeight] = useState(0);
  const [listOffsetTop, setListOffsetTop] = useState(0);
  const listRef = useRef({});

  function setListSize() {
    if (listRef.current) {
      setListHeight(listRef.current.clientHeight);
      setListOffsetTop(listRef.current.offsetTop);
    }
  }

  const debouncedScrollHandler = debounce(() => {
    const windowScroll = window.scrollY + window.innerHeight;
    const listScroll = listHeight + listOffsetTop + appBarHeight + topBarHeight;
    const reachedBottom = (listScroll - windowScroll) <= 100;

    if (reachedBottom) {
      return atBottomHandler();
    }
  }, 200);

  useEffect(() => {
    setListSize();
  }, [debouncedScrollHandler]);

  function handleClick(id) {
    history.push(`/posts/${id}`);
  }

  utils.useEventListener('scroll', event => debouncedScrollHandler(event), window);

  return (
    <Container ref={listRef} hasMore={hasMore}>
      {posts.map((post) => {
        moment.locale(locale.slice(0, -1));
        const date = post.created.toString();
        const est = utils.calculateReadingTime(post.text.length, locale);

        return (
          <ListElementContainer
            key={post._id}
            post={post}
            date={date}
            est={est}
            handleClick={handleClick}
            {...props}
          />
        );
      })}
      {loading && (
        loader
      )}
    </Container>
  );
};

PostsList.propTypes = {
  atBottomHandler: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  hasMore: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  loader: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired
};

export default PostsList;
