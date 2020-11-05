import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonColors from '../constants/CommonColors';
import LetterPlayground from '../components/LetterPlayground';
import Baloons from '../components/Baloons';

export default class BoardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhoto: require('../assets/images/benja.jpeg'),
      selectedName: 'BENJAMIN',
      selectedID: 0,
      gameCompleted: false,
      availableMembers: [
        {
          id: '0',
          source: require('../assets/images/benja.jpeg'),
          name: 'BENJAMIN',
          selected: true,
        },
        {
          id: '1',
          source: require('../assets/images/mama.jpg'),
          name: 'MAMA',
          selected: false,
        },
        {
          id: '2',
          source: require('../assets/images/papa.jpg'),
          name: 'PAPA',
          selected: false,
        },
        {
          id: '3',
          source: require('../assets/images/olivia.jpg'),
          name: 'OLIVIA',
          selected: false,
        },
      ],
    };
  }

  selectMember = (id, name, source) => {
    const availableMembers = [...this.state.availableMembers];
    availableMembers.forEach((member) => {
      member.selected = member.id === id;
    });
    this.setState({
      availableMembers,
      selectedName: name,
      selectedPhoto: source,
      selectedID: id,
      gameCompleted: false,
    });
  };

  photo = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.selectMember(item.id, item.name, item.source)}
    >
      <View
        style={[
          styles.selectorPhotoWrapper,
          item.selected ? styles.selectedBorder : null,
        ]}
      >
        <Image
          source={item.source}
          resizeMode="center"
          style={styles.selectorPhoto}
        />
      </View>
    </TouchableOpacity>
  );

  gameCompleted = () => {
    this.setState({ gameCompleted: true });
  };

  render() {
    const {
      selectedPhoto,
      selectedName,
      availableMembers,
      selectedID,
      gameCompleted,
    } = this.state;
    return (
      <View style={styles.container}>
        {gameCompleted && <Baloons key={selectedID} />}
        <View style={styles.photoContainer}>
          <View style={styles.photoWrapper}>
            <Image
              source={selectedPhoto}
              resizeMode="center"
              style={styles.photo}
            />
          </View>
        </View>
        <View style={styles.playgroundContainer}>
          <LetterPlayground
            key={selectedID}
            word={selectedName}
            gameCompleted={this.gameCompleted}
          />
        </View>
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log('Add member!');
            }}
          >
            <View style={styles.addMemberWrapper}>
              <Ionicons name="ios-add" size={70} style={styles.addMemberIcon} />
            </View>
          </TouchableOpacity>
          <FlatList
            data={availableMembers}
            renderItem={this.photo}
            horizontal
            keyExtractor={(item) => item.id}
          />
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
    width: 160,
    height: 160,
    borderWidth: 5,
    borderColor: CommonColors.white,
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: 20,
  },
  selectedBorder: {
    borderColor: CommonColors.violet,
    borderWidth: 6,
  },
  photo: {
    height: 160,
    width: 160,
  },
  selectorPhotoWrapper: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: CommonColors.white,
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 20,
  },
  selectorPhoto: {
    height: 100,
    width: 100,
  },
  playgroundContainer: {
    flexGrow: 1,
  },
  selectorContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: CommonColors.white,
  },
  addMemberWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonColors.violet,
  },
  addMemberIcon: {
    color: CommonColors.white,
  },
});
