import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName='HomeScreen'>
      <Stack.Screen name='HomeScreen' />
      <Stack.Screen name='MovieScreen' />//
      <Stack.Screen name='PersonScreen' />
      <Stack.Screen name='SearchScreen' />
    </Stack>
  )
}