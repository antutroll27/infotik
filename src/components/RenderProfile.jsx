import { View, Text,TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import {COLORS} from '../constants/index'
import tw from '../customtwrnc'
import { ScrollView } from 'react-native-gesture-handler'
import ProfileHeader from './ProfileHeader'
import ProfilePostList from './postList'
import { useDispatch } from 'react-redux'
const RenderProfile = ({user:puser,change,posts}) => {
    const [user, setUser] = useState({});
    const [newchange, setNewChange] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        setUser(puser)
        setNewChange(prev => !prev);
    },[change])


    const handleClose = () => {
      dispatch({type: "setOpen",open: false});
  }
  return (
    <TouchableWithoutFeedback onPress={handleClose}>

    
    <View style={tw`bg-[${COLORS.primary}] flex-1`}>
        <ScrollView>
          <ProfileHeader user={user} change={newchange}/>
          <View style={tw.style(`py-2 px-16 flex items-center justify-between flex-row border-b`,{borderBottomWidth: 1,borderColor: 'grey'})}>
            <TouchableOpacity style={tw`pb-2 border-b-2 border-white px-4`}>
              <Image source={require('../../assets/tabs.png')} style={{objectFit: 'contain'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={tw`pb-2 px-4`}>
              <Image source={require('../../assets/hideheart.png')} style={{objectFit: 'contain'}}/>
            </TouchableOpacity>
          </View>
          <ProfilePostList posts={posts} />
      </ScrollView>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default RenderProfile