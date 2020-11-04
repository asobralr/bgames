import * as React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonColors from '../constants/CommonColors'
import LetterPlayground from '../components/LetterPlayground';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class BoardScreen extends React.Component {

  state = {
    selectedPhoto: require("../assets/images/benja.jpeg"),
    selectedName: 'BENJAMIN',
    selectedID: 0,
    availableMembers: [
      {
        id: "0",
        source: require("../assets/images/benja.jpeg"),
        name: 'BENJAMIN',
        selected: true
      },
      {
        id: "1",
        source: require("../assets/images/mama.jpg"),
        name: 'MAMA',
        selected: false
      },
      {
        id: "2",
        source: require("../assets/images/papa.jpg"),
        name: 'PAPA',
        selected: false
      }
    ]
  }

  selectMember = (id, name, source) => {
    const availableMembers = [...this.state.availableMembers]
    availableMembers.forEach((member) => {
      member.selected = (member.id === id)
    })
    this.setState({availableMembers, selectedName: name, selectedPhoto: source, selectedID: id})
  }

  photo = ({item}) => (
    <TouchableOpacity onPress={() => this.selectMember(item.id, item.name, item.source)}>
      <View style={[styles.selectorPhotoWrapper, item.selected ? styles.selectedBorder : null]}>
        <Image source={item.source} resizeMode={'center'} style={styles.selectorPhoto}/>
      </View>
    </TouchableOpacity>
  )

  render() {
    const {selectedPhoto, selectedName, availableMembers, selectedID} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <View style={styles.photoWrapper}>
            <Image source={selectedPhoto} resizeMode={'center'} style={styles.photo}/>
          </View>
        </View>
        <View style={styles.playgroundContainer}>
          <LetterPlayground key={selectedID} word={selectedName}/>
        </View>
        <View style={styles.selectorContainer}>
          <TouchableOpacity onPress={() => {console.log('Add member!')}}>
            <View style={styles.addMemberWrapper}>
              <Ionicons name={'ios-add'} size={70} style={styles.addMemberIcon}/>
            </View>
          </TouchableOpacity>
          <FlatList
            data={availableMembers}
            renderItem={this.photo}
            horizontal
            keyExtractor={item => item.id}
          />
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
    backgroundColor: CommonColors.violet,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  photoWrapper: {
    width: 160,
    height: 160,
    borderWidth: 5,
    borderColor: CommonColors.white,
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: 20
  },
  selectedBorder: {
    borderColor: CommonColors.violet,
    borderWidth: 6
  },
  photo: {
    height: 160,
    width: 160
  },
  selectorPhotoWrapper: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: CommonColors.white,
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 20
  },  
  selectorPhoto: {
    height: 100,
    width: 100
  },
  playgroundContainer: {
    flexGrow: 1,
  },
  selectorContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: CommonColors.white
  },
  addMemberWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonColors.violet
  },
  addMemberIcon: {
    color: CommonColors.white
  }
});