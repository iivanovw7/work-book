
// Returns default search string, and stores new search string
export default (store) => {
  store.on('@init', () => ({ search: '' }));
  // Reducers returns only changed part of the state
  store.on('search', (state, search) => ({ search }));
};
