import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import ProfileHeader from '../components/ProfileHeader'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsByUserId, getUserById } from '../redux/actions/user'
import ProfilePostList from '../components/postList'
import tw from '../customtwrnc'
import {COLORS} from '../constants/index'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import RenderProfile from '../components/RenderProfile'

const MyProfile = () => {
  const dispatch = useDispatch();
  const [change,setChange] = useState(false);
  const {userPosts,user} = useSelector(store => store.user);
  useEffect(() => {
    if(user){
        dispatch(getPostsByUserId(user.uid));
        setChange(prev => !prev);
    }
  },[user])


  return (
    <RenderProfile user={user} change={change} posts={userPosts[user?.uid]}/>
  )
}

export default MyProfile