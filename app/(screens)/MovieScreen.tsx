import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '@/components/Cast';
import MovieList from '@/components/MovieList';
import Loading from '@/components/Loading';

export default function MovieScreen({ item }: any) {
  const [liked, setLiked] = useState(false);
  let { height, width } = Dimensions.get('window');
  const moviename = "Stree2 kljjlkjl ljljljj iijioiohkh jhk";
  const [cast, setCast] = useState<any>([1, 2, 3, 4]);
  const [similarmovies, setSimilarmovies] = useState<any>([1, 2, 3, 4, 5, 6])
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
        paddingTop: 45,
        backgroundColor: 'black',
        marginTop: 0,
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

        {
          loading ? (<Loading />) : (<View
            style={{
              backgroundColor: 'black',
              position: 'relative',
            }}
          >
            <Image
              source={require('@/assets/images/react-logo.png')}
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
                height: height * 0.40,
                borderRadius: 20,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>)
        }



        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 28,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            {moviename}
          </Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 18,
              marginBottom: 20,
            }}
          >
            Released * 2020 * 170min
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                marginHorizontal: 5,
              }}
            >
              Action *
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                marginHorizontal: 5,
              }}
            >
              Thrill *
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                marginHorizontal: 5,
              }}
            >
              Comedy
            </Text>
          </View>
        </View>
        <Text style={{ textAlign: 'center', color: 'white' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque deleniti obcaecati velit iste a sit aliquam soluta facilis beatae fugiat.
        </Text>
      </View>
      <Cast cast={cast} />
      <View style={{ paddingLeft: 15 }}>
        <MovieList title='Related Movies' hideSeeAll={false} data={similarmovies} />
      </View>
    </ScrollView>
  );
}

// test
