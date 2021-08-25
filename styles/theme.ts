const space = [0, 2, 4, 6, 8, 12, 16, 18, 20, 24, 26, 28, 32, 36, 38, 40, 44, 48, 50, 64, 128, 256, 512];
const breakpoints = ['22.625em', '30em', '37.500em', '48em', '56.25em', '59.125em', '61.25em', '68.75em', '75.000em'];
const fontSizes = ['1em', '1.16em', '1.3em', '1.6em', '1.83em', '2em', '2.16em', '2.6em', '3em', '3.33em'];
const lineHeights = [15, 17.5, 20, 25, 30, 40];

export const lightTheme = {
  space,
  breakpoints,
  fontSizes,
  lineHeights,
  colors: {
    primary: '#0070f3',
    black: '#12151D',
    grey: '#898989',
    cardBG: '#1F2331',
    white: '#ffffff',
    grey2: '#243248',
    blue: '#2D81FF',
    green: '#00D455',
    red: '#FF4747',
    purple: '#522EBD',
    brightPurple: '#9E41C6',
    gold: '#F9B208',
    purpleGradient: `linear-gradient(180deg, #3322AC 0%, #D9499E 100%)`,
    goldGradient: `linear-gradient(180deg, #FCD613 0%, #CD9502 100%)`,
    blueGradient: `linear-gradient(180deg, #2C3F9D 0%, #08E0EF 100%)`,
    greyGradient: `linear-gradient(180deg, #5F5F5F 0%, #D2D2D2 100%)`,
  },
};
export const darkTheme = {
  space,
  breakpoints,
  fontSizes,
  lineHeights,
  colors: {
    primary: '#0070f3',
  },
};
