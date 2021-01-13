import * as React from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, Alert, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CommonColors from '../constants/CommonColors';
import { getAvatars, clearAvatars, deleteTavatar } from '../models/LocalStorage';
import LetterPlayground from '../components/LetterPlayground';
import Baloons from '../components/Baloons';

export default class BoardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedName: '',
      selectedID: 0,
      gameCompleted: false,
      avatars: [],
      noAvatar: false,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setAvatars();
    });
    this.setAvatars();
  }

  setAvatars = async () => {
    const avatars = await getAvatars();
    if (avatars) {
      this.setState({ avatars, selectedName: avatars[0].name });
    }
    if (!avatars.length) {
      this.setState({ noAvatar: true });
    } else {
      this.setState({ noAvatar: false });
    }
  };

  selectMember = (id, name) => {
    const avatars = [...this.state.avatars];
    avatars.forEach((member) => {
      member.selected = member.id === id;
    });
    this.setState({
      avatars,
      selectedName: name,
      selectedID: id,
      gameCompleted: false,
    });
  };

  photo = ({ item }) => (
    <TouchableOpacity onPress={() => this.selectMember(item.id, item.name)}>
      <View style={[styles.selectorPhotoWrapper, item.selected ? styles.selectedBorder : null]}>
        <Image source={{ uri: item.image }} resizeMode="contain" style={styles.selectorPhoto} />
      </View>
    </TouchableOpacity>
  );

  gameCompleted = () => {
    this.setState({ gameCompleted: true });
  };

  gameReset = (selectedID) => {
    this.setState({ gameCompleted: false, selectedID: -1 }, () => {
      this.setState({ selectedID });
    });
  };

  gameRestart = () => {
    const { avatars } = this.state;
    if (avatars.length) {
      this.selectMember(avatars[0].id, avatars[0].name);
    } else {
      this.setState({ noAvatar: true });
    }
  };

  alertDeleteMember = () => {
    Alert.alert(
      'Delete Tavatar',
      'Are you sure you want to delete current Tavatar?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Delete', onPress: this.deleteMember },
      ],
      { cancelable: false }
    );
  };

  deleteMember = async () => {
    const { selectedID, avatars } = this.state;
    const newAvatars = [...avatars];
    const deleteIndex = newAvatars.findIndex((x) => x.id === selectedID);
    newAvatars.splice(deleteIndex, 1);
    await deleteTavatar(deleteIndex);
    this.setState({ avatars: newAvatars });
    this.gameRestart();
  };

  render() {
    const { selectedName, avatars, selectedID, gameCompleted, noAvatar } = this.state;
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
          {noAvatar ? (
            <NoAvatarScreen />
          ) : (
            <LetterPlayground key={selectedID} word={selectedName} gameCompleted={this.gameCompleted} />
          )}
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
        <RestartIcon onPress={() => this.gameReset(selectedID)} />
        <DeleteIcon onPress={this.alertDeleteMember} />
      </View>
    );
  }
}

const NoAvatarScreen = () => (
  <View style={styles.noAvatar}>
    <Text style={styles.noAvatarText}>Add avatar</Text>
  </View>
);

const DeleteIcon = (props) => (
  <View style={styles.deleteBtn}>
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.deleteIconWrapper}>
        <Ionicons name="ios-trash" size={25} style={styles.deleteIcon} />
      </View>
    </TouchableOpacity>
  </View>
);

const RestartIcon = (props) => (
  <View style={styles.restartBtn}>
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.deleteIconWrapper}>
        <Ionicons name="ios-refresh" size={25} style={styles.deleteIcon} />
      </View>
    </TouchableOpacity>
  </View>
);

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
  deleteBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  deleteIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonColors.white,
  },
  deleteIcon: {
    color: CommonColors.violet,
  },
  restartBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  noAvatar: {
    flex: 1,
    backgroundColor: CommonColors.violet,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noAvatarText: {
    color: CommonColors.white,
    fontSize: 20,
  },
});
