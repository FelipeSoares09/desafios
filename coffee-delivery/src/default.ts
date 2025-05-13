import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      background: string;
      'base-card': string;
      'base-input': string;
      'base-button': string;
      'base-hover': string;
      'base-label': string;
      'base-text': string;
      'base-subtitle': string;
      'base-title': string;

      'purple-light': string;
      purple: string;
      'purple-dark': string;

      'yellow-light': string;
      yellow: string;
      'yellow-dark': string;
    };
  }
}

export const defaultTheme = {
  colors: {
    white: '#FFFFFF',
    background: '#FAFAFA',
    'base-card': '#F3F2F2',
    'base-input': '#EDEDED',
    'base-button': '#E6E6E5',
    'base-hover': '#D7D5D5',
    'base-label': '#8D8686',
    'base-text': '#574F4D',
    'base-subtitle': '#403937',
    'base-title': '#272221',

    'purple-light': '#EBE5F9',
    purple: '#8047F8',
    'purple-dark': '#4B2995',

    'yellow-light': '#F1E9C9',
    yellow: '#DBAC2C',
    'yellow-dark': '#C47F17',
  },
};