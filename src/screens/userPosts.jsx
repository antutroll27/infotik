import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import {useDispatch} from 'react-redux'
import Scroller from '../components/Scroller';

export const userPosts = ({route}) => {
   
    const [change,setChange] = useState(false);
    const [posts,setPosts] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
      setPosts(route.params.posts);
    },[route.params.posts])
  
  
    
  
  
    useEffect(() => {
      setChange(prev => !prev);
    },[posts])
  return (
    <View>
       <Scroller posts={route.params.posts} change={change} profile={true}/>  
    </View>
  )
}
