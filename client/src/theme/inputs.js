import { css } from 'styled-components';
import theme from 'styled-theming';
import { colorScheme } from '../config';

// Styling text inputs
export const inputsBackground = theme('mode', {
  dark: css`
    background-color: ${colorScheme.dark_textInputBgColor};
    color: ${colorScheme.dark_textInputColor};
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px ${colorScheme.dark_textInputBgColor} inset !important;
    }
  
    &:-webkit-autofill {
      -webkit-text-fill-color: ${colorScheme.dark_textInputColor} !important;
    }
  `,
  light: css`
    background-color: ${colorScheme.light_textInputBgColor};
    color: ${colorScheme.light_textInputColor};
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px ${colorScheme.light_textInputBgColor} inset !important;
    }
  
    &:-webkit-autofill {
      -webkit-text-fill-color: ${colorScheme.light_textInputColor} !important;
    }
  `
});
