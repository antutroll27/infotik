import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Divider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBarGeneral from '../components/general/navbar'
import { COLORS } from '../constants'
import { saveUserField } from '../redux/actions/user'
import {useDispatch} from 'react-redux'
// import { saveUserField } from '../../../../services/user'


export default function EditProfileFieldScreen({ route }) {
    const { title, field, value } = route.params
    const [textInputValue, setTextInputValue] = useState(value)
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const onSave = async () => {
        await dispatch(saveUserField(field, textInputValue));
        navigation.goBack();
    }
    return (
        <SafeAreaView style={styles.container}>
            <NavBarGeneral title={title} rightButton={{ display: true, name: 'save', action: onSave }} />
            <Divider />
            <View style={styles.mainContainer}>
                <Text style={styles.title}>{title}</Text>
                <TextInput
                    style={generalStyles.textInput}
                    value={textInputValue}
                    onChangeText={setTextInputValue}
                />
            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    mainContainer: {
        padding: 20
    },
    title: {
        fontWeight: 'bold',
        color: 'gray'
    }

});

const generalStyles = StyleSheet.create({
    textInput: {
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 5,
        color: 'white'
    },
    avatarSmall: {
        height: 32,
        width: 32,
        borderRadius: 16
    }
});
