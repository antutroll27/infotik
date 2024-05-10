import React, { useLayoutEffect } from 'react'
import { ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { ClearError, ClearMessage } from '../redux/ActionType';
import { loadme } from '../redux/actions/user';

const MessageProvider = ({children}) => {
    const {error, message} = useSelector(store => store.user);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        if(error){
            ToastAndroid.show(error, ToastAndroid.SHORT);
            dispatch({type: ClearError})
        }

        if(message){
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({type: ClearMessage})
        }
        
    },[error,message]);



    useLayoutEffect(() => {
        dispatch(loadme());
    },[])
  return (children)
}

export default MessageProvider