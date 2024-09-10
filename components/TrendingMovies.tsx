// import { View, Text, TouchableWithoutFeedback, Dimensions, ScrollView } from 'react-native'
// import React from 'react'

// export default function TrendingMovies({trending}:any) {
//   const {width,height}=Dimensions.get('window');
//   return (
//     <View>
//       <Text>Trending</Text>
//       <ScrollView 
//       horizontal
//       showsHorizontalScrollIndicator={false}>
//         <View style={{width:200, height:100, backgroundColor:'blue'}}><Text>kjklkj</Text> </View>
//         <View style={{width:200, height:100, backgroundColor:'blue'}}><Text>kjklkj</Text>  </View>
//         <View style={{width:200, height:100, backgroundColor:'blue'}}><Text>kjklkj</Text>  </View>
//         <View style={{width:200, height:100, backgroundColor:'blue'}}><Text>kjklkj</Text>  </View>
//       </ScrollView>
//     </View>
//   )
// }


import { image500 } from '@/app/api/movieDb';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';

export default function TrendingMovies({ trending }: any) {
  const { width } = Dimensions.get('window');
  // useEffect(() => {
  //   console.log("we are in trending page");
  //   console.log(trending);
  // })

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'medium', marginBottom: 10, color: 'white' }}>Trending</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      // contentContainerStyle={{ paddingHorizontal: 10 }}
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
      <View
        style={{
          width: 250,
          height: 340,
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10, // Adds spacing between cards
          borderRadius: 10, // Optional: Add border radius for rounded corners
        }}
      >
        <Image
          // source={require('../assets/images/react-logo.png')}
          source={{ uri: image500(item.poster_path) }}
          style={{ height: 300, width: 240 }}
          resizeMode='contain'
        // resizeMode: 'contain'
        />
      </View>
    </TouchableWithoutFeedback>
  );
};