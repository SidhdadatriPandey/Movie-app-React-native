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
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import malls from "@/data/malls";
import { router } from "expo-router";

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
    mall: string; // Type of selectedMall
    name: string; // Type of routeParams.name
    timeSelected: string; // Assuming 'item' is of type string (adjust based on actual type)
    tableSeats: string[]; // Assuming seatsData is of type number (adjust based on actual type)
    date: string; // Type of selectedDate (assuming string, adjust if necessary)
    image: string; // Type of routeParams.image
}


const MovieScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
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
                        size={24}
                        color="black"
                    />
                </View>

                <View style={styles.headerRight}>
                    <Ionicons name="search" size={24} color="black" />
                    <Ionicons name="share-outline" size={24} color="black" />
                </View>
            </View>

            <View style={styles.safetyInfo}>
                <AntDesign name="Safety" size={24} color="orange" />
                <Text style={styles.safetyText}>Your safety is our priority</Text>
            </View>

            <HorizontalDatepicker
                mode="gregorian"
                startDate={new Date("2022-08-24")}
                endDate={new Date("2022-08-30")}
                initialSelectedDate={new Date("2022-08-22")}
                onSelectedDateChange={(date: Date) => setSelectedDate(date.toDateString())}
                selectedItemWidth={170}
                unselectedItemWidth={38}
                itemHeight={38}
                itemRadius={10}
                selectedItemTextStyle={styles.selectedItemTextStyle}
                unselectedItemTextStyle={styles.selectedItemTextStyle}
                selectedItemBackgroundColor="#222831"
                unselectedItemBackgroundColor="#ececec"
                flatListContainerStyle={styles.flatListContainerStyle}
            />

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
                                        // console.log(seatsData);

                                        const data: TheaterScreenParams = {
                                            mall: selectedMall,
                                            name: routeParams.name,
                                            timeSelected: item,
                                            tableSeats: seatsData,
                                            date: selectedDate,
                                            image: routeParams.image,
                                        };

                                        router.push({
                                            pathname: '/theaterScreen',
                                            params: data as Record<string, any>, // Casting to Record<string, any>
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
        // margin: 'auto'

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
    },
    selectedItemTextStyle: {
        // Define styles here if needed
    },
    unselectedItemTextStyle: {
        // Define styles here if needed
    },
    flatListContainerStyle: {
        // Define styles here if needed
    },
    mallItem: {
        margin: 10,
    },
    mallName: {
        fontSize: 16,
        fontWeight: "500",
    },
    showtimeItem: {
        borderColor: "green",
        borderWidth: 0.5,
        width: 80,
        borderRadius: 3,
        margin: 10,
        padding: 5,
    },
    showtimeText: {
        fontSize: 15,
        color: "green",
        fontWeight: "500",
        textAlign: "center",
    },
});
