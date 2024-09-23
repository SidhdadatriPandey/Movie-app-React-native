import React, { useContext } from 'react'
import {
    Text,
    View,
    FlatList,
    Pressable,
    Image,
    SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import TicketComponent from '@/components/TicketComponent';
import Header from '@/components/Header';
import { MoviesCards } from '../context1';
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { ticket, movies }: any = useContext(MoviesCards)
    const data = movies;

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', margin: 20 }}>
            <Ionicons
                onPress={() => router.push('/(screens)/HomeScreen')}
                style={{
                    marginLeft: 5,
                    fontWeight: 'bold',
                    width: '100%',
                }}
                name="arrow-back"
                size={hp(3)}
                color="black"
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                ListHeaderComponent={ticket.length > 0 ? <TicketComponent /> : <Header />}
                data={data}
                style={{ width: "100%" }}
                contentContainerStyle={{
                }}
                renderItem={({ item }) => (

                    <Pressable style={{
                        width: "50%",
                        marginBottom: 15
                    }}>
                        <View style={{ width: '80%' }}>
                            <View style={{
                                aspectRatio: 1,
                                width: "100%",
                                overflow: 'hidden',
                            }}>
                                <Image
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    source={{ uri: item.image }}
                                    resizeMode='stretch'

                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: hp(2),
                                    fontWeight: "600",
                                    // width: 170,
                                    marginTop: 10,
                                }}
                            >
                                {item.name.substring(0, 16)}
                            </Text>

                            <Text style={{ marginTop: 4, fontSize: hp(1.7), color: "gray" }}>
                                U/A • {item.language}
                            </Text>

                            <Text style={{ marginTop: 4, fontSize: hp(1.7), fontWeight: "500" }}>
                                {item.genre}
                            </Text>

                            <Pressable
                                onPress={() => {
                                    router.push({
                                        pathname: '/MovieScreen',
                                        params: {
                                            name: item.name,
                                            image: item.image,
                                        }
                                    });
                                }}

                                style={{
                                    backgroundColor: "#ffc40c",
                                    padding: 10,
                                    borderRadius: 6,
                                    marginRight: 10,
                                    width: 100,
                                    marginTop: 10,
                                }}
                            >
                                <Text
                                    style={{ fontSize: hp(1.7), fontWeight: "500", textAlign: "center" }}
                                >
                                    BOOK
                                </Text>
                            </Pressable>
                        </View>
                    </Pressable>
                )
                }
            />
        </SafeAreaView >
    )
}

export default HomeScreen