import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { MoviesCards } from '@/app/context1';
// import { MoviesCards } from '@/app/Context';

const TicketComponent = () => {
    const { ticket }: any = useContext(MoviesCards);
    return (
        <View>
            {ticket.slice(0, 1).map((item: any, index: number) => (
                <ImageBackground
                    style={{ width: '100%', height: 170, flexDirection: 'row', justifyContent: 'center' }}
                    source={{
                        uri: item.image,
                    }}
                    key={index}
                >
                    <Pressable
                        style={{
                            position: "absolute",
                            height: 130,
                            backgroundColor: "white",
                            padding: 10,
                            borderRadius: 6,
                            marginHorizontal: 'auto',
                            top: 140,
                            // left: 40,
                            width: "82%",
                        }}
                    >
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>YOUR TICKET</Text>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                // margin: 'auto',
                                justifyContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
                                <Text style={{ fontSize: 16, fontWeight: "400", color: "gray", marginTop: 4, }}>U/A • KANNADA</Text>
                            </View>

                            <Pressable style={{ backgroundColor: "#ffc40c", padding: 10, borderRadius: 6, marginRight: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: "500", textAlign: "center" }}>VIEW TICKET</Text>
                            </Pressable>


                        </View>
                        <Text style={{ marginTop: 8, fontSize: 15, fontWeight: "500" }}>{item.mall}</Text>
                    </Pressable>
                </ImageBackground>
            ))}

            <View style={{ marginTop: 110, }} />


        </View>
    )
}

export default TicketComponent

const styles = StyleSheet.create({})