import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { opacify } from 'polished';
import Button from '../../elements/UI/Button';
import Input from '../../elements/UI/Input';
import TextArea from '../../elements/UI/TextArea';
import { useInput } from '../../utils/useInputHook';
import PostStyleGuide from './PostStyleGuide';
/* eslint no-underscore-dangle: 0 */
/* eslint react/require-default-props: 0 */

const StyledForm = styled.form`
	display: flex;
	transition: all 0.2s ease;
	flex-direction: column;
	align-items:flex-start;
	justify-content: center;
	
	code {
		color: red;
	}
`;

const ButtonsContainer = styled.div`
	width: 100%;
	margin-top: 1em;
	margin-bottom: 1em;
	display: flex;
	flex-direction: row;
	flex-wrap: no-wrap;
	justify-content: space-between;
	user-select: none;
	padding: 0.5rem;
	border-radius: 0.2em;
	background-color: ${opacify('0.01', 'rgba(25, 0, 0, 0.1)')};
`;


const PostForm = (props) => {
  const {
    history, addPost, updatePost, data, theme, locale, text
  } = props;
  const postData = (data ? data.getPost : {});
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput(postData.title || 'title');
  const { value: postText, bind: bindPostText, reset: resetPostText } = useInput(postData.text || 'text');
  const { value: subject, bind: bindSubject, reset: resetSubject } = useInput(postData.subject || 'subject');
  const { value: tags, bind: bindTags, reset: resetTags } = useInput(postData.tags || 'js,apollo,react');

  function resetForm() {
    resetTitle();
    resetPostText();
    resetSubject();
    resetTags();
  }

  const formVariables = {
    variables: {
      _id: postData ? postData._id : '',
      subject,
      text: postText,
      title,
      tags: postData ? tags : tags.split(',')
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    data ? updatePost(formVariables) : addPost(formVariables);
    resetForm();
    history.push('/posts');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        id={text.posts.create.title[locale]}
        type="text"
        label={text.posts.create.title[locale]}
        {...bindTitle}
      />
      <Input
        id={text.posts.create.subject[locale]}
        type="text"
        label={text.posts.create.subject[locale]}
        {...bindSubject}
      />
      <PostStyleGuide
        theme={theme}
        locale={locale}
        variant="primary"
      />
      <TextArea
        id={text.posts.create.textArea[locale]}
        type="text"
        label={text.posts.create.textArea[locale]}
        rows={40}
        {...bindPostText}
      />
      <Input
        id={text.posts.create.tags[locale]}
        type="text"
        label={text.posts.create.tags[locale]}
        {...bindTags}
      />
      <ButtonsContainer>
        <Button
          text={text.navigation.back[locale]}
          theme={theme}
          variant="primary"
          maxWidth="7em"
          handleClick={() => {
            history.push('/');
          }}
        />
        <Button
          text={text.navigation.save[locale]}
          variant="primary"
          theme={theme}
          maxWidth="7em"
          type="submit"
          value="Submit"
        />
      </ButtonsContainer>
    </StyledForm>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func,
  data: PropTypes.object,
  history: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  updatePost: PropTypes.func,
  locale: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired
};

export default PostForm;
