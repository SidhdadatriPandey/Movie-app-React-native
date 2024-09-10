import React, { useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '@/components/Cast';
import MovieList from '@/components/MovieList';
import Loading from '@/components/Loading';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovie, image185 } from '../api/movieDb';

export default function MovieScreen() {
  const [liked, setLiked] = useState(false);
  const { height, width } = Dimensions.get('window');

  const [cast, setCast] = useState<any>([]);
  const [similarmovies, setSimilarmovies] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [movie, setMovie] = useState<any>({});

  const { title, poster_path, release_date, id } = useLocalSearchParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getMovieDetail(id);
      getMovieCredits(id);
      getSimilarMovies(id);
    }
  }, [id]);

  async function getMovieDetail(movieId: any) {
    try {
      const data = await fetchMovieDetails(movieId);
      if (data) {
        setMovie(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function getMovieCredits(movieId: any) {
    try {
      const data = await fetchMovieCredits(movieId);
      if (data && data.cast) setCast(data.cast);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function getSimilarMovies(movieId: any) {
    try {
      const data = await fetchSimilarMovie(movieId);
      if (data && data.results) setSimilarmovies(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
        paddingTop: 45,
        backgroundColor: 'black',
      }}
    >
      <View
        style={{
          backgroundColor: 'black',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <SafeAreaView
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: 'rgba(0, 122, 255, 0.8)',
              borderRadius: 100,
            }}
            onPress={() => router.back()}
          >
            <AntDesign name="caretleft" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: 'rgba(0, 122, 255, 0.8)',
              borderRadius: 100,
            }}
            onPress={() => setLiked(!liked)}
          >
            <AntDesign name="heart" size={30} color={liked ? "red" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View style={{ backgroundColor: 'black', position: 'relative' }}>
            <Image
              source={{ uri: image185(poster_path) }}
              style={{
                height: 300,
                width: 350,
                borderRadius: 20,
                marginBottom: 20,
              }}
            />

            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0)', 'rgba(23,23,23,1)']}
              style={{
                position: 'absolute',
                bottom: 0,
                width: width,
                height: height * 0.4,
                borderRadius: 20,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}

        <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
          <Text
            style={{
              color: 'white',
              fontSize: 28,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            {title}
          </Text>
          {movie?.id && (
            <Text
              style={{
                color: 'gray',
                fontSize: 18,
                marginBottom: 20,
              }}
            >
              Released: {release_date}
            </Text>
          )}

          <View style={{ flexDirection: 'row' }}>
            {movie?.genres?.map((genre: any, index: any) => {
              const showDot = index + 1 !== movie.genres.length;
              return (
                <Text
                  key={index}
                  style={{
                    color: 'white',
                    fontSize: 20,
                    marginHorizontal: 5,
                  }}
                >
                  {genre?.name} {showDot ? ' * ' : null}
                </Text>
              );
            })}
          </View>
        </View>

        <Text style={{ textAlign: 'center', color: 'white', marginBottom: 20 }}>
          {movie?.overview}
        </Text>
      </View>
      {
        cast && <Cast cast={cast} />
      }
      <View style={{ paddingLeft: 15 }}>
        {similarmovies.length > 0 && <MovieList title="Related Movies" hideSeeAll={false} data={similarmovies} />}
      </View>
    </ScrollView>
  );
}
