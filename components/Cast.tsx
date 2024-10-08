import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { router, useRouter } from 'expo-router';
import { fallbackMoviePoster, image185 } from '@/app/api/movieDb';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Cast({ cast }: any) {
  let characterName = "Sidhdadatri Pandey jii";
  let personName = "Sidhdadatri Pandey son of Ramswaroop Pandey";
  // console.log('cast', cast);

  return (
    <View style={{ marginVertical: hp(1.5) }}>
      {
        cast.length > 0 && <Text
          style={{
            fontSize: hp(2.5),
            marginBottom: hp(1),
            color: 'white',
          }}
        >
          Top Cast
        </Text>
      }
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        {cast &&
          cast.map((person: any, index: any) => {
            return (
              person.profile_path && <TouchableOpacity
                key={index}
                style={{
                  marginRight: hp(1),
                  backgroundColor: '#333',
                  padding: hp(1),
                  borderRadius: hp(1),
                  alignItems: 'center',
                  gap: hp(.5)
                }}

                onPress={() => router.push({
                  pathname: '/(screens)/PersonScreen',
                  params: {
                    person_path: person.profile_path,
                    character: person.character,
                    original_name: person.original_name,
                    id: person.id,
                  }
                })}
              >
                <View style={{ borderRadius: wp(100), overflow: 'hidden', padding: hp(2), backgroundColor: 'blue', height: hp(20), width: hp(20), alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={{ uri: image185(person.profile_path) }}
                    style={{ height: hp(19), width: hp(19), borderRadius: wp(100), resizeMode: 'stretch' }}
                  />

                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: hp(2),
                  }}
                >
                  {person.character.length > 17 ? `${person.character.slice(0, 17)}...` : person.character}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: hp(2),
                  }}
                >
                  {person.original_name.length > 17 ? `${person.original_name.slice(0, 17)}...` : person.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
