import { darken, lighten, opacify } from 'polished';
import theme from 'styled-theming';
import { colorScheme } from '../config';

export const backgroundColor = theme('mode', {
  dark: `${colorScheme.dark_main_bg}`,
  light: `${colorScheme.light_main_bg}`
});

// export const backgroundInverseOpacified = theme('mode', {
//   dark: opacify('0.001', 'rgba(255, 0, 0, 0.2)'),
//   light: opacify('0.001', 'rgba(255, 0, 0, 0.2)')
// });

export const backgroundColorInverse = theme('mode', {
  light: `${colorScheme.dark_main_bg}`,
  dark: `${colorScheme.light_main_bg}`
});

export const appBarColor = theme('mode', {
  dark: `${colorScheme.dark_appBar_bg}`,
  light: `${colorScheme.light_appBar_bg}`
});

export const topBarColor = theme('mode', {
  dark: `${colorScheme.dark_appBar_bg}`,
  light: lighten(0.2, colorScheme.dark_appBar_bg)
});

export const backgroundColorDarken = theme('mode', {
  dark: darken(0.05, colorScheme.dark_main_bg),
  light: darken(0.05, colorScheme.light_main_bg)
});
