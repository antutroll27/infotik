import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
// import { saveUserProfileImage } from '../../../services/user'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import NavBarGeneral from '../components/general/navbar'
import { saveUserProfileImage } from '../redux/actions/user'
import { COLORS } from '../constants'
import tw from '../customtwrnc'


export default function EditProfileScreen({}) {
    const {user} = useSelector(state => state.user)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })
        if (!result.canceled) {
          const image = result.assets[0].uri;
          dispatch(saveUserProfileImage(image));
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <NavBarGeneral title={'Edit Profile'}/>
            <View style={styles.imageContainer}>
                <TouchableOpacity
                    style={styles.imageViewContainer}
                    onPress={() => chooseImage()}
                >
                    <Image
                        style={styles.image}
                        source={{ uri: user?.photoURL }} />
                    <View style={styles.imageOverlay} />
                    <Feather name='camera' size={26} color='white' />
                </TouchableOpacity>
                <Text style={tw`text-white font-montserrat py-2`}>Change photo</Text>
            </View>

            <View style={styles.fieldsContainer}>
                <TouchableOpacity
                    style={styles.fieldItemContainer}
                    onPress={() => navigation.navigate('editProfileField', { title: 'Display Name', field: 'displayName', value: user?.displayName })}>
                    <Text style={tw`text-white font-montserrat py-2`}>Display Name</Text>
                    <View style={styles.fieldValueContainer}>
                        <Text style={tw`text-white font-montserrat py-2`}>{user.displayName}</Text>
                        <Feather name='chevron-right' size={20} color='gray' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.fieldItemContainer}
                    onPress={() => navigation.navigate('editProfileField', { title: 'Username', field: 'username', value: user?.username })}>
                    <Text style={tw`text-white font-montserrat py-2`}>Username</Text>
                    <View style={styles.fieldValueContainer}>
                        <Text style={tw`text-white font-montserrat py-2`}>{user.username}</Text>
                        <Feather name='chevron-right' size={20} color='gray' />
                    </View>
                    
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.fieldItemContainer}
                    onPress={() => navigation.navigate('editProfileField', { title: 'Bio', field: 'bio', value: user?.bio })}>
                    <Text style={tw`text-white font-montserrat py-2`}>Bio</Text>
                    <View style={styles.fieldValueContainer}>
                        <Text style={tw`text-white font-montserrat py-2`}>{user?.bio?.slice(0,27)}...</Text>
                        <Feather name='chevron-right' size={20} color='gray' />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    imageViewContainer: {
        backgroundColor: 'gray',
        height: 100,
        width: 100,
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 100,
        width: 100,
        position: 'absolute'
    },
    imageOverlay: {
        backgroundColor: 'rgba(0,0,0, 0.5)',
        ...StyleSheet.absoluteFill
    },

    fieldsContainer: {
        marginTop: 20,
        padding: 20,
        flex: 1
    },
    fieldItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fieldValueContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
