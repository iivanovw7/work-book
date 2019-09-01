import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ListItem from '../../elements/UI/LIstElement';
/* eslint no-underscore-dangle: 0 */
/* eslint react/require-default-props: 0 */

const List = styled.ul`
  text-decoration: none;
  list-style-type: none;
  margin-bottom: 0;
`;

const PostStyleGuide = (props) => {
  const { theme, variant, locale } = props;

  return (
    <List>
      <ListItem
        theme={theme}
        variant={variant}
        fontSize="0.6em"
        text={'<a target=\\"_blank\\" href="https://URL">Link</a>'}
        description="to insert link in post."
        locale={locale}
      />
      <ListItem
        theme={theme}
        variant={variant}
        fontSize="0.6em"
        text={'<code>text</code>'}
        description="to set background for text."
        locale={locale}
      />
      <ListItem
        theme={theme}
        variant={variant}
        fontSize="0.6em"
        text={'<pre class="prettyprint">code</pre>'}
        description="to create a code sample."
        locale={locale}
      />
      <ListItem
        theme={theme}
        variant={variant}
        fontSize="0.6em"
        text={'&lt; or &gt;'}
        description="to set < or > in code sample"
        locale={locale}
      />
    </List>
  );
};

PostStyleGuide.propTypes = {
  variant: PropTypes.string,
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired
};

export default PostStyleGuide;
