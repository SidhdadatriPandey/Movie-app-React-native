import React, { useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    Pressable,
    FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import malls from "@/data/malls";
import { router } from "expo-router";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Mall = {
    name: string;
    tableData: any[];
    showtimes: string[];
};

type RouteParams = {
    name: string;
    image: string;
};

interface TheaterScreenParams {
    mall: string;
    name: string;
    timeSelected: string;
    tableSeats: string[];
    date: string;
    image: string;
}

const MovieScreen = () => {
    const route = useRoute();
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedMall, setSelectedMall] = useState<string | null>(null);
    const [seatsData, setSeatsData] = useState<string[]>([]);
    const mallsData: Mall[] = malls;
    const routeParams = route.params as RouteParams;

    return (
        <SafeAreaView style={{ flex: 1, padding: hp(1), paddingTop: hp(4.5) }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                        onPress={() => router.back()}
                        style={{ marginLeft: hp(.3) }}
                        name="arrow-back"
                        size={hp(3)}
                        color="black"
                    />
                </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: hp(1), marginLeft: hp(.3) }}>
                <AntDesign name="Safety" size={hp(3)} color="orange" />
                <Text style={{ paddingTop: hp(.3), paddingLeft: hp(.3), fontSize: hp(1.7) }}>Your safety is our priority</Text>
            </View>

            {mallsData.map((item, index) => (
                <Pressable
                    onPress={() => {
                        setSelectedMall(item.name);
                        setSeatsData(item?.tableData);
                    }}
                    style={{ margin: hp(1) }}
                    key={index}
                >
                    <Text style={{ fontSize: hp(2), fontWeight: "500", marginTop: hp(1) }}>{item.name}</Text>
                    {selectedMall === item.name ? (
                        <FlatList
                            numColumns={3}
                            data={item.showtimes}
                            keyExtractor={(item, idx) => idx.toString()}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => {
                                        const data: TheaterScreenParams = {
                                            mall: selectedMall,
                                            name: routeParams.name,
                                            timeSelected: item,
                                            tableSeats: seatsData,
                                            date: selectedDate,
                                            image: routeParams.image,
                                        };

                                        router.push({
                                            pathname: '/TheaterScreen',
                                            params: data as Record<string, any>,
                                        });
                                    }}
                                    style={{
                                        borderColor: "green",
                                        borderWidth: hp(.2),
                                        width: hp(10),
                                        borderRadius: 3,
                                        margin: hp(1),
                                        padding: hp(.5),
                                    }}
                                >
                                    <Text style={{
                                        fontSize: hp(1.7),
                                        color: "green",
                                        fontWeight: "500",
                                        textAlign: "center",
                                    }}>{item}</Text>
                                </Pressable>
                            )}
                        />
                    ) : null}
                </Pressable>
            ))}
        </SafeAreaView>
    );
};

export default MovieScreen;
