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

const Profile = ({route}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [change,setChange] = useState(false);
  const {userPosts} = useSelector(store => store.user);
 
  useEffect(() => {
    dispatch(getPostsByUserId(route.params.uid));

    (async function(){
      const user = await getUserById(route.params.uid);
      
      setUser(user);
      setChange(prev => !prev)
    })()
  },[])


  return (
    <RenderProfile user={user} change={change} posts={userPosts[route.params.uid]}/>
  )
}

export default Profile