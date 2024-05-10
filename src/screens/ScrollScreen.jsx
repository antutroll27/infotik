import { View, Text, Dimensions, FlatList, StyleSheet, Button  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPost } from '../redux/actions/user'
import Scroller from '../components/Scroller'
import { Video, ResizeMode } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';

const ScrollScreen = () => {
  const {posts} = useSelector(store => store.user);
  const [change,setChange] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    (
      async function (){
       dispatch(getPost());
      }
    )()
  },[])


  


  useEffect(() => {
    console.log('change')
    setChange(prev => !prev);
  },[posts])
  return (
    <View>
       <Scroller posts={posts} change={change} profile={false}/>  
    </View>
  )
}

export default ScrollScreen