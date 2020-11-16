import * as React from 'react';
import { View, Image, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const baloonWidth = 100;
const baloonHeight = 180;

const randomize = (max) => Math.random() * max;

const range = (count) => {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(i);
  }
  return array;
};

const RisingBaloon = ({ duration, delay, style }) => (
  <Animatable.View
    animation={{
      from: { translateY: windowHeight + baloonHeight },
      to: { translateY: -baloonHeight },
    }}
    duration={duration}
    delay={delay}
    easing={(t) => t ** 1.7}
    iterationCount={1}
    useNativeDriver
    style={style}
  >
    <Image source={require('../assets/images/baloon.png')} style={{ width: baloonWidth, height: baloonHeight }} />
  </Animatable.View>
);

const Baloons = ({ count = 15, duration = 6000 }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 5000,
    }}
  >
    {range(count)
      .map(() => randomize(1000))
      .map((flipDelay, i) => (
        <RisingBaloon
          key={i}
          duration={duration}
          delay={i * (duration / count)}
          style={{
            position: 'absolute',
            paddingHorizontal: 30,
            left: randomize(windowWidth - baloonWidth),
            backgroundColor: 'transparent',
          }}
        />
      ))}
  </View>
);

export default Baloons;
