import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { fallbackMoviePoster, image185, image342 } from '@/app/api/movieDb';

export default function MovieList({ title, hideSeeAll, data }: any) {
    const Moviename = "Stree 2 lllllllllllllllllllllllllllllllllll";
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 22, fontWeight: 'medium', marginBottom: 10, color: 'white' }}>{title}</Text>
                {
                    hideSeeAll && <TouchableOpacity>
                        <Text style={{ fontSize: 22, fontWeight: 'medium', marginBottom: 10, color: 'white' }}>See All</Text>
                    </TouchableOpacity>
                }
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{ paddingLeft: 15 }}
            >
                {
                    data.map((item: any, index: any) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => router.push('/(screens)/MovieScreen')}
                            >
                                <View>
                                    <View
                                        style={{
                                            width: 180,
                                            height: 250,
                                            backgroundColor: 'blue',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: 10, // Adds spacing between cards
                                            borderRadius: 10, // Optional: Add border radius for rounded corners
                                        }}
                                    >
                                        <Image
                                            // source={require('../assets/images/react-logo.png')}
                                            source={{ uri: image185(item.poster_path) }}
                                            style={{ height: 200, width: 180 }}
                                            resizeMode='cover'
                                        // resizeMode: 'contain'
                                        />
                                        <Text style={{ color: 'white', marginTop: 5, fontSize: 17 }}>
                                            {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    )
                }
            </ScrollView>
        </View>
    )
}