import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Pressable,
} from "react-native";
import React, { useEffect, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from 'moment';
import SvgQRCode from "react-native-qrcode-svg";
import { router, useLocalSearchParams } from "expo-router";
import { MoviesCards } from "../context1";
// import { MoviesCards } from "../../context1";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TicketScreen = () => {
    const navigation = useNavigation();
    const context = useContext(MoviesCards);

    // Check if context is available
    if (!context) {
        throw new Error("MoviesCards context must be used within a MovieContext Provider");
    }

    const { ticket, setTicket } = context;
    const route: any = useRoute();

    const selectedSeatsData = route.params.selectedSeats.split(',');

    const ticketDetails = route.params;
    useEffect(() => {
        const loadTicket = () => {
            ticket.push(ticketDetails);
        }
        loadTicket();
    }, [])
    const { data } = useLocalSearchParams();
    // console.log('ticket', typeof (data));
    // console.log("ticket page", data);

    return (
        <SafeAreaView>
            <View
                style={{
                    backgroundColor: "white",
                    height: "90%",
                    margin: 10,
                    borderRadius: 6,
                    marginTop: 45
                }}
            >
                <View
                    style={{
                        padding: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={{ fontSize: hp(2.5), fontWeight: "500" }}>
                        {route.params.name}
                    </Text>
                    <Text style={{ fontSize: hp(2) }}>{selectedSeatsData.length}</Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginHorizontal: 10,
                    }}
                >
                    <Text style={{ fontSize: hp(2), color: "gray" }}>HINDI - 2D</Text>

                    <Text style={{ color: "red", fontSize: hp(2) }}>PVR TICKET</Text>
                </View>

                <Text
                    style={{
                        fontSize: hp(2),
                        fontWeight: "600",
                        marginHorizontal: 10,
                        marginTop: 9,
                    }}
                >
                    {route.params.mall}
                </Text>

                {/* <Text
                    style={{
                        borderRadius: 1,
                        borderStyle: "dashed",
                        borderColor: "#DCDCDC",
                        height: 1,
                        borderWidth: 0.5,
                        margin: 10,
                    }}
                /> */}

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 20
                    }}
                >
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ color: "gray", fontSize: hp(1.7), fontWeight: "500" }}>
                            DATE & TIME
                        </Text>
                        <Text style={{ marginVertical: 4, fontSize: hp(1.7) }}>
                            {route.params.timeSelected}
                        </Text>
                        <Text style={{ fontSize: hp(1.7) }}>
                            {moment(new Date(route.params.date)).utc().format("MM/DD/YYYY")}
                        </Text>
                        {/* <Text>{(route.params.date)}</Text> */}

                    </View>

                    <Image
                        style={{ aspectRatio: 4 / 2, height: hp(10), borderRadius: 6 }}
                        source={{ uri: route.params.image }}
                    />
                </View >

                {/* <Text
                    style={{
                        borderRadius: 1,
                        borderStyle: "dashed",
                        borderColor: "#DCDCDC",
                        height: 1,
                        borderWidth: 0.5,
                        margin: 10,
                        fontSize: hp(1.7)
                    }}
                /> */}

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 20
                    }}
                >
                    <View style={{ marginLeft: 14 }}>
                        <Text style={{ fontSize: hp(1.7) }}>AUDI NO</Text>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: hp(1.7),
                                fontWeight: "bold",
                                marginTop: 6,
                            }}
                        >
                            2
                        </Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: hp(1.7) }}>TICKETS</Text>
                        <Text
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                marginTop: 6,
                                fontSize: hp(1.7)
                            }}
                        >
                            {selectedSeatsData.length}
                        </Text>
                    </View>

                    <View style={{ marginRight: 15 }}>
                        <Text style={{ fontSize: hp(1.7) }}>SEATS</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {Array.isArray(selectedSeatsData) &&
                                selectedSeatsData.map((item: any, index: number) => (
                                    <Text
                                        key={index}
                                        style={{
                                            margin: 3,
                                            fontSize: hp(1.7),
                                            fontWeight: "bold",
                                            marginTop: 6,
                                        }}
                                    >
                                        {item}
                                    </Text>
                                ))}

                        </View>
                    </View>
                </View>

                {/* <Text
                    style={{
                        borderRadius: 1,
                        borderStyle: "dashed",
                        borderColor: "#DCDCDC",
                        height: 1,
                        borderWidth: 0.5,
                        margin: 10,
                    }}
                /> */}

                <View
                    style={{
                        // height: 140,
                        backgroundColor: "#8DA399",
                        borderRadius: 6,
                        marginVertical: 20,
                        padding: 10
                    }}
                >
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: hp(2), fontWeight: "bold" }}>
                            Price Details
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 4,
                            }}
                        >
                            <Text style={{ color: "white", fontSize: hp(1.7), fontWeight: "500" }}>
                                0's Seat convenience
                            </Text>
                            <Text style={{ color: "white", fontSize: hp(1.7), fontWeight: "500" }}>
                                ₹{route.params.priceValue}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 4,
                            }}
                        >
                            <Text style={{ color: "white", fontSize: hp(1.7), fontWeight: "500" }}>
                                Convenience Fee
                            </Text>
                            <Text style={{ color: "white", fontSize: hp(1.7), fontWeight: "500" }}>
                                ₹87
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 4,
                            }}
                        >
                            <Text style={{ color: "white", fontSize: hp(1.7), fontWeight: "500" }}>
                                Grand Total
                            </Text>
                            <Text style={{ color: "white", fontSize: hp(1.7), fontWeight: "500" }}>
                                ₹{route.params.total}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 4,
                            }}
                        >
                            <Text style={{ color: "white", fontSize: hp(1.7), fontWeight: "500" }}>
                                ID NO
                            </Text>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                                FGSJSDN3493943
                            </Text>
                        </View>
                    </View>
                </View>

                <Text
                    style={{
                        borderRadius: 1,
                        borderStyle: "dashed",
                        borderColor: "#DCDCDC",
                        height: 1,
                        borderWidth: 0.5,
                        margin: 10,
                    }}
                />
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                        marginBottom: 20,
                    }}
                >
                    <SvgQRCode value={"hello"} size={hp(15)} />
                </View>
                <Text style={{ fontSize: hp(1.7), fontWeight: "500", textAlign: "center" }}>
                    W33JNK3
                </Text>
                <Pressable
                    style={{
                        backgroundColor: "green",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: 120,
                        borderRadius: 4,
                        padding: 10,
                        marginTop: 10
                    }}
                    onPress={() => router.push('/HomeScreen')}
                >
                    <Text style={{ textAlign: "center", color: "white", fontSize: hp(1.7), }}>Home</Text>
                </Pressable>
            </View >
        </SafeAreaView >
    );
};

export default TicketScreen;

const styles = StyleSheet.create({});