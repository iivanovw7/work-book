import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ListItem from '../UI/LIstElement';
/* eslint no-underscore-dangle: 0 */
/* eslint react/require-default-props: 0 */

const List = styled.ul`
  text-decoration: none;
  list-style-type: none;
  margin-bottom: 0;
`;

const PostStyleGuide = (props) => {
  const { theme, variant, locale } = props;
  const elements = [
    {
      text: '<a target=\\"_blank\\" href="https://URL">Link</a>',
      description: 'to insert link in post.'
    },
    {
      text: '<code>text</code>',
      description: 'to set background for text.'
    },
    {
      text: '<pre class="prettyprint">code</pre>',
      description: 'to create a code sample.'
    },
    {
      text: '&lt; or &gt;',
      description: 'to set < or > in code sample'
    }
  ];

  return (
    <List>
      {elements.map(element => (
        <ListItem
          key={element.text}
          theme={theme}
          variant={variant}
          fontSize="0.6em"
          text={element.text}
          description={element.description}
          locale={locale}
        />
      ))}
    </List>
  );
};

PostStyleGuide.propTypes = {
  variant: PropTypes.string,
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired
};

export default PostStyleGuide;
