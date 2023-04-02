import {Dimensions} from 'react-native';

//
// size
//
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const modalHeight = windowHeight * 0.2;
export const modalWidth = windowWidth * 0.8;

export const navigationHeight = 60;
export const bottomTabHeight = 64;

export const statusBarHeight = 24;

export const betweenIcons = 15;

export const windowHeightNoNav =
  windowHeight - navigationHeight - statusBarHeight - bottomTabHeight;

export const AppSize = {
  windowWidth,
  windowHeight,
  ModalHeight: modalHeight,
  ModalWidth: modalWidth,
  navigationHeight,
  bottomTabHeight,
  statusBarHeight,
  betweenIcons,
  windowHeightNoNav,
};

//
// color
//
export const main = '#EAE7C8';
export const main_op = 'rgba(234, 231, 200, 0.6)';
export const body = '#FBF9F3';
export const border = '#c9c3a3';
export const blur = '#d1d1d1';
export const dark = '#ABA68A';
export const black = '#36342B';
export const red1 = '#C64756';
export const red2 = '#B82331';
export const green1 = '#96BB7C';
export const green2 = '#3C825E';
export const beige1 = '#E3DCB8';
export const beige2 = '#D6D0AE';

// new colors
export const Black = '#000000';
export const white = '#FFFFFF';
export const Primary = '#DEDBC5';
export const Secondary = '#F5F2EA';
export const Background = '#FBF9F3';
export const Point = '#D88775';
export const Gray100 = '#E87C7C';
export const Gray200 = '#F1F0ED';
export const Gray300 = '#EAE8E5';
export const Gray400 = '#E3E1DC';
export const Gray500 = '#DCD9D3';
export const Gray600 = '#B0AEA9';
export const Gray700 = '#84827F';
export const Gray800 = '#585754';
export const Gray900 = '#2C2B2A';
export const Font = Gray900;

export const AppColors = {
  main,
  Font,
  body,
  border,
  blur,
  dark,
  black,
  red1,
  red2,
  green1,
  green2,
  beige1,
  beige2,
  main_op,
  Black,
  white,
  Primary,
  Secondary,
  Background,
  Point,
  Gray100,
  Gray200,
  Gray300,
  Gray400,
  Gray500,
  Gray600,
  Gray700,
  Gray800,
  Gray900,
};
