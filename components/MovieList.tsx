import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { image185 } from '@/app/api/movieDb';

export default function MovieList({ title, hideSeeAll, data }: any) {
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
            >
                {
                    data.map((item: any, index: any) => {
                        return (
                            item.poster_path && <TouchableOpacity
                                key={index}
                                onPress={() => router.push({
                                    pathname: '/(screens)/MovieScreen',
                                    params: {
                                        title: item.title,
                                        poster_path: item.poster_path,
                                        release_date: item.release_date,
                                        id: item.id
                                    }
                                })}
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
                                            source={{ uri: image185(item.poster_path) }}
                                            style={{ height: 200, width: 180 }}
                                            resizeMode='cover'
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