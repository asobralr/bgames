import * as React from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CommonColors from '../constants/CommonColors';
import { getAvatars } from '../models/LocalStorage';
import LetterPlayground from '../components/LetterPlayground';
import Baloons from '../components/Baloons';

export default class BoardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhoto: require('../assets/images/benja.jpeg'),
      selectedName: '',
      selectedID: 0,
      gameCompleted: false,
      avatars: [],
    };
  }

  async componentDidMount() {
    const avatars = await getAvatars();
    if (avatars) {
      console.log(avatars);
      this.setState({ avatars, selectedName: avatars[0].name });
    }
  }

  selectMember = (id, name, image) => {
    const avatars = [...this.state.avatars];
    avatars.forEach((member) => {
      member.selected = member.id === id;
    });
    this.setState({
      avatars,
      selectedName: name,
      selectedPhoto: image,
      selectedID: id,
      gameCompleted: false,
    });
  };

  photo = ({ item }) => (
    <TouchableOpacity onPress={() => this.selectMember(item.id, item.name, item.image)}>
      <View style={[styles.selectorPhotoWrapper, item.selected ? styles.selectedBorder : null]}>
        <Image source={{ uri: item.image }} resizeMode="contain" style={styles.selectorPhoto} />
      </View>
    </TouchableOpacity>
  );

  gameCompleted = () => {
    this.setState({ gameCompleted: true });
  };

  render() {
    const { selectedPhoto, selectedName, avatars, selectedID, gameCompleted } = this.state;
    return (
      <View style={styles.container}>
        {gameCompleted && <Baloons key={selectedID} />}
        {/* <View style={styles.photoContainer}>
          <View style={styles.photoWrapper}>
            <Image
              source={selectedPhoto}
              resizeMode="center"
              style={styles.photo}
            />
          </View>
        </View> */}
        <View style={styles.playgroundContainer}>
          <LetterPlayground key={selectedID} word={selectedName} gameCompleted={this.gameCompleted} />
        </View>
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Add');
            }}
          >
            <View style={styles.addMemberWrapper}>
              <Ionicons name="ios-add" size={60} style={styles.addMemberIcon} />
            </View>
          </TouchableOpacity>
          <FlatList data={avatars} renderItem={this.photo} horizontal keyExtractor={(item) => item.id} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  photoContainer: {
    backgroundColor: CommonColors.violet,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  photoWrapper: {
    borderWidth: 5,
    borderColor: CommonColors.white,
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: 20,
  },
  selectedBorder: {
    borderColor: CommonColors.white,
    borderWidth: 6,
  },
  photo: {
    height: 75,
    width: 75,
  },
  selectorPhotoWrapper: {
    borderWidth: 5,
    borderColor: CommonColors.violet,
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 20,
  },
  selectorPhoto: {
    height: 60,
    width: 60,
  },
  playgroundContainer: {
    flexGrow: 1,
  },
  selectorContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: CommonColors.violet,
  },
  addMemberWrapper: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonColors.white,
  },
  addMemberIcon: {
    color: CommonColors.violet,
  },
});
