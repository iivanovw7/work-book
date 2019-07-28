import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import SearchList from '../components/Search/SearchList';
import { ErrorMessage } from '../elements/errorMessage';
import { FIND_POSTS_BY_TAG } from '../graphql/queries';
import Spinner from '../elements/UI/Spinner';

const SearchPostsByTag = (props) => {
	const { history, tag, theme } = props;

	return (
		<Query
			query={FIND_POSTS_BY_TAG}
			variables={{ tag }}
			refetchQueries={() => [{
				query: FIND_POSTS_BY_TAG
			}]}
		>
			{({ loading, error, data }) => {
				if (loading) return <Spinner theme={theme} />;
				if (error) {
					return (
						<ErrorMessage
							theme={props.theme}
							text="Back"
							message="Error =( Try again later..."
							handleClick={() => {
								history.push('/');
							}}
						/>
					);
				}
				return <SearchList data={data} query={tag} {...props} />;
			}}
		</Query>
	);
};

export default withRouter(SearchPostsByTag);

SearchPostsByTag.propTypes = {
	history: PropTypes.object.isRequired,
	theme: PropTypes.string.isRequired,
	tag: PropTypes.string.isRequired
};
