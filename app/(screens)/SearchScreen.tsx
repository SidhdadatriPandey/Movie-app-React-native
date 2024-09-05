import { View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';

export default function SearchScreen() {
    const [results, setResults] = useState<any>([1, 2, 3, 4, 5]);

    function handle(item: any) {
        router.push({
            pathname: '/(screens)/MovieScreen',
            params: { item }
        });
    }

    const movieName = "Gabbar is coming back again. This time on the big screen";

    return (
        <View style={{ backgroundColor: 'black', flex: 1, paddingTop: 50 }}>
            <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                paddingHorizontal: 15, 
                marginBottom: 20 
            }}>
                <TextInput
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
                {
                    results.map((item: any, index: number) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => handle(item)}
                            >
                                <View style={{
                                    marginBottom: 20,
                                    padding: 20,
                                    backgroundColor: '#444',
                                    borderRadius: 15,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 5,
                                    elevation: 5,
                                }}>
                                    <Image 
                                        source={require('@/assets/images/react-logo.png')}
                                        style={{
                                            width: '100%',
                                            height: 200,
                                            borderRadius: 10,
                                            marginBottom: 15,
                                        }}
                                        resizeMode="cover"
                                    />
                                    <Text style={{ 
                                        color: 'white', 
                                        fontSize: 18, 
                                        fontWeight: '500',
                                    }}>
                                        {
                                            movieName.length > 22 ? movieName.slice(0, 22) + '...' : movieName
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}
