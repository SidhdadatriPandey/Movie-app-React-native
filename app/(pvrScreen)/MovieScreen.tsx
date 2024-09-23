import React, { useState } from "react";
import {
    StyleSheet,
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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Ionicons
                        onPress={() => router.back()}
                        style={styles.backIcon}
                        name="arrow-back"
                        size={hp(3)}
                        color="black"
                    />
                </View>
            </View>

            <View style={styles.safetyInfo}>
                <AntDesign name="Safety" size={hp(3)} color="orange" />
                <Text style={styles.safetyText}>Your safety is our priority</Text>
            </View>

            {mallsData.map((item, index) => (
                <Pressable
                    onPress={() => {
                        setSelectedMall(item.name);
                        setSeatsData(item?.tableData);
                    }}
                    style={styles.mallItem}
                    key={index}
                >
                    <Text style={styles.mallName}>{item.name}</Text>
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

                                    style={styles.showtimeItem}
                                >

                                    <Text style={styles.showtimeText}>{item}</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 40,

    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    backIcon: {
        marginLeft: 5,
    },
    safetyInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 5,
    },
    safetyText: {
        paddingTop: 4,
        paddingLeft: 4,
        fontSize: hp(1.7)
    },
    selectedItemTextStyle: {
        fontSize: hp(2)
    },
    unselectedItemTextStyle: {
        fontSize: hp(2)
    },
    flatListContainerStyle: {
    },
    mallItem: {
        margin: 10,
    },
    mallName: {
        fontSize: hp(2),
        fontWeight: "500",
        marginTop: 15
    },
    showtimeItem: {
        borderColor: "green",
        borderWidth: 0.5,
        width: 93,
        borderRadius: 3,
        margin: 10,
        padding: 5,
    },
    showtimeText: {
        fontSize: hp(1.5),
        color: "green",
        fontWeight: "500",
        textAlign: "center",
    },
});
