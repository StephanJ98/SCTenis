import React, { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation'
import StartScreen from './pages/StartScreen'
import MainScreen from './pages/MainScreen/MainScreen';

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
  const [render, setRender] = useState(false)

  useEffect(() => {
    setTimeout(function() {
      setRender(true)
    }, 3000)
  })
  return (
    render ? <MainScreen/> : <StartScreen />
  );
}