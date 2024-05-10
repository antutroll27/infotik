import { View, Text, TextInput } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { COLORS } from '../constants'

const Input = ({placeholder,value,setValue,secureTextEntry}) => {
  return (
    <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        style={tw.style(`p-2 px-3 text-gray-50 text-sm border-2 rounded-md border-[${COLORS.secondary}] my-3`,{fontFamily: 'Montserrat'})}
        placeholderTextColor={'gray'}
        secureTextEntry={secureTextEntry}
    />
  )
}

export default Input