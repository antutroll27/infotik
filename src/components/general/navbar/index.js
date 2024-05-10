import React, { useState } from 'react'
import { View, Text, Touchable, TouchableOpacity, Dimensions } from 'react-native'
import styles from './styles'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../constants'
import tw from '../../../customtwrnc'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/actions/user'
import {TouchableWithoutFeedback} from 'react-native';
const window = Dimensions.get('window');

export default function NavBarGeneral({ title = 'NavBarGeneral', leftButton = { display: true }, rightButton = { display: false } },setOpen) {
    const {open} = useSelector(store => store.user)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigation.reset({
            index: 0,
            routes: [{ name: 'login' }],
        });
    }


    const handleOpen = () => {
        dispatch({type: "setOpen",open: true})
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => leftButton.display ? navigation.goBack() : null}>
                {leftButton.display &&
                    <Feather name='arrow-left' size={26} color={'white'}/>
                }
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity style={styles.button} onPress={() => rightButton.action ? rightButton.action() : handleOpen()}>
                {rightButton.display &&
                    <Feather name={rightButton.name} size={26} color={rightButton.color ?? COLORS.secondary } />
                }
            </TouchableOpacity>

            
                <View style={tw`w-[100px] p-5 bg-white absolute top-10 z-10 right-3 rounded-md flex gap-2 ${open ? '' : 'hidden'}`}>
                    <TouchableOpacity  onPress={handleLogout}>
                        <Text style={tw`text-red-600 text-lg`}>Logout</Text>
                    </TouchableOpacity>
                </View>
            
            
        </View>

    )
}
