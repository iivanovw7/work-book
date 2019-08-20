import { lighten, transparentize } from 'polished';
import theme from 'styled-theming';
import { colorScheme } from '../config';

export const btnTextColor = theme.variants('mode', 'variant', {
  primary: {
    light: colorScheme.dark_text_color,
    dark: colorScheme.dark_text_color
  },
  secondary: {
    light: colorScheme.dark_text_color,
    dark: colorScheme.dark_text_color
  },
  alert: {
    light: colorScheme.dark_text_color,
    dark: colorScheme.dark_text_color
  }
});

export const btnBackground = theme.variants('mode', 'variant', {
  primary: {
    light: colorScheme.light_colorPrimary,
    dark: colorScheme.dark_colorPrimary
  },
  secondary: {
    light: colorScheme.light_colorSecondary,
    dark: colorScheme.dark_colorSecondary
  },
  alert: {
    light: colorScheme.light_colorAlert,
    dark: colorScheme.dark_colorAlert
  }
});

// Lighten backgrounds used on hover events
export const btnLighten = theme.variants('mode', 'variant', {
  primary: {
    light: lighten(0.2, colorScheme.light_colorPrimary),
    dark: lighten(0.2, colorScheme.dark_colorPrimary)
  },
  secondary: {
    light: lighten(0.2, colorScheme.light_colorSecondary),
    dark: lighten(0.2, colorScheme.dark_colorSecondary)
  },
  alert: {
    light: lighten(0.1, colorScheme.light_colorAlert),
    dark: lighten(0.1, colorScheme.dark_colorAlert)
  }
});

// Lighten backgrounds used for active navigation links
export const btnHighlight = theme.variants('mode', 'variant', {
  primary: {
    light: transparentize(0.4, colorScheme.light_navLinkHighlight),
    dark: transparentize(0.8, colorScheme.dark_navLinkHighlight)
  },
  secondary: {
    light: transparentize(0.4, colorScheme.light_navLinkHighlight),
    dark: transparentize(0.8, colorScheme.dark_navLinkHighlight)
  },
  alert: {
    light: transparentize(0.4, colorScheme.light_colorAlert),
    dark: transparentize(0.8, colorScheme.dark_colorAlert)
  }
});

export const linkColor = theme('mode', {
  light: colorScheme.light_linkColor,
  dark: colorScheme.dark_linkColor
});
