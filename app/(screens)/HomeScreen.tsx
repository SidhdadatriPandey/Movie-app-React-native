import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import TrendingMovies from '@/components/TrendingMovies';
import MovieList from '@/components/MovieList';
import { router } from 'expo-router';
import Loading from '@/components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/movieDb';

export default function HomeScreen() {
  const [trending, setTrending] = useState<any>([]);
  const [upcoming, setUpcoming] = useState<any>([]);
  const [toprated, setToprated] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getTrendingMovies();//
    getUpcomingMovies();
    getTopratedMovies();
  }, [])

  async function getTrendingMovies() {
    const data = await fetchTrendingMovies();
    // console.log(data);
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  }

  async function getUpcomingMovies() {
    const data = await fetchUpcomingMovies();
    // console.log("this is upcoming movie data");
    // console.log(data);
    if (data && data.results) setUpcoming(data.results);
    // setLoading(false);
  }

  async function getTopratedMovies() {
    const data = await fetchTopRatedMovies();
    // console.log("this is upcoming movie data");
    // console.log(data);
    if (data && data.results) setToprated(data.results);
    // setLoading(false);
  }

  return (
    <View style={{ padding: 10, paddingBottom: 160, backgroundColor: 'black' }}>
      <SafeAreaView style={{ paddingTop: 30, paddingHorizontal: 10 }}>
        <StatusBar barStyle="light-content" />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* <Entypo name="menu" size={34} color="white" /> */}
          <View>
            <Text style={{ color: 'blue', fontSize: 40, fontWeight: 'bold' }}>
              M<Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>ovies</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(screens)/SearchScreen')}>
            <Feather name="search" size={34} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push('/homeScreen')} style={{ backgroundColor: 'yellow', marginTop: 10 }}>
          <Text style={{ color: 'blue', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>PVR</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {
        loading ? (<Loading />) : (<ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 3 }}
        >
          {trending.length > 0 && <TrendingMovies trending={trending} />}
          <MovieList title='Upcoming' hideSeeAll={true} data={upcoming} />
          <MovieList title='Top Rated' hideSeeAll={true} data={toprated} />
        </ScrollView>)
      }
    </View>)
}
