import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Splash = () => {
  const { isAuth } = useSelector(store => store.user);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (isAuth === true) {
      navigation.dispatch(StackActions.replace('home'));
    } else if (isAuth === false) {
      navigation.dispatch(StackActions.replace('login'));
    }
  }, [isAuth, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash.png')} // make sure you have this image in the correct path
        style={styles.logo}
      />
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Or the color of your splash screen background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default Splash;
