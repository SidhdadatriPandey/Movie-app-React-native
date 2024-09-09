import { View } from 'react-native';
import React from 'react';
import { Bar, Pie, Circle, CircleSnail } from 'react-native-progress';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Loading() {
    return (
        <View style={{ backgroundColor: 'black', height: hp(100), alignItems: 'center', justifyContent: 'center' }}>
            {/* Bar progress example */}
            {/* <Bar progress={0.3} width={200} /> */}

            {/* Pie progress example */}
            {/* <Pie progress={0.4} size={50} /> */}

            {/* Circle progress with indeterminate state */}
            <Circle size={130} color='white' indeterminate={true} borderWidth={8} />

            {/* CircleSnail with multiple colors */}
            {/* <CircleSnail color={['red', 'green', 'blue']} /> */}
        </View>
    );
}
