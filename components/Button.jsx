import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import CommonColors from '../constants/CommonColors';

const Button = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={[
        props.inverse ? styles.buttonWrapperInverse : { backgroundColor: CommonColors.violet },
        styles.buttonWrapper,
      ]}
    >
      <Ionicons name={props.icon} size={40} style={!props.inverse ? styles.buttonIcon : styles.buttonIconInverse} />
    </View>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 200,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapperInverse: {
    backgroundColor: CommonColors.white,
    borderColor: CommonColors.violet,
    borderWidth: 3,
  },
  buttonIcon: {
    color: CommonColors.white,
  },
  buttonIconInverse: {
    color: CommonColors.violet,
  },
});
