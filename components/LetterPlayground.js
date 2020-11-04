import * as React from 'react';
import { Text, View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import CommonColors from '../constants/CommonColors'

const targetHeight = 100;
const targetWidth = 75;
const letterHeight = 80;
const letterWidth = 60;
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default class SpellPlayground extends React.Component {

  state = {
    targets: [],
    letters: [],
    completed: false
  }

  checkTotalLandings = () => {
    const {letters} = this.state
    for (let i = 0; i < letters.length; i++) {
      if (!letters[i].landed){
        return false
      }
    }
    console.log('Completed!')
    this.setState({completed: true})
  }

  setLetterLanded = (id) => {
    let letters = [...this.state.letters]
    letters[id] = {...letters[id], landed: true}
    this.setState({letters}, () => this.checkTotalLandings())
  }

  getCanvasLimits = (event) => {
    const layout = event.nativeEvent.layout;
    this.setState({canvasWidth: layout.width, canvasHeight: layout.height}, () => {this.renderLetters()})
  }

  getRandomPos(){
    const leftLimit = letterWidth * 1.5;
    const rightLimit = this.state.canvasWidth - (letterWidth * 1.5)
    const topLimit = letterHeight * 0.5;
    const bottomLimit = this.state.canvasHeight - (letterHeight * 2) - 50
    const x =  Math.random()* (rightLimit - leftLimit) + leftLimit
    const y = Math.random()* (bottomLimit - topLimit) + topLimit
    return {x, y}
  }

  renderLetters = () => {
    const wordArray = this.props.word.split('')
    const letters = wordArray.map((letter, index) => {
      return {key: index, id: index, letter: letter, initPos: this.getRandomPos(), landed: false}
    })
    const targets = wordArray.map((letter, index) => {
      return {key: index, id: index, expectedLetter: letter}
    })
    this.setState({letters, targets})
  }

  checkLanding = (id, position, letter) => {
    const {targets} = this.state
    targets.forEach(target => {
      const {x1, x2, y1, y2} = target.position
      if(position.x < x2 && position.x > x1){
        if(position.y < y2 && position.y > y1){
          if(letter === target.expectedLetter){
            this.setLetterLanded(id)
            return true
          }
        }
      }
    })
  }

  setTarget = (id, x, y) => {
    const position= {x1: x, x2: x + targetWidth, y1: y, y2: y + targetHeight}
    let targets = [...this.state.targets]
    targets[id] = {...targets[id], position}
    this.setState({targets})
  }

  render() {
    const {letters, targets} = this.state

    return (
      <View style={styles.container}>
        <View onLayout={this.getCanvasLimits} style={styles.targetContainer}>
        {letters.map(letter => (
          <Letter {...letter} checkLanding={this.checkLanding} target={this.state.targets[1]}/>
        ))}
        {targets.map(target => (
          <Target {...target} setTarget={this.setTarget}/>
        ))}
        </View>
      </View>
    );
  }
}

class Target extends React.Component{

  state = {
    x: 0,
    Y: 0
  }

  getPosition = (event) => {
    const layout = event.nativeEvent.layout;
    this.setState({x: layout.x, y: layout.y})
  }

  componentDidMount(){
    setTimeout(() => {
      this.props.setTarget(this.props.id, this.state.x, this.state.y)
    }, 1000);
  }

  render(){
    return(
      <View onLayout={this.getPosition} style={styles.target}>
      </View>
    )
  }
}

class Letter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      dragging: false,
      initialTop: this.props.initPos.y,
      initialLeft: this.props.initPos.x,
      offsetTop: 0,
      offsetLeft: 0,
    };
  }

  panResponder = {}

  UNSAFE_componentWillMount(){
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    })     
  }

  handleStartShouldSetPanResponder = () => {
    const shouldStart = !this.props.landed
    return shouldStart
  }

  handlePanResponderGrant = () => {
    this.setState({dragging: true})
  }

  handlePanResponderMove = (e, gestureState) => {
    this.setState({
      offsetTop: gestureState.dy,
      offsetLeft: gestureState.dx,
    })
  }

  handlePanResponderEnd = (e, gestureState) => {
    const {initialTop, initialLeft} = this.state
    this.setState({
      dragging: false,
      initialTop: initialTop + gestureState.dy,
      initialLeft: initialLeft + gestureState.dx,
      offsetTop: 0,
      offsetLeft: 0,
    })
    this.props.checkLanding(this.props.id, {x: initialLeft + gestureState.dx, y: initialTop + gestureState.dy}, this.props.letter)
  }

  render(){
    const {dragging, initialTop, initialLeft, offsetTop, offsetLeft} = this.state
    const {landed, letter } = this.props
    const letterStyle = landed ? styles.landedLetterText : styles.defaultLetterText
    const panStyle = {
      top: initialTop + offsetTop,
      left: initialLeft + offsetLeft,
    }

    return(
      <View style={[panStyle, styles.letter]} {...this.panResponder.panHandlers}>
        <Text style={[styles.letterText, letterStyle]}>{letter}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CommonColors.violet
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: CommonColors.white
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
    marginRight: 15
  },
  targetContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    paddingBottom: 50
  },
  letter: {
    position: 'absolute',
    zIndex: 1000,
    height: letterHeight,
    width: letterWidth,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'    
  },
  letterText: {
    color: CommonColors.white,
    fontSize: 65,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  landedLetterText: {
    color: CommonColors.orange
  },
  defaultLetterText: {
    color: CommonColors.white
  }  
});