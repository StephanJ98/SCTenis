import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation'
import StartScreen from './pages/StartScreen'
import MainScreen from './pages/MainScreen/MainScreen';

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
  return (
    // <StartScreen />
    <MainScreen />
  );
}