import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Pressable,
    Alert,
} from "react-native";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
// import { MoviesCards, moviesType } from "../Context1";
import { router } from "expo-router";
import { MoviesCards, moviesType } from "@/app/context1";
// import { MoviesCards, moviesType } from "../../../context1";
// import movies from "@/data/movies";


// Define context type for MoviesCards
type MoviesCardsContext = {
    seats: string[];
    setSeats: Dispatch<SetStateAction<string[]>>;
    occupied: string[]; // Keeping occupied as string[]
    movies: moviesType[];
    setMovies: any
};

const TheatreScreen: React.FC = () => {
    const route: any = useRoute<any>();
    const navigation = useNavigation();
    const { seats, setSeats, occupied, movies, setMovies } = useContext(MoviesCards) as MoviesCardsContext;

    const onSeatSelect = (seat: string) => {
        movies.map((itm: any, index: number) => {
            if (itm.name === route.params.name) {
                if (itm.occ1[route.params.mall].includes(seat)) return;
            }
        })
        if (occupied.includes(seat)) return;
        const seatSelected = seats.includes(seat);
        if (seatSelected) {
            setSeats(seats.filter((s) => s !== seat));
        } else {
            setSeats([...seats, seat]);
        }
    };

    const displaySeats = [...seats];
    const fee = 87;
    const noOfSeats = seats.length;
    const priceValue = noOfSeats * 240;
    const total = noOfSeats > 0 ? fee + noOfSeats * 240 : 0;

    const showSeats = () => {
        return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {seats.map((seat, index) => (
                    <Text
                        key={index}
                        style={{ marginTop: 4, fontSize: 17, paddingHorizontal: 4 }}
                    >
                        {seat}
                    </Text>
                ))}
            </View>
        );
    };


    function handleOnPress() {
        occupied.push(...seats);

        // Sample movie data logic where you update 'occ1' properly
        movies.map((itm: any, index: number) => {
            if (itm.name === route.params.name) {
                // Access occ1 directly from itm, not itm.name
                let temp = itm.occ1[route.params.mall] || []; // Initialize an empty array if no seats for the mall
                console.log('before:', temp); // Log the initial seats

                // Push the selected seats into the temp array
                temp.push(...seats);
                console.log('after:', temp); // Log the updated seats
                console.log(index)

                // Update the movie with the new seats
                let updatedMovie = { ...itm, occ1: { ...itm.occ1, [route.params.mall]: temp } };

                // Update the movies array by replacing the current movie
                setMovies((prevMovies: any) => {
                    const updatedMovies = [...prevMovies];
                    updatedMovies[index] = updatedMovie; // Replace the movie at the correct index
                    return updatedMovies; // Return the updated array
                });
            }
        });


        const data = {
            image: route.params.image,
            name: route.params.name,
            mall: route.params.mall,
            timeSelected: route.params.timeSelected,
            total: total,
            date: route.params.date,
            selectedSeats: displaySeats,
            priceValue: priceValue,
        }
        router.push({
            pathname: '/ticketScreen',
            params: data
        })
        setSeats([]);
    }
    // params: { data: JSON.stringify(data) }
    // useEffect(() => {
    //     console.log();
    //     console.log('selected mall', route.params.mall);
    //     console.log();
    // }, []);
    const subscribe = async () => {
        try {
            const response = await fetch("http://localhost:8000/payment", {
                method: "POST",
                body: JSON.stringify({
                    amount: Math.floor(total * 100),
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (!response.ok) {
                return Alert.alert(data.message);
            }

            const clientSecret = data.clientSecret;

            occupied.push(...seats);
            setSeats([]);
        } catch (error: any) {
            Alert.alert("Payment failed", error.message);
        }
    };
    // console.log(typeof route.params.tableSeats);
    const tempData = route.params.tableSeats.split(",")
    // console.log('tempData', route.params)
    return (
        <SafeAreaView style={{ paddingBottom: 330 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 40,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 5 }}
                        name="arrow-back"
                        size={24}
                        color="black"
                    />
                    <View style={{ marginLeft: 6 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600" }}>
                            {route.params.name}
                        </Text>
                        <Text
                            style={{
                                marginTop: 2,
                                color: "gray",
                                fontSize: 15,
                                fontWeight: "500",
                            }}
                        >
                            {route.params.mall}
                        </Text>
                    </View>
                </View>

                <AntDesign
                    style={{ marginRight: 12 }}
                    name="sharealt"
                    size={24}
                    color="black"
                />
            </View>

            <Text
                style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginTop: 10,
                }}
            >
                {route.params.timeSelected}
            </Text>

            <Text
                style={{
                    textAlign: "center",
                    fontSize: 13,
                    marginTop: 10,
                    color: "gray",
                }}
            >
                CLASSIC (240)
            </Text>

            <FlatList
                numColumns={7} // Display items in 7 columns
                data={tempData} // Seats data passed via route params
                keyExtractor={(item) => item} // Ensure a unique key for each seat
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => onSeatSelect(item)} // Handle seat selection
                        style={{
                            margin: 10,
                            borderColor: "gray",
                            borderWidth: 0.5,
                            borderRadius: 5,
                        }}
                    >
                        {/* All items will have the same background color */}
                        <View>
                            {
                                seats.includes(item) ? (
                                    <Text style={{ backgroundColor: "#ffc40c", padding: 8 }}>{item}</Text>
                                ) : (
                                    (() => {
                                        let found = false;
                                        movies.forEach((itm: any) => {
                                            if (itm.name === route.params.name) {
                                                if (itm.occ1[route.params.mall].includes(item)) {
                                                    found = true;
                                                }
                                            }
                                        });
                                        if (found) {
                                            return (
                                                <Text style={{ backgroundColor: "#989898", padding: 8 }}>{item}</Text>
                                            );
                                        } else {
                                            return <Text style={{ padding: 8 }}>{item}</Text>;
                                        }
                                    })()
                                )
                            }


                        </View>
                    </Pressable>
                )}
            />


            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 100,
                    marginTop: 20,
                    backgroundColor: "#D8D8D8",
                    padding: 10,
                }}
            >
                <View>
                    <FontAwesome
                        style={{ textAlign: "center", marginBottom: 4 }}
                        name="square"
                        size={24}
                        color="#ffc40c"
                    />
                    <Text>selected</Text>
                </View>

                <View style={{ marginHorizontal: 20 }}>
                    <FontAwesome
                        style={{ textAlign: "center", marginBottom: 4 }}
                        name="square"
                        size={24}
                        color="white"
                    />
                    <Text>Vacant</Text>
                </View>

                <View>
                    <FontAwesome
                        style={{ textAlign: "center", marginBottom: 4 }}
                        name="square"
                        size={24}
                        color="#989898"
                    />
                    <Text>Occupied</Text>
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 14,
                }}
            >
                <View style={{ padding: 10 }}>
                    <Text style={{ marginBottom: 4, fontSize: 15, fontWeight: "500" }}>
                        Show end time approx 6:51 PM
                    </Text>

                    {seats.length > 0 ? showSeats() : <Text>No seats selected</Text>}
                </View>

                <View
                    style={{
                        backgroundColor: "#E0E0E0",
                        padding: 10,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                        marginTop: 10,
                    }}
                >
                    <Text>Now with ticket cancellation</Text>
                </View>
            </View>

            <Pressable
                style={{
                    backgroundColor: "#ffc40c",
                    padding: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 20,
                }}
            >
                {seats.length > 0 ? (
                    <Text style={{ fontSize: 17, fontWeight: "500" }}>
                        {seats.length} seat(s) selected
                    </Text>
                ) : (
                    <Text></Text>
                )}
                {/* <View>{occupied.push[..seats]}</View> */}
                <Pressable
                    onPress={() => handleOnPress()}>
                    <Text style={{ fontSize: 17, fontWeight: "600" }}>PAY {total}</Text>
                </Pressable>
            </Pressable>
        </SafeAreaView>
    );
};

export default TheatreScreen;

const styles = StyleSheet.create({});

