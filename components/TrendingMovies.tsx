import { image500 } from '@/app/api/movieDb';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function TrendingMovies({ trending }: any) {
  const { width } = Dimensions.get('window');

  return (
    <View style={{ marginVertical: hp(1) }}>
      <View style={{ marginVertical: hp(1) }}>
        <Text style={{ fontSize: hp(2.5), fontWeight: 'medium', marginBottom: 10, color: 'white', }}>Trending</Text>

      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}//
      >
        {trending.map((item: any, index: number) => (
          <MovieCard key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}


const MovieCard = ({ item }: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => router.push({
      pathname: '/(screens)/MovieScreen',
      params: {
        title: item.title,
        poster_path: item.poster_path,
        release_date: item.release_date,
        id: item.id
      }
    })}>
      <View style={{
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginRight: 10,
        borderRadius: 10,

      }}>
        <View
          style={{
            width: wp(53),
            height: hp(36),
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: image500(item.poster_path) }}
            style={{ height: hp(36), width: wp(53) }}
            resizeMode='stretch'
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};