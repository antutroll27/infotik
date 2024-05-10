import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Feather } from "@expo/vector-icons";
import Keyword from './Keyword'
import { COLORS } from '../constants';
import CameraScreen from './Camera';
import ScrollScreen from './ScrollScreen';
import Test from './Test'
import { useNavigation } from 'expo-router';
import Profile from './Profile';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import MyProfile from './MyProfile';
import Discover from './Discover';



const Tab = createMaterialBottomTabNavigator();

const CustomTabBarIcon = ({ name, color,label }) => {
  

  return (
    <View style={{ width: 65, height: 50, position: 'relative', bottom: label == "Scroll" ? 10 : 4,backgroundColor:'black',  display: 'flex', alignItems: 'center' }}>
      {
        label != "Scroll" ? (
          <Feather name={name} size={color == COLORS.secondary ? 28: 24} color={color} />
        ): (
          <Image source={color == COLORS.secondary ? require('../../assets/iconcolor.png') : require('../../assets/iconlogo.png')} style={{ width: 35, height: 35, resizeMode: 'contain' }}/>
        )
      }
      
      <Text style={{color: color == COLORS.secondary ? 'white': 'gray',fontSize:  color == COLORS.secondary ? 12: 10,fontFamily: 'Montserrat'}}>{label}</Text>
    </View>
  );
};

const Home = () => {


  const {user} = useSelector(store => store.user);

  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "black" }}
      activeColor={COLORS.secondary}
      initialRouteName={'scroll'}
    >
      <Tab.Screen
        name="create"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomTabBarIcon name="plus" color={color} label={'Create'}/>
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="discover"
        component={Discover}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomTabBarIcon name="search" color={color} label={'Discover'}/>
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="scroll"
        component={ScrollScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomTabBarIcon name="search" color={color} label={'Scroll'}/>
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="inbox"
        component={Keyword}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomTabBarIcon name="message-square" color={color} label={'Inbox'}/>
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="me"
        component={MyProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <CustomTabBarIcon name="user" color={color} label={'Me'}/>
          ),
          tabBarLabel: '',
        }}
        
      />
      
    </Tab.Navigator>
  )
}

export default Home