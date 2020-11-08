import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const targetHeight = 100;
export const targetWidth = 75;
export const letterHeight = windowHeight * 0.1;
export const letterWidth = letterHeight * 0.8;
export const letterFont = letterHeight;
export const photoDimensions = {
  height: windowHeight * 0.1,
  width: windowHeight * 0.1,
};
