export const theme = {
  colors: {
    coral: '#e66767',
    beige: '#ffebd9',
    background: '#fff8f2',
    white: '#ffffff',
    inputText: '#4b4b4b',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
  fonts: {
    family: "'Roboto', sans-serif",
    sizes: {
      small: '10px',
      xsmall: '12px',
      body: '14px',
      subtitle: '16px',
      cardTitle: '18px',
      title: '36px',
    },
    weights: {
      regular: 400,
      bold: 700,
      black: 900,
    },
  },
  breakpoints: {
    desktop: '1024px',
  },
  layout: {
    contentPadding: '171px',
    sidebarWidth: '360px',
    sidebarPadding: '8px',
  },
} as const;

export type Theme = typeof theme;
