import { View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Loading from '@/components/Loading';
import { image185, searchMovies } from '../api/movieDb';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Debounce function to avoid excessive API calls
function debounce(func: (...args: any[]) => void, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export default function SearchScreen() {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = (value: string) => {
        if (value && value.length > 2) {
            setLoading(true);
            searchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false);
                // console.log('got movies', data);
                if (data && data.results) setResults(data.results);
            }).catch(() => {
                setLoading(false);
                setResults([]);
            });
        } else {
            setLoading(false);
            setResults([]);//
        }
    };

    const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

    function handle(item: any) {
        router.push({
            pathname: '/(screens)/MovieScreen',
            params: {
                title: item.title,
                poster_path: item.poster_path,
                release_date: item.release_date,
                id: item.id
            }
        })
    }

    return (
        <View style={{ backgroundColor: 'black', flex: 1, paddingTop: hp(5) }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: hp(1.3),
                marginBottom: hp(1.4)
            }}>
                <TextInput
                    autoFocus
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    style={{
                        color: 'white',
                        flex: 1,
                        borderBottomWidth: hp(.2),
                        borderBottomColor: 'lightgray',
                        paddingVertical: hp(.7),
                        paddingHorizontal: hp(1),
                        backgroundColor: '#222',
                        borderRadius: hp(1),
                        fontSize: hp(2)
                    }}
                />
                <TouchableOpacity
                    onPress={() => router.push('/(screens)/HomeScreen')}
                    style={{
                        marginLeft: hp(1),
                        backgroundColor: '#555',
                        padding: hp(.7),
                        borderRadius: wp(100),
                    }}
                >
                    <Entypo name="cross" size={hp(3.5)} color="white" />
                </TouchableOpacity>
            </View>

            {
                loading ? (
                    <Loading />
                ) : (
                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: hp(1) }}
                        >
                            <Text style={{
                                fontSize: hp(3),
                                color: 'white',
                                marginBottom: hp(1),
                                fontWeight: 'bold',
                            }}>
                                Results
                            </Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: hp(1.5), justifyContent: 'space-between' }}>
                                {
                                    results.map((item: any, index: number) => (
                                        item.poster_path && <TouchableWithoutFeedback
                                            key={index}
                                            onPress={() => handle(item)}
                                        >
                                            <View style={{
                                                backgroundColor: '#444',
                                                borderRadius: hp(1),
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.8,
                                                shadowRadius: 5,
                                                elevation: 5,
                                                width: wp(42),
                                                padding: hp(.3)
                                            }}>
                                                <Image
                                                    source={item.poster_path && { uri: image185(item.poster_path) }}
                                                    style={{
                                                        width: '100%',
                                                        height: hp(25),
                                                        borderRadius: hp(1),
                                                        resizeMode: 'stretch'
                                                    }}
                                                />
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: hp(2),
                                                    fontWeight: '500',
                                                    textAlign: 'center'
                                                }}>
                                                    {item.title.length > 17 ? `${item.title.slice(0, 17)}...` : item.title}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    ))
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View>
                            <Text style={{
                                fontSize: hp(3.5),
                                fontWeight: '500',
                                marginTop: hp(40),
                                textAlign: 'center',
                                color: 'white'
                            }}>
                                No result found
                            </Text>
                        </View>
                    )
                )
            }
        </View >
    );
}
