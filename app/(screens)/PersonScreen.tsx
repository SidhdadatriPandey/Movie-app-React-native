import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Loading from '@/components/Loading';
import { fetchPersonDetails, fetchPersonMovies, image342 } from '../api/movieDb';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MovieList from '@/components/MovieList';

export default function PersonScreen() {
    const [liked, setLiked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [person, setPerson] = useState<any>([]);
    const [personMovies, setPersonMovies] = useState<any>([])
    const router = useRouter();
    const { character, original_name, person_path, id } = useLocalSearchParams();

    useEffect(() => {
        setLoading(true);
        getParsonDetails(id);
        getPersonMovies(id);
    },
        []);

    async function getParsonDetails(id: any) {
        const data = await fetchPersonDetails(id);
        // console.log('get person detail ', data);
        setPerson(data);
        setLoading(false);
    }

    async function getPersonMovies(id: any) {
        const data = await fetchPersonMovies(id);
        // console.log('get person movies', data); 
        // console.log('get person movies cast only', data.cast);
        // console.log(typeof (data.cast));
        if (data && data.cast) setPersonMovies(data.cast)
        setLoading(false);
    }

    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: 20,
                paddingTop: 50,
                backgroundColor: 'black',
                paddingHorizontal: 10,
                minHeight: hp(100)
            }}
        >
            {/* <SafeAreaView
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
                    <AntDesign name="caretleft" size={hp(4)} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        backgroundColor: 'rgba(0, 122, 255, 0.8)',
                        borderRadius: 100,
                    }}
                    onPress={() => setLiked(!liked)}
                >
                    <AntDesign name="heart" size={hp(4)} color={liked ? "red" : "white"} />
                </TouchableOpacity>
            </SafeAreaView> */}
            <SafeAreaView
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: hp(2),
                }}
            >
                <TouchableOpacity
                    style={{
                        padding: hp(1.5),
                        backgroundColor: 'rgba(0, 122, 255, 0.8)',
                        borderRadius: wp(100),
                    }}
                    onPress={() => router.back()}
                >
                    <AntDesign name="caretleft" size={hp(4)} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        padding: hp(1.5),
                        backgroundColor: 'rgba(0, 122, 255, 0.8)',
                        borderRadius: wp(100),
                    }}
                    onPress={() => setLiked(!liked)}
                >
                    <AntDesign name="heart" size={hp(4)} color={liked ? "red" : "white"} />
                </TouchableOpacity>
            </SafeAreaView>

            {loading ? (
                <Loading />
            ) : (
                <View>
                    <View style={{ alignItems: 'center', marginTop: hp(2), marginBottom: hp(1) }}>
                        <View
                            style={{
                                borderRadius: wp(100),
                                // overflow: 'hidden',
                                // padding: 3,
                                backgroundColor: 'blue',
                                width: hp(28),
                                height: hp(28),
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}
                        >
                            <Image
                                source={person_path ? ({ uri: image342(person_path) }) : require('@/assets/images/react-logo.png')}
                                style={{ width: hp(25), height: hp(25), resizeMode: 'stretch', borderRadius: wp(100), }}
                            />
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', marginBottom: hp(3) }}>
                        <Text style={{ color: 'white', fontSize: hp(4), fontWeight: 'bold', textAlign: 'center' }}>
                            {character}
                        </Text>
                        <Text style={{ color: 'gray', fontSize: hp(2.5), textAlign: 'center' }}>
                            {original_name}
                        </Text>
                        <Text style={{ color: 'gray', fontSize: hp(2.5), textAlign: 'center' }}>
                            {person?.place_of_birth}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View>
                            <Text style={{ color: 'white', fontSize: hp(2.2) }}>Gender</Text>
                            <Text style={{ color: 'gray', fontSize: hp(2), textAlign: 'center' }}>
                                {person?.gender == 1 ? 'Female' : 'Male'}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white', fontSize: hp(2.2) }}>Birthday</Text>
                            <Text style={{ color: 'gray', fontSize: hp(2), textAlign: 'center' }}>
                                {person?.birthday}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white', fontSize: hp(2.2) }}>Known for</Text>
                            <Text style={{ color: 'gray', fontSize: hp(2), textAlign: 'center' }}>
                                {person?.known_for_department}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white', fontSize: hp(2.2) }}>Popularity</Text>
                            <Text style={{ color: 'gray', fontSize: hp(2), textAlign: 'center' }}>
                                {person?.popularity?.toFixed(2)} %
                            </Text>
                        </View>
                    </View>

                    <View style={{ marginVertical: hp(1.3) }}>
                        <Text style={{ color: 'white', fontSize: hp(3) }}>Biography</Text>
                        <Text style={{ color: 'gray', fontSize: hp(1.8) }}>{person?.biography}</Text>
                    </View>
                    <MovieList title={'Movie'} hideSeeAll={true} data={personMovies} />
                </View>

            )}

        </ScrollView>
    );
}