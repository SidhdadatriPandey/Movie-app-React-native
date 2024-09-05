import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
// import HomeScreen from './HomeScreen'

export default function _layout() {
  return (
    <Stack screenOptions={{headerShown:false}} initialRouteName='HomeScreen'>
        <Stack.Screen name='HomeScreen'/>
        <Stack.Screen name='MovieScreen'/>
        <Stack.Screen name='PersonScreen'/>
        <Stack.Screen name='SearchScreen'/>
    </Stack>
  )
}