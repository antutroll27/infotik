import { Video,ResizeMode } from 'expo-av'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { View, Text, Button, StyleSheet, ActivityIndicator, Linking, TouchableOpacity, FlatList, TouchableWithoutFeedback, Image } from 'react-native'
// import { useUser } from '../../hooks/useUser'
// import PostSingleOverlay from './overlay'
import styles from './styles'
import {COLORS} from '../../constants'
import tw from '../../customtwrnc'
import { Feather } from "@expo/vector-icons";
import { LikePost, checkLike, getUserById } from '../../redux/actions/user'
import { LinearGradient } from 'expo-linear-gradient';
import CommentModel from './CommentModel';
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-paper'

const renderItem = ({ item }) => (
    <TouchableOpacity>
        <View style={tw`mx-1`}>
            <Text style={tw`text-sm text-[${COLORS.secondary}] font-montserrat`}>{item}</Text>
        </View>
    </TouchableOpacity>
);

export const PostSingle = forwardRef(({ item }, parentRef) => {
    const video = React.useRef(null);
    const timeoutref = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = useState(null);
    const [longPressTimer, setLongPressTimer] = useState(null);
    const [videoStop, setVideoStop] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [likeLoading, setLikeLoading] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const bottomSheetModalRef = useRef(null);
    const navigation = useNavigation();
    const [mute, setMute] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    
    
    useImperativeHandle(parentRef, () => ({
        play,
        unload,
        stop
    }))

    useEffect(() => {
        return () => {
            console.log("unloading")
            unload()
        };
    }, [])



    const handleLoadStart = () => {
        setIsLoading(true);
    };

    const handleReadyForDisplay = () => {
        setIsLoading(false);
    };


   
    const play = async () => {
        if (video.current == null) {
            return;
        }

        // if video is already playing return
        const status = await video.current.getStatusAsync();
        if (status?.isPlaying) {
            return;
        }
        try {
            await video.current.playAsync();
        } catch (e) {
            console.log('error',e.message)
        }
    }


 
    const stop = async () => {
        if (video.current == null) {
            return;
        }

        // if video is already stopped return
        const status = await video.current.getStatusAsync();
        if (!status?.isPlaying) {
            return;
        }
        try {
            await video.current.stopAsync();
        } catch (e) {
            console.log(e)
        }
    }


    
    const unload = async () => {
        if (video.current == null) {
            return;
        }

        
        try {
            await video.current.unloadAsync();
        } catch (e) {
            console.log(e)
        }
    }


    const handleOpen = (link) => {
        Linking.openURL(link);
    }


    const handlePressIn = () => {

        const timer = setTimeout(async () => {
            await video.current.pauseAsync();
            setVideoStop(true);
        }, 1000); 
        setLongPressTimer(timer);
    };

    const handlePressOut = async () => {
      
        if (longPressTimer) {
            clearTimeout(longPressTimer);
        }
        await video.current.playAsync();
        setVideoStop(false);
    };


    useEffect(() => {
        (async function(){
            const user = await getUserById(item.creator);
            const like = await checkLike(item.id);
            setUser(user);
            setIsLike(like)
        })()
    },[])



    useEffect(() => {
        setLikesCount(item.likesCount);
    },[item])





    const HandleLike = async (id) => {
        if(likeLoading){
            return
        }
        setLikeLoading(true)
        if(isLike){
            setIsLike(false);
            setLikesCount(prev => prev - 1);
        }else{
            setIsLike(true);
            setLikesCount(prev => prev + 1);
        }
        
        await LikePost(id);
        setLikeLoading(false);
    }

    const OpenComments = () => {
        console.log('opening...')
        bottomSheetModalRef.current.open();
    }

    const handleProfile = () => {
        stop();
        navigation.navigate('profile',{uid: user.uid})
    }


    const handleMuteToggle = async () => {
        if (video.current) {
            video.current.setIsMutedAsync(!mute);
        }
        setMute(prev => !prev);
        setShowPopup(true);
        if(timeoutref.current){
            clearTimeout(timeoutref);
        }
        timeoutref.current = setTimeout(() => {
            setShowPopup(false);
        },500)
        console.log('muting...')
    }


    const handleMuteToggleLong = () => {
        setShowPopup(false);
        video.current.setIsMutedAsync(false);
    };

    
  return (
    <>
        {isLoading && (
            <View style={{ justifyContent: 'center', alignItems: 'center',backgroundColor: COLORS.primary,zIndex: 10,position: 'absolute',bottom: 0,top: 0, right: 0,left: 0 }}>
            <ActivityIndicator size={79} color={COLORS.secondary} />
            </View>
        )}

        {showPopup && (
            <TouchableWithoutFeedback onPress={handleMuteToggle}>

                <View style={{ justifyContent: 'center', alignItems: 'center',display: 'flex', justifyContent: 'center',alignItems: 'center',zIndex: 10,position: 'absolute',bottom: 0,top: 0, right: 0,left: 0 }}>
                    <View style={tw`p-2 bg-black/50 rounded-full`}>
                        <Feather name={mute ? "volume-x" : "volume-2"} size={30} color={'white'}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )}
      
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleMuteToggle}
            onLongPress={handleMuteToggleLong}
            
        >
            <View style={tw`absolute bottom-0 left-0 right-0 top-0 justify-end z-2`}>

                {
                    !videoStop &&
                    <>
                        <View style={tw`py-2 px-4 flex gap-2 items-end`}>
                            <View style={tw`flex gap-0 items-center`}>
                                <TouchableOpacity onPress={handleProfile}>
                                    {
                                        user?.photoURL ?
                                        <Image source={{ uri: user?.photoURL }} style={{ width: 35,height: 35, resizeMode: 'contain', marginBottom: 5,borderRadius: 9999,marginBottom: 8 }} />
                                        :
                                        <Avatar.Icon size={35} backgroundColor={COLORS.secondary} icon={"account"}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={tw`flex gap-0 items-center`}>
                                <TouchableOpacity onPress={() => HandleLike(item.id)}>
                                    <Image source={isLike ? require('../../../assets/heartfill.png') : require('../../../assets/heart.png')} style={{ width: 31, resizeMode: 'contain', marginBottom: 5 }} />
                                </TouchableOpacity>
                                <Text style={tw`text-white text-sm font-montserrat`}>{likesCount}</Text>
                            </View>
                            <View style={tw`flex gap-0 items-center`}>
                                <TouchableOpacity onPress={OpenComments}>
                                    <Image source={require('../../../assets/comment.png')} style={{ width: 34, resizeMode: 'contain', marginBottom: 5 }} />
                                </TouchableOpacity>
                                <Text style={tw`text-white text-sm font-montserrat`}>{item.commentsCount}</Text>
                            </View>
                            <View style={tw`flex gap-0 items-center`}>
                                <Image source={require('../../../assets/share.png')} style={{ width: 34, resizeMode: 'contain', marginBottom: 5 }} />
                                <Text style={tw`text-white text-sm font-montserrat`}>Share</Text>
                            </View>                           
                        </View>
                        <View style={tw`px-4`}>
                            <Text style={tw`text-white text-lg font-montserrat`}>@{user?.username}
                            </Text>
                        </View>
                        <View style={tw`py-2 px-4`}>
                            <FlatList
                                data={item.hashtags}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.key}
                                horizontal={true} // Set horizontal to true
                                />
                        </View>
                        <View style={tw`flex flex-row items-center gap-2 border-t border-b border-[${COLORS.secondary}] pl-4`}>
                            
                            <Text style={tw`text-sm text-[${COLORS.secondary}] font-montserrat`}>BBC News</Text>
                            <Text style={tw`text-[10px] text-white flex-1 font-montserrat`}>{item.newsdescription}</Text>
                            <TouchableOpacity onPress={() => handleOpen(item.newslink)}>
                                <LinearGradient
                                    colors={['#53C8D8', '#668AF7']}
                                    style={tw`py-2`}

                                >
                                <View style={tw`w-8 flex justify-center items-center`}>
                                    <Feather name={'chevron-right'} size={30} color={'white'} />
                                </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            <CommentModel ref={(preventRef => bottomSheetModalRef.current = preventRef)}/>
            </View>
        
            </TouchableWithoutFeedback>
            <Video
                ref={video}
                style={styles.container}
                source={{
                    uri: item.media[0]
                }}
                useNativeControls={false}
                resizeMode={ResizeMode.COVER}
                shouldPlay={false}
                isLooping
                usePoster
                onLoadStart={handleLoadStart}
                posterSource={{ uri: item.media[1] }}
                posterStyle={{ resizeMode: 'cover', height: '100%' }}
                onReadyForDisplay={handleReadyForDisplay}
            />
            
             
    </>
  );

})

export default PostSingle