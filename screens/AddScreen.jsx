import * as React from 'react';
import { View, StyleSheet, Image, Platform, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import CommonColors from '../constants/CommonColors';
import Button from '../components/Button';
import { storeTavatar } from '../models/LocalStorage';

export default class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      name: '',
    };
  }

  async componentDidMount() {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  okButtonHandler = async () => {
    const { image, name } = this.state;
    const tavatar = { name, image };
    await storeTavatar(tavatar);
    this.props.navigation.navigate('Board');
  };

  cancelButtonHandler = () => {
    console.log('Cancelled!');
  };

  render() {
    const { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.photoWrapper}>
          {image ? (
            <Image source={{ uri: this.state.image }} resizeMode="contain" style={styles.photo} />
          ) : (
            <View style={styles.cameraIconWrapper}>
              <TouchableOpacity onPress={this.pickImage}>
                <Ionicons name="ios-camera" size={60} style={styles.cameraIcon} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <TextInput
            autoCapitalize="characters"
            style={styles.input}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            maxLength={10}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button icon="ios-checkmark-circle-outline" onPress={this.okButtonHandler} />
          <Button icon="ios-close-circle-outline" onPress={this.cancelButtonHandler} inverse />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 15,
  },
  button: {
    padding: 10,
    backgroundColor: CommonColors.violet,
    color: CommonColors.white,
    fontSize: 10,
    textAlign: 'center',
  },
  input: {
    padding: 5,
    borderColor: CommonColors.violet,
    borderWidth: 3,
    borderRadius: 10,
    fontSize: 40,
    textAlign: 'center',
    color: CommonColors.violet,
    width: 600,
    alignSelf: 'center',
  },
  photoWrapper: {
    borderWidth: 5,
    borderColor: CommonColors.violet,
    borderRadius: 80,
    overflow: 'hidden',
    marginLeft: 20,
    height: 160,
    width: 160,
    alignSelf: 'center',
    marginBottom: 30,
  },
  photo: {
    height: 160,
    width: 160,
  },
  cameraIconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    color: CommonColors.violet,
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: 500,
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
});
