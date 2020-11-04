import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import CommonColors from '../constants/CommonColors';
import {
  targetHeight,
  targetWidth,
  letterHeight,
  letterWidth,
} from '../constants/Dimensions';
import Letter from './Letter';
import Target from './Target';

export default class SpellPlayground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targets: [],
      letters: [],
    };
  }

  setLetterLanded = (id) => {
    const letters = [...this.state.letters];
    letters[id] = { ...letters[id], landed: true };
    this.setState({ letters }, () => this.checkTotalLandings());
  };

  getCanvasLimits = (event) => {
    const { layout } = event.nativeEvent;
    this.setState(
      { canvasWidth: layout.width, canvasHeight: layout.height },
      () => {
        this.renderLetters();
      },
    );
  };

  getRandomPos() {
    const { canvasWidth, canvasHeight } = this.state;
    const leftLimit = letterWidth * 1.5;
    const rightLimit = canvasWidth - letterWidth * 1.5;
    const topLimit = letterHeight * 0.5;
    const bottomLimit = canvasHeight - letterHeight * 2 - 50;
    const x = Math.random() * (rightLimit - leftLimit) + leftLimit;
    const y = Math.random() * (bottomLimit - topLimit) + topLimit;
    return { x, y };
  }

  checkTotalLandings = () => {
    const { letters } = this.state;
    for (let i = 0; i < letters.length; i++) {
      if (!letters[i].landed) {
        return false;
      }
    }
    this.props.gameCompleted();
    return true;
  };

  renderLetters = () => {
    const wordArray = this.props.word.split('');
    const letters = wordArray.map((letter, index) => ({
      key: index,
      id: index,
      letter,
      initPos: this.getRandomPos(),
      landed: false,
    }));
    const targets = wordArray.map((letter, index) => ({
      key: index,
      id: index,
      expectedLetter: letter,
    }));
    this.setState({ letters, targets });
  };

  checkLanding = (id, position, letter) => {
    const { targets } = this.state;
    targets.forEach((target) => {
      const {
 x1, x2, y1, y2, } = target.position;
      if (position.x < x2 && position.x > x1) {
        if (position.y < y2 && position.y > y1) {
          if (letter === target.expectedLetter) {
            this.setLetterLanded(id);
            return true;
          }
        }
      }
      return false;
    });
  };

  setTarget = (id, x, y) => {
    const position = {
      x1: x,
      x2: x + targetWidth,
      y1: y,
      y2: y + targetHeight,
    };
    const targets = [...this.state.targets];
    targets[id] = { ...targets[id], position };
    this.setState({ targets });
  };

  render() {
    const { letters, targets } = this.state;

    return (
      <View style={styles.container}>
        <View onLayout={this.getCanvasLimits} style={styles.targetContainer}>
          {letters.map((letter) => (
            <Letter
              {...letter}
              checkLanding={this.checkLanding}
              letterHeight={letterHeight}
              letterWidth={letterWidth}
            />
          ))}
          {targets.map((target) => (
            <Target {...target} setTarget={this.setTarget} />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CommonColors.violet,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: CommonColors.white,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  target: {
    height: targetHeight,
    width: targetWidth,
    backgroundColor: 'transparent',
    borderBottomColor: CommonColors.white,
    borderBottomWidth: 5,
    marginRight: 15,
  },
  targetContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    paddingBottom: 50,
  },
});
