import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Header = () => {
    const types = [
        {
            id: "0",
            name: "IMAX",
        },
        {
            id: "1",
            name: "4DX",
        },
        {
            id: "2",
            name: "PXL",
        },
        {
            id: "3",
            name: "GOLD",
        },
        {
            id: "4",
            name: "PLAYHOUSE",
        },
    ];

    return (
        <View>
            <View style={{ marginTop: hp(.1) }} />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: wp(95) }}>
                    {types.map((item, index) => (
                        <View style={{ margin: wp(1.3), borderColor: "C0C0C0", borderWidth: hp(.1), borderRadius: hp(.2), padding: hp(1) }} key={index}>
                            <Text style={{ textAlign: "center", fontSize: hp(1.7), fontWeight: "500" }}>{item.name}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({});
