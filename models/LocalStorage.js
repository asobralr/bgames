import * as React from 'react';
import { AsyncStorage } from 'react-native';

export const storeTavatar = async (newTavatar) => {
  try {
    const previous = await AsyncStorage.getItem('@tavatars');
    let value = '';
    if (previous !== null) {
      const tavatars = JSON.parse(previous);
      const newTavatars = [...tavatars, newTavatar];
      value = JSON.stringify(newTavatars);
    } else {
      const newTavatars = [];
      newTavatars.push(newTavatar);
      value = JSON.stringify(newTavatars);
    }
    await AsyncStorage.setItem('@tavatars', value);
  } catch (e) {
    console.log(e);
  }
};

export const getAvatars = async () => {
  try {
    const value = await AsyncStorage.getItem('@tavatars');
    if (value !== null) {
      const tavatarsObj = JSON.parse(value);
      const tavatars = [];
      let i = 0;
      tavatarsObj.forEach((tavatar) => {
        tavatar.id = i.toString();
        tavatar.selected = false;
        i += 1;
        tavatars.push(tavatar);
      });
      tavatars[0].selected = true;
      return tavatars;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
};

export const clearAvatars = async () => {
  AsyncStorage.removeItem('@tavatars');
};
