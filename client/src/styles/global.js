import { createGlobalStyle } from 'styled-components';
import * as config from '../config';

import datesFont from '../assets/fonts/inconsolatalgc.ttf';
import baseFontPrimary from '../assets/fonts/Nunito-Regular.ttf';
import baseFontBackup from '../assets/fonts/Nunito-Regular.woff';

const { baseFontFamily, datesFontFamily } = config.typography;
const { topBarHeight, appBarHeight } = config.stylesConfig;
const { colorScheme, gridConfig } = config;

/**
 * Styles applied globally, for all themes and ui variants
 */

export const Global = createGlobalStyle`
 
  @font-face {
    font-family: ${datesFontFamily};
    src: local(${baseFontPrimary}),
         local(${baseFontBackup}),
         url('https://fonts.googleapis.com/css?family=Nunito+Sans');
  }
  
  @font-face {
    font-family: ${datesFontFamily};
    src: local(${datesFont}),
         url('https://fonts.googleapis.com/css?family=Inconsolata');
  }

	*, *:before, *:after {
		-moz-box-sizing: border-box;
  	-webkit-box-sizing: border-box;
  	box-sizing: border-box;
	}

	html {
		overflow-x: hidden;
  	scroll-behavior: smooth;
  	scrollbar-width: none;
  	-ms-overflow-style: none;  // Hide scrollbar on IE 10+
	}
 
	body {
		scroll-behavior: smooth;
  	font-family: ${baseFontFamily}, Fallback, sans-serif;
  	overflow-x: hidden;
  	padding: 0;
  	min-height: 100vh;
  	max-width: 100vw;
  	margin: 0 auto;
  	background-color: ${colorScheme.bodyBg};
	}
	
	body {
	  -ms-overflow-style: none;  // Hide scrollbar on IE 10+
	}
	
	body::-webkit-scrollbar {
    display: none;  // Hide scrollbar on Safari and Chrome
  }
	
	.dates, code {
		font-family: ${datesFontFamily}, Fallback, sans-serif;
	}
	
	.prettyprint {
		font-size: .7em;
	}
  
  @media screen and (min-width: ${gridConfig.breakpoints.md}em) {
  	html {
  		font-size: calc(11px + .5vw);
  	}
  	
    .container--controls {
      flex-direction: column;
    }
    
    .mobile {
      display: none;
    }
    
    .container {
    	min-height: calc(100vh - ${topBarHeight}px);
    	margin-top: calc(${topBarHeight}px);
    }
   
  }

  @media screen and (max-width: ${gridConfig.breakpoints.md}em) {
  	html {
  		font-size: calc(8px + .5vw);
  	}
    .container--controls {
      flex-direction: row;
    }
    .desktop {
      display: none;
    }
     .container {
    	min-height: calc(100vh - ${appBarHeight}px - ${topBarHeight}px);
    	margin-top: ${topBarHeight}px;
      margin-bottom: ${appBarHeight}px;
    }
  }
  
`;
