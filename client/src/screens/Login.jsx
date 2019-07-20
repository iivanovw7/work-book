import React from 'react';
import { withRouter } from 'react-router-dom';
import useStoreon from 'storeon/react';
import LoginForm from '../components/Login/LoginForm';
import TopBar from '../components/TopBar/TopBar';

const Login = (props) => {
	const { theme, locale, localizedText } = useStoreon('theme', 'locale', 'localizedText');

	return (
		<section>
			<TopBar locale={locale} text={localizedText} {...props} />
			<LoginForm locale={locale} text={localizedText} theme={theme} {...props} />
		</section>
	);
};

export default withRouter(Login);
