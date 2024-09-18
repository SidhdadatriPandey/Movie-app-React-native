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
// import Header from "../../components/Header";
// import movies from "@/data/movies";
import { router } from "expo-router";
// import { MoviesCards } from '../Context';
import TicketComponent from '@/components/TicketComponent';
import Header from '@/components/Header';
import { MoviesCards } from '../context1';
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
    const navigation = useNavigation();
    const { ticket, movies }: any = useContext(MoviesCards)
    const data = movies;

    // return <Text>hey</Text>
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', marginVertical: 40 }}>
            {/* 780+32/0+32/0+32/0+32/0+32/Q    `` */}
            <Ionicons
                onPress={() => router.push('/(screens)/HomeScreen')}
                style={{
                    marginLeft: 5,
                    fontWeight: 'bold',
                    width: '100%',
                }}
                name="arrow-back"
                size={30}
                color="black"
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                ListHeaderComponent={ticket.length > 0 ? <TicketComponent /> : <Header />}
                data={data}
                style={{ width: "100%" }}
                contentContainerStyle={{
                    // width: "100%"


                }}
                renderItem={({ item }) => (

                    <Pressable style={{
                        alignItems: 'center',
                        width: "50%",
                        marginBottom: 10
                    }}>
                        <View>
                            <Image
                                style={{
                                    aspectRatio: 2 / 3,
                                    height: 240,
                                    borderRadius: 6,
                                }}
                                source={{ uri: item.image }}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "600",
                                    width: 170,
                                    marginTop: 10,
                                }}
                            >
                                {item.name.substring(0, 16)}
                            </Text>

                            <Text style={{ marginTop: 4, fontSize: 15, color: "gray" }}>
                                U/A • {item.language}
                            </Text>

                            <Text style={{ marginTop: 4, fontSize: 14, fontWeight: "500" }}>
                                {item.genre}
                            </Text>

                            <Pressable
                                onPress={() => {
                                    router.push({
                                        pathname: '/movieScreen',
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
                                    style={{ fontSize: 14, fontWeight: "500", textAlign: "center" }}
                                >
                                    BOOK
                                </Text>
                            </Pressable>
                        </View>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    )
}

export default HomeScreen