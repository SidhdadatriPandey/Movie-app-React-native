import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import TrendingMovies from '@/components/TrendingMovies';
import MovieList from '@/components/MovieList';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [trending,setTrending]=useState<any>([1,2,3,4,5,6]);
  const [upcoming,setUpcoming]=useState<any>([1,2,3,4,5,6]);
  const [toprated,setToprated]=useState<any>([1,2,3,4,5,6]);
  return (
    // <Text>kjljlkjklj</Text>
    <View style={{padding:10, paddingBottom:100, backgroundColor:'black'}}>
      <SafeAreaView style={{paddingTop:25, paddingHorizontal:10}}>
        <StatusBar barStyle="light-content" />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Entypo name="menu" size={34} color="white" />
          <View>
            <Text style={{ color: 'blue', fontSize: 40, fontWeight: 'bold' }}>
              M<Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>ovies</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={()=>router.push('/(screens)/SearchScreen')}>
            <Feather name="search" size={34} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingLeft:3}}
        >
          <TrendingMovies trending={trending}/>

          <MovieList title='Upcoming' hideSeeAll={true} data={upcoming}/>
          <MovieList title='Top Rated' hideSeeAll={true} data={toprated}/>
        </ScrollView>
    </View>
  )
}