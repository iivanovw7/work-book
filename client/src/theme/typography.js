import { darken, lighten } from 'polished';
import theme from 'styled-theming';
import { colorScheme } from '../config';

export const textColor = theme('mode', {
  dark: `${colorScheme.dark.text_color}`,
  light: `${colorScheme.light.text_color}`
});

export const textColorInverse = theme('mode', {
  light: `${colorScheme.dark.text_color}`,
  dark: `${colorScheme.light.text_color}`
});

export const textLinkColor = theme.variants('mode', 'variant', {
  primary: {
    dark: `${colorScheme.dark.text_color}`,
    light: `${colorScheme.light.text_color}`
  },
  secondary: {
    dark: `${colorScheme.dark.colorSecondary}`,
    light: `${colorScheme.light.colorPrimary}`
  }
});

export const textColorLighten = theme('mode', {
  dark: lighten(0.2, colorScheme.dark.text_color),
  light: lighten(0.2, colorScheme.light.text_color)
});

export const textColorActive = theme('mode', {
  dark: lighten(0.2, colorScheme.dark.text_color),
  light: darken(0.2, colorScheme.light.text_color)
});

export const textLinkColorLighten = theme.variants('mode', 'variant', {
  primary: {
    dark: lighten(0.2, colorScheme.dark.text_color),
    light: lighten(0.2, colorScheme.light.text_color)
  },
  secondary: {
    dark: lighten(0.2, colorScheme.dark.colorSecondary),
    light: lighten(0.2, colorScheme.light.colorPrimary)
  }
});
