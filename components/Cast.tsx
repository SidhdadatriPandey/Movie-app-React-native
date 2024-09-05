import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { router, useRouter } from 'expo-router';

export default function Cast({ cast }: any) {
  let characterName = "Sidhdadatri Pandey jii";
  let personName = "Sidhdadatri Pandey son of Ramswaroop Pandey";
  return (
    <View style={{ marginVertical: 20 }}>
      <Text
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person: any, index: any) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  marginRight: 15,
                  backgroundColor: '#333',
                  padding: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  gap:5
                }}
                onPress={()=>router.push('/(screens)/PersonScreen')}
              >
                <View style={{borderRadius:100, overflow:'hidden', padding:3, backgroundColor:'white'}}>
                    <Image 
                        source={require('../assets/images/react-logo.png')}
                    />
                </View>
                <Text
                  style={{
                    color: 'white', // Text color for readability
                    fontSize: 18,
                  }}
                >
                  {characterName.length > 10 ? `${characterName.slice(0, 10)}...` : characterName}
                </Text>
                <Text
                  style={{
                    color: 'white', // Text color for readability
                    fontSize: 18,
                  }}
                >
                  {characterName.length > 10 ? `${personName.slice(0, 10)}...` : characterName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
