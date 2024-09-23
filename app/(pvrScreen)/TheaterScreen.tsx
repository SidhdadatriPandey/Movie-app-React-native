import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
import { router } from "expo-router";
import { MoviesCards, moviesType } from "@/app/context1";


// Define context type for MoviesCards
type MoviesCardsContext = {
    seats: string[];
    setSeats: Dispatch<SetStateAction<string[]>>;
    movies: moviesType[];
    setMovies: Dispatch<SetStateAction<moviesType[]>>
};

const TheaterScreen: React.FC = () => {
    const route: any = useRoute<any>();
    const navigation = useNavigation();
    const { seats, setSeats, movies, setMovies } = useContext(MoviesCards) as MoviesCardsContext;

    const onSeatSelect = (seat: string) => {
        movies.map((itm: any, index: number) => {
            if (itm.name === route.params.name) {
                if (itm.occ1[route.params.mall]?.includes(seat)) return;
            }
        })
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

        movies.map((itm: any, index: number) => {
            if (itm.name === route.params.name) {
                let temp = itm.occ1[route.params.mall] || [];
                // console.log('before:', temp);

                temp.push(...seats);
                // console.log('after:', temp);
                // console.log(index)

                let updatedMovie = { ...itm, occ1: { ...itm.occ1, [route.params.mall]: temp } };

                setMovies((prevMovies: any) => {
                    const updatedMovies = [...prevMovies];
                    updatedMovies[index] = updatedMovie;
                    return updatedMovies;
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
        seats.length > 0 && router.push({
            pathname: '/TicketScreen',
            params: data
        })
        setSeats([]);
    }

    const tempData = route.params.tableSeats.split(",")
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
                        size={hp(3)}
                        color="black"
                    />
                    <View style={{ marginLeft: 6 }}>
                        <Text style={{ fontSize: hp(2), fontWeight: "600" }}>
                            {route.params.name}
                        </Text>
                        <Text
                            style={{
                                marginTop: 2,
                                color: "gray",
                                fontSize: hp(1.7),
                                fontWeight: "500",
                            }}
                        >
                            {route.params.mall}
                        </Text>
                    </View>
                </View>


            </View>

            <Text
                style={{
                    textAlign: "center",
                    fontSize: hp(2),
                    fontWeight: "bold",
                    marginTop: 10,
                }}
            >
                {route.params.timeSelected}
            </Text>

            <Text
                style={{
                    textAlign: "center",
                    fontSize: hp(1.7),
                    marginTop: 10,
                    color: "gray",
                }}
            >
                CLASSIC (240)
            </Text>

            <FlatList
                numColumns={7}
                data={tempData}
                keyExtractor={(item) => item}
                style={{ width: '100%' }}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => onSeatSelect(item)}
                        style={{
                            margin: hp(1),
                            width: wp(9.7),
                            borderColor: "gray",
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                    >
                        {/* All items will have the same background color */}
                        <View>
                            {
                                seats.includes(item) ? (
                                    <Text style={{
                                        backgroundColor: "#ffc40c", padding: 8, fontSize: hp(2), borderWidth: 1,
                                        borderRadius: 5,
                                    }}>{item}</Text>
                                ) : (
                                    (() => {
                                        let found = false;
                                        movies.forEach((itm: any) => {
                                            if (itm.name === route.params.name) {
                                                if (itm.occ1[route.params.mall]?.includes(item)) {
                                                    found = true;
                                                }
                                            }
                                        });
                                        if (found) {
                                            return (
                                                <Text style={{
                                                    backgroundColor: "#989898", padding: 8, fontSize: hp(2), borderWidth: 1,
                                                    borderRadius: 5,
                                                }}>{item}</Text>
                                            );
                                        } else {
                                            return <Text style={{
                                                padding: 8, fontSize: hp(2), borderWidth: 1,
                                                borderRadius: 5,
                                            }}>{item}</Text>;
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
                    width: wp(100),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: 'center',
                    // paddingLeft: 100,
                    marginTop: 20,
                    backgroundColor: "#D8D8D8",
                    padding: 10,
                    gap: 15,
                }}
            >
                <View>
                    <FontAwesome
                        style={{ textAlign: "center", marginBottom: 4 }}
                        name="square"
                        size={hp(3)}
                        color="#ffc40c"
                    />
                    <Text style={{ fontSize: hp(1.7) }}>Selected</Text>
                </View>

                <View>
                    <FontAwesome
                        style={{ textAlign: "center", marginBottom: 4 }}
                        name="square"
                        size={hp(3)}
                        color='white'
                    />
                    <Text style={{ fontSize: hp(1.7) }}>Vacant</Text>
                </View>

                <View>
                    <FontAwesome
                        style={{ textAlign: "center", marginBottom: 4 }}
                        name="square"
                        size={hp(3)}
                        color="#989898"
                    />
                    <Text style={{ fontSize: hp(1.7) }}>Occupied</Text>
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
                    <Text style={{ marginBottom: 4, fontSize: hp(1.7), fontWeight: "500" }}>
                        Show end time approx 6:51 PM
                    </Text>

                    {seats.length > 0 ? showSeats() : <Text style={{ fontSize: hp(1.7) }}>No seats selected</Text>}
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
                    <Text style={{ fontSize: hp(1.7) }}>Now with ticket cancellation</Text>
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
                    <Text style={{ fontSize: hp(1.7), fontWeight: "500" }}>
                        {seats.length} seat(s) selected
                    </Text>
                ) : (
                    <Text></Text>
                )}
                <Pressable
                    onPress={() => handleOnPress()}>
                    <Text style={{ fontSize: hp(1.7), fontWeight: "600" }}>PAY {total}</Text>
                </Pressable>
            </Pressable>
        </SafeAreaView>
    );
};

export default TheaterScreen;

const styles = StyleSheet.create({});

