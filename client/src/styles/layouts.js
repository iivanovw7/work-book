import { css } from 'styled-components';
import { gridConfig } from '../config';

export const wrapper = css`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
  flex-wrap: no-wrap;
  padding: 1em;
  
  @media screen and (min-width: ${gridConfig.breakpoints.md}em) {
   	flex-direction: row;
    justify-content: flex-start;
  }
  
  @media screen and (max-width: ${gridConfig.breakpoints.md}em) {
    flex-direction: column;
    justify-content: center;
  }
  
`;

export const aside = css`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  
  @media screen and (min-width: ${gridConfig.breakpoints.md}em) {
   	max-width: 30%;
  }
  
  @media screen and (max-width: ${gridConfig.breakpoints.md}em) {
    max-width: 100%;
  }
`;

export const content = css`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  
  @media screen and (min-width: ${gridConfig.breakpoints.md}em) {
    margin-left: ${gridConfig.sidebarMaxWidth + gridConfig.sidebarGap}em;
    width: 100%;
    max-width: 100%;
  }
  
  @media screen and (max-width: ${gridConfig.breakpoints.md}em) {
    width: 100%;
    max-width: 100%;
  }
`;
