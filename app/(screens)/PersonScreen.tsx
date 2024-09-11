import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Loading from '@/components/Loading';
import { image342 } from '../api/movieDb';

export default function PersonScreen() {
    const [liked, setLiked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { character, original_name, person_path, person } = useLocalSearchParams();

    useEffect(() => {
        if (typeof person === 'string') {
            console.log('Person details:', person);
            try {
                const personData = JSON.parse(person); // Only parse if `person` is a string
                console.log(personData.original_name);
                console.log(personData.character); // Access personData properties
            } catch (error) {
                console.error('Failed to parse person data:', error);
            }
        } else {
            console.log('Person data is not a string or not available');
        }
    }, [person]);

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

            {loading ? (
                <Loading />
            ) : (
                <View>
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
                                source={person_path ? ({ uri: image342(person_path) }) : require('@/assets/images/react-logo.png')}
                                style={{ width: 190, height: 190 }}
                            />
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', marginBottom: 50 }}>
                        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                            {character}
                        </Text>
                        <Text style={{ color: 'gray', fontSize: 18 }}>
                            {original_name}
                        </Text>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}