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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TicketScreen = () => {
    const navigation = useNavigation();
    const context = useContext(MoviesCards);

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
                    margin: hp(1),
                    borderRadius: hp(.4),
                    marginTop: hp(4.5)
                }}
            >
                <View
                    style={{
                        padding: hp(1),
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
                        marginHorizontal: hp(1),
                    }}
                >
                    <Text style={{ fontSize: hp(2), color: "gray" }}>HINDI - 2D</Text>

                    <Text style={{ color: "red", fontSize: hp(2) }}>PVR TICKET</Text>
                </View>

                <Text
                    style={{
                        fontSize: hp(2),
                        fontWeight: "600",
                        marginHorizontal: hp(1),
                        marginTop: hp(1),
                    }}
                >
                    {route.params.mall}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: hp(2)
                    }}
                >
                    <View style={{ marginTop: hp(1), marginLeft: hp(1) }}>
                        <Text style={{ color: "gray", fontSize: hp(1.7), fontWeight: "500" }}>
                            DATE & TIME
                        </Text>
                        <Text style={{ marginVertical: hp(.3), fontSize: hp(1.7) }}>
                            {route.params.timeSelected}
                        </Text>

                    </View>

                    <Image
                        style={{ aspectRatio: 4 / 2, height: hp(8), borderRadius: hp(.3), resizeMode: 'stretch' }}
                        source={{ uri: route.params.image }}
                    />
                </View >

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: hp(1.6)
                    }}
                >
                    <View style={{ marginLeft: hp(1) }}>
                        <Text style={{ fontSize: hp(1.7) }}>AUDI NO</Text>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: hp(1.7),
                                fontWeight: "bold",
                                marginTop: hp(.3),
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
                                marginTop: hp(.3),
                                fontSize: hp(1.7)
                            }}
                        >
                            {selectedSeatsData.length}
                        </Text>
                    </View>

                    <View style={{ marginRight: hp(1.2) }}>
                        <Text style={{ fontSize: hp(1.7) }}>SEATS</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {Array.isArray(selectedSeatsData) &&
                                selectedSeatsData.map((item: any, index: number) => (
                                    <Text
                                        key={index}
                                        style={{
                                            margin: hp(.2),
                                            fontSize: hp(1.7),
                                            fontWeight: "bold",
                                            marginTop: hp(.3),
                                            textAlign: 'center'
                                        }}
                                    >
                                        {item}
                                    </Text>
                                ))}

                        </View>
                    </View>
                </View>

                <View
                    style={{
                        // height: 140,
                        backgroundColor: "#8DA399",
                        borderRadius: hp(.3),
                        marginVertical: hp(1),
                        padding: hp(1)
                    }}
                >
                    <View style={{ padding: hp(1) }}>
                        <Text style={{ fontSize: hp(2), fontWeight: "bold" }}>
                            Price Details
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: hp(1),
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
                                marginTop: hp(.2),
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
                                marginTop: hp(.2),
                            }}
                        >
                            <Text style={{ color: "white", fontSize: hp(1.7), fontWeight: "500" }}>
                                ID NO
                            </Text>
                            <Text style={{ color: "white", fontSize: hp(1.7), fontWeight: "500" }}>
                                FGSJSDN3493943
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: hp(1),
                        marginBottom: hp(2),
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
                        width: hp(15),
                        borderRadius: hp(.2),
                        padding: hp(1),
                        marginTop: hp(1)
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