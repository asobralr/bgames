import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen.tsx';
import BoardScreen from '../screens/BoardScreen';
import AddScreen from '../screens/AddScreen';
import LinkingConfiguration from './LinkingConfiguration.ts';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
const LetterStack = createStackNavigator();

function LetterStackScreen() {
  return (
    <LetterStack.Navigator screenOptions={{ headerShown: false }}>
      <LetterStack.Screen name="Board" component={BoardScreen} />
      <LetterStack.Screen name="Add" component={AddScreen} />
    </LetterStack.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={LetterStackScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
