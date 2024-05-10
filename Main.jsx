import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from './src/screens/Login'
import Register from './src/screens/Register'

import Home from './src/screens/Home'
import Splash from './src/screens/Splash'
import Keyword from './src/screens/Keyword'
import SavePostScreen from './src/screens/SavePost'
import Test from './src/screens/Test'
import Profile from './src/screens/Profile'
import EditProfileScreen from './src/screens/EditProfile';
import { userPosts } from './src/screens/userPosts'
import EditProfileFieldScreen from './src/screens/EditProfileFieldScreen'

const Stack = createNativeStackNavigator();

const main = () => {
  
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='splash'>
      
      <Stack.Screen name='splash' component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='register' component={Register} options={{ headerShown: false }} />
      <Stack.Screen name='keyword' component={Keyword} options={{ headerShown: false }} />

      <Stack.Screen name='home' component={Home} options={{ headerShown: false }} />
      <Stack.Screen name='savePost' component={SavePostScreen} options={{ headerShown: false }} />
      <Stack.Screen name='profile' component={Profile} options={{ headerShown: false }} />
      
      <Stack.Screen name="editProfile" component={EditProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="userPosts" component={userPosts} options={{ headerShown: false }} />
      <Stack.Screen name="editProfileField" component={EditProfileFieldScreen} options={{ headerShown: false }} />
      
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default main