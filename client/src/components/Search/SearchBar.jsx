import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useStoreon from 'storeon/react';
import validate from 'validate.js';
import Input from '../../elements/UI/Input';
import * as utils from '../../utils';
/* eslint react/require-default-props: 0 */

const SearchBarContainer = styled.div`

`;

const SearchBar = (props) => {
  const {
    history, locale, theme, text
  } = props;
  const { dispatch } = useStoreon('search');
  const [queryValidation, setQueryValidation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = utils.useDebounce(searchTerm, 500);

  function validateInput() {
    const validationResult = validate({
      searchTerm
    }, utils.constraintsSearch);

    if (validationResult) {
      if (validationResult.searchTerm) {
        setQueryValidation(validationResult.searchTerm[0][locale]);
      } else {
        setQueryValidation('');
      }
    } else {
      setQueryValidation('');
    }

    return validationResult;
  }

  useEffect(() => {
    if (!validateInput() && debouncedSearchTerm) {
      dispatch('search', debouncedSearchTerm);
      history.push(`/search/${debouncedSearchTerm}`);
    }
  },
  [debouncedSearchTerm]);

  return (
    <SearchBarContainer>
      <Input
        label={text.search.bar.tooltip[locale]}
        id="keyword"
        type="text"
        theme={theme}
        validate={queryValidation}
        placeholder={text.search.bar.placeholder[locale]}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  history: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired
};
