import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import CommonColors from '../constants/CommonColors';
import { targetHeight, targetWidth } from '../constants/Dimensions';

export default class Target extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.setTarget(this.props.id, this.state.x, this.state.y);
    }, 1000);
  }

  getPosition = (event) => {
    const { layout } = event.nativeEvent;
    this.setState({ x: layout.x, y: layout.y });
  };

  render() {
    return <View onLayout={this.getPosition} style={styles.target} />;
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
});
