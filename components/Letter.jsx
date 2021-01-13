import * as React from 'react';
import { Text, View, StyleSheet, PanResponder } from 'react-native';

import CommonColors from '../constants/CommonColors';
import { letterHeight, letterWidth, letterFont } from '../constants/Dimensions';

export default class Letter extends React.Component {
  panResponder = {};

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      initialTop: this.props.initPos.y,
      initialLeft: this.props.initPos.x,
      offsetTop: 0,
      offsetLeft: 0,
    };
  }

  UNSAFE_componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
  }

  handleStartShouldSetPanResponder = () => {
    const shouldStart = !this.props.landed;
    return shouldStart;
  };

  handlePanResponderGrant = () => {
    this.setState({ dragging: true });
  };

  handlePanResponderMove = (e, gestureState) => {
    this.setState({
      offsetTop: gestureState.dy,
      offsetLeft: gestureState.dx,
    });
  };

  handlePanResponderEnd = (e, gestureState) => {
    const { initialTop, initialLeft } = this.state;
    this.setState({
      dragging: false,
      initialTop: initialTop + gestureState.dy,
      initialLeft: initialLeft + gestureState.dx,
      offsetTop: 0,
      offsetLeft: 0,
    });
    const landed = this.props.checkLanding(
      this.props.id,
      { x: initialLeft + gestureState.dx, y: initialTop + gestureState.dy },
      this.props.letter
    );
    const { x, y } = landed.snapPos;
    if (landed.landed) {
      this.setState({ initialTop: y, initialLeft: x });
    }
  };

  render() {
    const { initialTop, initialLeft, offsetTop, offsetLeft } = this.state;
    const { landed, letter } = this.props;
    const letterStyle = landed ? styles.landedLetterText : styles.defaultLetterText;
    const panStyle = {
      top: initialTop + offsetTop,
      left: initialLeft + offsetLeft,
    };

    return (
      <View style={[panStyle, styles.letter]} {...this.panResponder.panHandlers}>
        <Text style={[styles.letterText, letterStyle]}>{letter}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  letter: {
    position: 'absolute',
    zIndex: 1000,
    height: letterHeight,
    width: letterWidth,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  letterText: {
    color: CommonColors.white,
    fontSize: letterFont,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  landedLetterText: {
    color: CommonColors.orange,
  },
  defaultLetterText: {
    color: CommonColors.white,
  },
});
