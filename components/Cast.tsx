import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { router, useRouter } from 'expo-router';
import { fallbackMoviePoster, image185 } from '@/app/api/movieDb';

export default function Cast({ cast }: any) {
  let characterName = "Sidhdadatri Pandey jii";
  let personName = "Sidhdadatri Pandey son of Ramswaroop Pandey";
  return (
    <View style={{ marginVertical: 20 }}>
      {
        cast.length > 0 && <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginBottom: 10,
            paddingHorizontal: 15,
            color: 'white', // Adjust color to fit the rest of your theme
          }}
        >
          Top Cast
        </Text>
      }
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person: any, index: any) => {
            return (
              person.profile_path && <TouchableOpacity
                key={index}
                style={{
                  marginRight: 15,
                  backgroundColor: '#333',
                  padding: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  gap: 5
                }}
                onPress={() => router.push({
                  pathname: '/(screens)/PersonScreen',
                  params: {
                    person_path: person.profile_path,
                    character: person.character,
                    original_name: person.original_name,
                    // person: JSON.stringify(person),
                    person
                  }
                })}
              >
                <View style={{ borderRadius: 100, overflow: 'hidden', padding: 3, backgroundColor: 'white' }}>
                  <Image
                    source={{ uri: image185(person.profile_path) }} // Use the passed profile_path or fallback to local image
                    style={{ height: 120, width: 120 }}
                    resizeMode="cover"
                  />

                </View>
                <Text
                  style={{
                    color: 'white', // Text color for readability
                    fontSize: 18,
                  }}
                >
                  {person.character.length > 17 ? `${person.character.slice(0, 17)}...` : person.character}
                </Text>
                <Text
                  style={{
                    color: 'white', // Text color for readability
                    fontSize: 18,
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
