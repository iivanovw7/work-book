import { darken, lighten, opacify } from 'polished';
import theme from 'styled-theming';
import { colorScheme } from '../config';

export const backgroundColor = theme('mode', {
  dark: `${colorScheme.dark.main_bg}`,
  light: `${colorScheme.light.main_bg}`
});

// export const backgroundInverseOpacified = theme('mode', {
//   dark: opacify('0.001', 'rgba(255, 0, 0, 0.2)'),
//   light: opacify('0.001', 'rgba(255, 0, 0, 0.2)')
// });

export const backgroundColorInverse = theme('mode', {
  light: `${colorScheme.dark.main_bg}`,
  dark: `${colorScheme.light.main_bg}`
});

export const appBarColor = theme('mode', {
  dark: `${colorScheme.dark.appBar_bg}`,
  light: `${colorScheme.light.appBar_bg}`
});

export const topBarColor = theme('mode', {
  dark: `${colorScheme.dark.appBar_bg}`,
  light: lighten(0.2, colorScheme.dark.appBar_bg)
});

export const backgroundColorDarken = theme('mode', {
  dark: darken(0.05, colorScheme.dark.main_bg),
  light: darken(0.05, colorScheme.light.main_bg)
});
