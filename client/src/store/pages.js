import { PAGES } from '../constants';

// Returns pages SPA pages set, for UI elements
export default (store) => {
	store.on('@init', () => ({ pages: PAGES }));
};
