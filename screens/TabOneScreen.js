import * as React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import CommonColors from '../constants/CommonColors'
import LetterPlayground from '../components/LetterPlayground';

export default class TabOneScreen extends React.Component {

  state = {
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <View style={styles.photoWrapper}>
            <Image source={require("../assets/images/benja.jpeg")} resizeMode={'center'} style={styles.photo}/>
          </View>
        </View>
        <View style={styles.playgroundContainer}>
          <LetterPlayground word="BENJAMIN"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  photoContainer: {
    flex: 3,
    backgroundColor: CommonColors.violet,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoWrapper: {
    width: 160,
    height: 160,
    backgroundColor: 'green',
    borderWidth: 5,
    borderColor: CommonColors.white,
    borderRadius: 100,
    overflow: 'hidden'
  },
  photo: {
    height: 160,
    width: 160
  },
  playgroundContainer: {
    flex: 8,
  }
});