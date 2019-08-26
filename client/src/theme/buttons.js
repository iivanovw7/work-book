import { lighten, transparentize } from 'polished';
import theme from 'styled-theming';
import { colorScheme } from '../config';

export const btnTextColor = theme.variants('mode', 'variant', {
  primary: {
    light: colorScheme.dark.text_color,
    dark: colorScheme.dark.text_color
  },
  secondary: {
    light: colorScheme.dark.text_color,
    dark: colorScheme.dark.text_color
  },
  alert: {
    light: colorScheme.dark.text_color,
    dark: colorScheme.dark.text_color
  }
});

export const btnBackground = theme.variants('mode', 'variant', {
  primary: {
    light: colorScheme.light.colorPrimary,
    dark: colorScheme.dark.colorPrimary
  },
  secondary: {
    light: colorScheme.light.colorSecondary,
    dark: colorScheme.dark.colorSecondary
  },
  alert: {
    light: colorScheme.light.colorAlert,
    dark: colorScheme.dark.colorAlert
  }
});

// Lighten backgrounds used on hover events
export const btnLighten = theme.variants('mode', 'variant', {
  primary: {
    light: lighten(0.2, colorScheme.light.colorPrimary),
    dark: lighten(0.2, colorScheme.dark.colorPrimary)
  },
  secondary: {
    light: lighten(0.2, colorScheme.light.colorSecondary),
    dark: lighten(0.2, colorScheme.dark.colorSecondary)
  },
  alert: {
    light: lighten(0.1, colorScheme.light.colorAlert),
    dark: lighten(0.1, colorScheme.dark.colorAlert)
  }
});

// Lighten backgrounds used for active navigation links
export const btnHighlight = theme.variants('mode', 'variant', {
  primary: {
    light: transparentize(0.4, colorScheme.light.navLinkHighlight),
    dark: transparentize(0.8, colorScheme.dark.navLinkHighlight)
  },
  secondary: {
    light: transparentize(0.4, colorScheme.light.navLinkHighlight),
    dark: transparentize(0.8, colorScheme.dark.navLinkHighlight)
  },
  alert: {
    light: transparentize(0.4, colorScheme.light.colorAlert),
    dark: transparentize(0.8, colorScheme.dark.colorAlert)
  }
});

export const linkColor = theme('mode', {
  light: colorScheme.light.linkColor,
  dark: colorScheme.dark.linkColor
});

export const switchBackgroundColor = theme('mode', {
  light: colorScheme.light.colorPrimary,
  dark: colorScheme.dark.colorPrimary
});
