import { View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Loading from '@/components/Loading';
import { image185, searchMovies } from '../api/movieDb';

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
            setResults([]);
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
        <View style={{ backgroundColor: 'black', flex: 1, paddingTop: 50 }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
                marginBottom: 20
            }}>
                <TextInput
                    autoFocus
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    style={{
                        color: 'white',
                        flex: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: 'lightgray',
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        backgroundColor: '#222',
                        borderRadius: 8,
                    }}
                />
                <TouchableOpacity
                    onPress={() => router.push('/(screens)/HomeScreen')}
                    style={{
                        marginLeft: 10,
                        backgroundColor: '#555',
                        padding: 8,
                        borderRadius: 50,
                    }}
                >
                    <Entypo name="cross" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {
                loading ? (
                    <Loading />
                ) : (
                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                        >
                            <Text style={{
                                fontSize: 30,
                                color: 'white',
                                marginBottom: 10,
                                fontWeight: 'bold',
                            }}>
                                Results
                            </Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between' }}>
                                {
                                    results.map((item: any, index: number) => (
                                        item.poster_path && <TouchableWithoutFeedback
                                            key={index}
                                            onPress={() => handle(item)}
                                        >
                                            <View style={{
                                                backgroundColor: '#444',
                                                borderRadius: 15,
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.8,
                                                shadowRadius: 5,
                                                elevation: 5,
                                                width: 170,
                                                padding: 5
                                            }}>
                                                <Image
                                                    source={item.poster_path && { uri: image185(item.poster_path) }}
                                                    style={{
                                                        width: '100%',
                                                        height: 200,
                                                        borderRadius: 10,
                                                    }}
                                                    resizeMode="contain"
                                                />
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: 18,
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
                                fontSize: 30,
                                fontWeight: '500',
                                marginTop: 300,
                                textAlign: 'center',
                                color: 'white'
                            }}>
                                No result found
                            </Text>
                        </View>
                    )
                )
            }
        </View>
    );
}
