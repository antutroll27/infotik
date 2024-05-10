import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({ children,onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                colors={['#53C8D8', '#668AF7']}
                style={tw`p-2 rounded-md flex items-center`}

            >
                <Text style={tw.style(`text-white text-sm`,{fontFamily: 'Montserrat'})}>{children}</Text>
            </LinearGradient>
        </TouchableOpacity>

    )
}


export default Button