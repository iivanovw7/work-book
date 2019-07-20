import Cookies from 'js-cookie';

export default (store) => {
	const previousTheme = Cookies.get('theme');
	const verifiedPreviousTheme = previousTheme === 'dark' ? 'dark' : 'light';

	store.on('@init', () => ({ theme: verifiedPreviousTheme }));
	store.on('switch', ({ theme }) => {
		if (theme === 'dark') {
			Cookies.set('theme', 'light');
			return ({ theme: 'light' });
		}
		Cookies.set('theme', 'dark');
		return ({ theme: 'dark' });
	});
};
