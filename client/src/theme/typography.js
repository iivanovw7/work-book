import { darken, lighten } from 'polished';
import theme from 'styled-theming';
import { colorScheme } from '../config';

export const textColor = theme('mode', {
  dark: `${colorScheme.dark_text_color}`,
  light: `${colorScheme.light_text_color}`
});

export const textColorInverse = theme('mode', {
  light: `${colorScheme.dark_text_color}`,
  dark: `${colorScheme.light_text_color}`
});

export const textColorLighten = theme('mode', {
  dark: lighten(0.2, colorScheme.dark_text_color),
  light: lighten(0.2, colorScheme.light_text_color)
});

export const textColorActive = theme('mode', {
  dark: lighten(0.2, colorScheme.dark_text_color),
  light: darken(0.2, colorScheme.light_text_color)
});
