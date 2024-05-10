import React, { useLayoutEffect } from 'react'
import { useNavigation, StackActions } from '@react-navigation/native'
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

const Splash = () => {
    const {isAuth} = useSelector(store => store.user);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        if(isAuth == true){
            navigation.dispatch(StackActions.replace('home'));
        }else if(isAuth == false){
            navigation.dispatch(StackActions.replace('login'));
        }
    },[isAuth])

  return (
    <Text>Loading...{isAuth}</Text>
  )
}

export default Splash