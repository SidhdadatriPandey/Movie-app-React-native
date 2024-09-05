import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React from 'react';
import { Redirect, useRouter } from 'expo-router';
import HomeScreen from '@/app/(screens)/HomeScreen';

export default function index() {
  const router = useRouter();

  return (
    <Redirect href={'../(screens)/HomeScreen'} />
  );
};