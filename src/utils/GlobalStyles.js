import {Dimensions} from 'react-native';

//
// size
//
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const ModalHeight = windowHeight * 0.2;
export const ModalWidth = windowWidth * 0.8;

export const navigationHeight = 60;
export const bottomTabHeight = 66;

export const statusBarHeight = 24;

export const betweenIcons = 15;

export const AppSize = {
  windowWidth,
  windowHeight,
  ModalHeight,
  ModalWidth,
  navigationHeight,
  bottomTabHeight,
  statusBarHeight,
  betweenIcons,
};

//
// color
//
export const main = '#EAE7C8';
export const main_op = 'rgba(234, 231, 200, 0.6)';
export const font = '#666353';
export const body = '#F8F6E7';
export const white = '#fffcf3';
export const border = '#c9c3a3';
export const blur = '#d1d1d1';
export const black = '#36342B';
export const red1 = '#C64756';
export const red2 = '#B82331';
export const green1 = '#96BB7C';
export const green2 = '#3C825E';
export const beige1 = '#E3DCB8';
export const beige2 = '#D6D0AE';

export const AppColors = {
  main,
  font,
  body,
  white,
  border,
  blur,
  black,
  red1,
  red2,
  green1,
  green2,
  beige1,
  beige2,
  main_op,
};
