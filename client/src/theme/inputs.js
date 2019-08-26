import { css } from 'styled-components';
import theme from 'styled-theming';
import { colorScheme } from '../config';

// Styling text inputs
export const inputsBackground = theme('mode', {
  dark: css`
    background-color: ${colorScheme.dark.textInputBgColor};
    color: ${colorScheme.dark.textInputColor};
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px ${colorScheme.dark.textInputBgColor} inset !important;
    }
  
    &:-webkit-autofill {
      -webkit-text-fill-color: ${colorScheme.dark.textInputColor} !important;
    }
  `,
  light: css`
    background-color: ${colorScheme.light.textInputBgColor};
    color: ${colorScheme.light.textInputColor};
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px ${colorScheme.light.textInputBgColor} inset !important;
    }
  
    &:-webkit-autofill {
      -webkit-text-fill-color: ${colorScheme.light.textInputColor} !important;
    }
  `
});
