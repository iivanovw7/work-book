import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { opacify } from 'polished';
import ListElementDescription from './Description';
import ListElementDetails from './Details';
import { fadeInTop } from '../../../styles';
import { gridConfig } from '../../../config';
/* eslint no-underscore-dangle: 0 */

const Wrapper = styled.div`
	@media screen and (max-width: ${gridConfig.container.md}rem) {
 		flex-direction: column;
 		
  	>div:first-of-type, >div:last-of-type {
  	  width: 100%;
  	}
  }
  
  @media screen and (min-width: ${gridConfig.container.md}rem) {
  	flex-direction: row;
  	
  	>div:first-of-type {
  		width: 70%;
  	}
  	
  	>div:last-of-type {
  		width: 30%;
  		display: flex;
  		flex-direction: column;
  		justify-content: space-between;
  	}
  }
  
  ${fadeInTop};
  display: flex;
	flex-wrap: no-wrap;
	justify-content: space-between;
	user-select: none;
	margin: 0.5em 0 0.5em 0;
	padding: 0.7em;
	border-radius: 0.2em;
	background-color: ${opacify('0.01', 'rgba(25, 0, 0, 0.1)')};
	
	>div:first-of-type {
		flex-wrap: nowrap;
    overflow-wrap: break-word;
	}
	
	>div:last-of-type {
		text-align: right;
		align-items: flex-end;
	}
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  margin-top: 1em;
`;

const ListElementContainer = (props) => {
  return (
    <Wrapper>
      <ListElementDescription
        TagsContainer={TagsContainer}
        {...props}
      />
      <ListElementDetails
        TagsContainer={TagsContainer}
        {...props}
      />
    </Wrapper>
  );
};

ListElementContainer.propTypes = {
  est: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired
};

export default ListElementContainer;
