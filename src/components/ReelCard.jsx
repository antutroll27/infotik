import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import tw from '../customtwrnc'
import { COLORS } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ReelCard = ({media,description,onPress}) => {
    return(
        <TouchableOpacity onPress={onPress}>
        <View style={tw`border border-[${COLORS.secondary}] w-[42] h-[55] rounded-md relative flex justify-end`}>
            <Image
                style={tw.style({resizeMode: 'cover'},`absolute top-0 left-0 right-0 bottom-0`)}
                source={{ uri: media[1] }}
            />
        
        <Text style={tw`text-white/80 p-2`}>
            {description}
        </Text>
        </View>
        </TouchableOpacity>
    )
}

export default ReelCard