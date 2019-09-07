import { darken, lighten } from 'polished';
import theme from 'styled-theming';
import { colorScheme } from '../config';

export const backgroundColor = theme('mode', {
  dark: `${colorScheme.dark.main_bg}`,
  light: `${colorScheme.light.main_bg}`
});

export const spinnerBackground = theme('mode', {
  dark: lighten(0.2, colorScheme.dark.main_bg),
  light: darken(0.2, colorScheme.light.main_bg)
});

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
