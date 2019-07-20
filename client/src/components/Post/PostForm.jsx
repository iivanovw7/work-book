import { opacify } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Button from '../../elements/UI/Button';
import { Input } from '../../elements/UI/Input';
import { Textarea } from '../../elements/UI/Textarea';
import { useInput } from '../../utils/useInputHook';
/* eslint no-underscore-dangle: 0 */
/* eslint react/require-default-props: 0 */

const StyledForm = styled.form`
	display: flex;
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


export const PostForm = (props) => {
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
			<Input id="Title" type="text" label="Title" {...bindTitle} />
			<Input id="Subject" type="text" label="Subject" {...bindSubject} />
			<Textarea id="Text" type="text" label="Text" rows={40} {...bindPostText} />
			<Input id="Tags" type="text" label="Tags" {...bindTags} />
			<ButtonsContainer>
				<Button
					text={text.navigation.back[locale]}
					theme={theme}
					variant="primary"
					handleClick={() => {
						history.push('/');
					}}
				/>
				<Button
					text={text.navigation.save[locale]}
					variant="primary"
					theme={theme}
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
