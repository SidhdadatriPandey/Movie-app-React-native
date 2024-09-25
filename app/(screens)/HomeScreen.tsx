import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import TrendingMovies from '@/components/TrendingMovies';
import MovieList from '@/components/MovieList';
import { router } from 'expo-router';
import Loading from '@/components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/movieDb';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    <View style={{ padding: hp(.7), paddingBottom: hp(17), backgroundColor: 'black' }}>
      <SafeAreaView style={{ paddingTop: hp(4), paddingHorizontal: hp(1) }}>
        <StatusBar barStyle="light-content" />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ color: 'blue', fontSize: hp(4.2), fontWeight: 'bold' }}>
              M<Text style={{ color: 'white', fontSize: hp(4.2), fontWeight: 'bold' }}>ovies</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(screens)/SearchScreen')}>
            <Feather name="search" size={hp(3.5)} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push('/(pvrScreen)/HomeScreen')} style={{ backgroundColor: 'yellow', marginTop: hp(1), borderRadius: hp(1) }}>
          <Text style={{ color: 'blue', fontSize: hp(3.5), fontWeight: 'bold', textAlign: 'center' }}>BOOK PVR</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {
        loading ? (<Loading />) : (<ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: hp(.3) }}
        >
          {trending.length > 0 && <TrendingMovies trending={trending} />}
          <MovieList title='Upcoming' hideSeeAll={true} data={upcoming} />
          <MovieList title='Top Rated' hideSeeAll={true} data={toprated} />
        </ScrollView>)
      }
    </View>)
}
