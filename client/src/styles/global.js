import { createGlobalStyle } from 'styled-components';
import { stylesConfig, mdOffset, typography } from '../config';


/**
 * Styles applied globally, for all themes and ui variants
 */

export const Global = createGlobalStyle`

	@import url('https://fonts.googleapis.com/css?family=Inconsolata|Nunito+Sans');
	
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
  	font-family: ${typography.baseFontFamily};
  	overflow-x: hidden;
  	padding: 0;
  	min-height: 100vh;
  	max-width: 100vw;
  	margin: 0 auto;
	}
	
	body {
	  -ms-overflow-style: none;  // Hide scrollbar on IE 10+
	}
	
	body::-webkit-scrollbar {
    display: none;  // Hide scrollbar on Safari and Chrome
  }
	
	.dates, code {
		font-family: ${typography.timeDatesFontFamily};
	}
	
	.prettyprint {
		font-size: .7em;
	}
  
  @media screen and (min-width: ${mdOffset}rem) {
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
    	min-height: calc(100vh - ${stylesConfig.topBarHeight});
    	margin-top: calc(${stylesConfig.topBarHeight});
    }
   
  }

  @media screen and (max-width: ${mdOffset}rem) {
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
    	min-height: calc(100vh - ${stylesConfig.appBarHeight} - ${stylesConfig.topBarHeight});
    	margin-top: ${stylesConfig.topBarHeight};
      margin-bottom: ${stylesConfig.appBarHeight};
    }
  }
  
`;
