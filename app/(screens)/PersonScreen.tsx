import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import MovieList from '@/components/MovieList';
import Loading from '@/components/Loading';

export default function PersonScreen() {
    const [liked, setLiked] = useState<boolean>(false);
    const [personMovies, setPersonMovies] = useState<any>([1, 2, 3, 4, 5])
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: 20,
                paddingTop: 50,
                backgroundColor: 'black',
                paddingHorizontal: 10,
            }}
        >
            <SafeAreaView
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                    paddingHorizontal: 10,
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
                loading ? (<Loading />) : (<View>
                    <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 10 }}>
                        <View
                            style={{
                                borderRadius: 100,
                                overflow: 'hidden',
                                padding: 3,
                                backgroundColor: 'white',
                                width: 210,
                                height: 210,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                source={require('@/assets/images/react-logo.png')}
                                style={{ width: 190, height: 190 }}
                            />
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', marginBottom: 50 }}>
                        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                            Keanu Reeves
                        </Text>
                        <Text style={{ color: 'gray', fontSize: 18 }}>
                            London, United Kingdom
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderRadius: 10,
                            padding: 10,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ color: 'gray', fontSize: 14 }}>Gender</Text>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Male</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ color: 'gray', fontSize: 14 }}>Birthday</Text>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>1964-09-02</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ color: 'gray', fontSize: 14 }}>Known for</Text>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Acting</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ color: 'gray', fontSize: 14 }}>Popularity</Text>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>64.23</Text>
                        </View>
                    </View>

                    <View style={{ paddingVertical: 20 }}>
                        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Biography</Text>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit enim necessitatibus vitae magnam nam voluptatum dolore quis praesentium quos mollitia!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nihil culpa totam perspiciatis corporis impedit quae nisi. Corporis fuga suscipit mollitia minima, libero assumenda ullam consequatur culpa sit aut dolorum autem! Porro odit cupiditate cum!
                        </Text>
                    </View>

                    <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
                </View>)
            }


        </ScrollView>
    );
}
