import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { image185 } from '@/app/api/movieDb';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function MovieList({ title, hideSeeAll, data }: any) {
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(1) }}>
                <Text style={{ fontSize: hp(2.5), fontWeight: 'medium', marginBottom: 10, color: 'white' }}>{title}</Text>
                {
                    hideSeeAll && <TouchableOpacity>
                        <Text style={{ fontSize: hp(2.5), fontWeight: 'medium', marginBottom: 10, color: 'white' }}>See All</Text>
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
                                    }//
                                })}
                            >
                                <View>
                                    <View
                                        style={{
                                            width: wp(45),
                                            height: hp(32),
                                            backgroundColor: 'blue',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: 10,
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Image
                                            source={{ uri: image185(item.poster_path) }}
                                            style={{ height: hp(27), width: wp(45), resizeMode: 'stretch' }}
                                        // resizeMode='cover'
                                        />
                                        <Text style={{ color: 'white', marginTop: 5, fontSize: hp(2) }}>
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