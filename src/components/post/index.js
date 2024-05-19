import { Video, ResizeMode } from 'expo-av';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import styles from './styles';
import { COLORS } from '../../constants';
import tw from '../../customtwrnc';
import { Feather } from '@expo/vector-icons';
import { LikePost, checkLike, getUserById } from '../../redux/actions/user';
import { LinearGradient } from 'expo-linear-gradient';
import CommentModel from './CommentModel';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';

const renderItem = ({ item }) => (
    <TouchableOpacity>
        <View style={tw`mx-1`}>
            <Text style={tw`text-sm text-[${COLORS.secondary}] font-montserrat`}>{item}</Text>
        </View>
    </TouchableOpacity>
);

const PostSingle = forwardRef(({ item }, parentRef) => {
    const video = useRef(null);
    const timeoutref = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [longPressTimer, setLongPressTimer] = useState(null);
    const [videoStop, setVideoStop] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [likeLoading, setLikeLoading] = useState(false);
    const bottomSheetModalRef = useRef(null);
    const navigation = useNavigation();
    const [mute, setMute] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useImperativeHandle(parentRef, () => ({
        play,
        stop,
        unload
    }));

    useEffect(() => {
        return () => {
            unload();
        };
    }, []);

    const handleLoadStart = () => {
        setIsLoading(true);
    };

    const handleReadyForDisplay = () => {
        setIsLoading(false);
    };

    const play = async () => {
        if (video.current == null) return;

        const status = await video.current.getStatusAsync();
        if (status?.isPlaying) return;

        try {
            await video.current.playAsync();
        } catch (e) {
            console.log('error', e.message);
        }
    };

    const stop = async () => {
        if (video.current == null) return;

        const status = await video.current.getStatusAsync();
        if (!status?.isPlaying) return;

        try {
            await video.current.stopAsync();
        } catch (e) {
            console.log(e);
        }
    };

    const unload = async () => {
        if (video.current == null) return;

        try {
            await video.current.unloadAsync();
        } catch (e) {
            console.log(e);
        }
    };

    const handleOpen = (link) => {
        Linking.openURL(link);
    };

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
        (async function () {
            const user = await getUserById(item.creator);
            const like = await checkLike(item.id);
            setUser(user);
            setIsLike(like);
        })();
    }, []);

    useEffect(() => {
        setLikesCount(item.likesCount);
    }, [item]);

    const HandleLike = async (id) => {
        if (likeLoading) return;

        setLikeLoading(true);
        if (isLike) {
            setIsLike(false);
            setLikesCount((prev) => prev - 1);
        } else {
            setIsLike(true);
            setLikesCount((prev) => prev + 1);
        }

        await LikePost(id);
        setLikeLoading(false);
    };

    const OpenComments = () => {
        bottomSheetModalRef.current.open();
    };

    const handleProfile = () => {
        stop();
        navigation.navigate('profile', { uid: user.uid });
    };

    const handleMuteToggle = async () => {
        if (video.current) {
            video.current.setIsMutedAsync(!mute);
        }
        setMute((prev) => !prev);
        setShowPopup(true);
        if (timeoutref.current) {
            clearTimeout(timeoutref);
        }
        timeoutref.current = setTimeout(() => {
            setShowPopup(false);
        }, 500);
    };

    const handleMuteToggleLong = () => {
        setShowPopup(false);
        video.current.setIsMutedAsync(false);
    };

    return (
        <>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={79} color={COLORS.secondary} />
                </View>
            )}

            {showPopup && (
                <TouchableWithoutFeedback onPress={handleMuteToggle}>
                    <View style={styles.mutePopup}>
                        <View style={tw`p-2 bg-black/50 rounded-full`}>
                            <Feather name={mute ? 'volume-x' : 'volume-2'} size={30} color={'white'} />
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
                <View style={styles.videoOverlay}>
                    {!videoStop && (
                        <>
                            <View style={tw`py-2 px-4 flex gap-2 items-end`}>
                                <View style={tw`flex gap-0 items-center`}>
                                    <TouchableOpacity onPress={handleProfile}>
                                        {user?.photoURL ? (
                                            <Image source={{ uri: user?.photoURL }} style={styles.userImage} />
                                        ) : (
                                            <Avatar.Icon size={35} backgroundColor={COLORS.secondary} icon={'account'} />
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <View style={tw`flex gap-0 items-center`}>
                                    <TouchableOpacity onPress={() => HandleLike(item.id)}>
                                        <Image source={isLike ? require('../../../assets/heartfill.png') : require('../../../assets/heart.png')} style={styles.icon} />
                                    </TouchableOpacity>
                                    <Text style={tw`text-white text-sm font-montserrat`}>{likesCount}</Text>
                                </View>
                                <View style={tw`flex gap-0 items-center`}>
                                    <TouchableOpacity onPress={OpenComments}>
                                        <Image source={require('../../../assets/comment.png')} style={styles.icon} />
                                    </TouchableOpacity>
                                    <Text style={tw`text-white text-sm font-montserrat`}>{item.commentsCount}</Text>
                                </View>
                                <View style={tw`flex gap-0 items-center`}>
                                    <Image source={require('../../../assets/share.png')} style={styles.icon} />
                                    <Text style={tw`text-white text-sm font-montserrat`}>Share</Text>
                                </View>
                            </View>
                            <View style={tw`px-4`}>
                                <Text style={tw`text-white text-lg font-montserrat`}>@{user?.username}</Text>
                            </View>
                            <View style={tw`py-2 px-4`}>
                                <FlatList data={item.hashtags} renderItem={renderItem} keyExtractor={(item) => item.key} horizontal={true} />
                            </View>
                            <View style={tw`flex flex-row items-center gap-2 border-t border-b border-[${COLORS.secondary}] pl-4`}>
                                <Text style={tw`text-sm text-[${COLORS.secondary}] font-montserrat`}>BBC News</Text>
                                <Text style={tw`text-[10px] text-white flex-1 font-montserrat`}>{item.newsdescription}</Text>
                                <TouchableOpacity onPress={() => handleOpen(item.newslink)}>
                                    <LinearGradient colors={['#53C8D8', '#668AF7']} style={tw`py-2`}>
                                        <View style={tw`w-8 flex justify-center items-center`}>
                                            <Feather name={'chevron-right'} size={30} color={'white'} />
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                    <CommentModel ref={(preventRef) => (bottomSheetModalRef.current = preventRef)} />
                </View>
            </TouchableWithoutFeedback>
            <Video
                ref={video}
                style={styles.container}
                source={{ uri: item.media[0] }}
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
});

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        zIndex: 10,
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
    },
    mutePopup: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
    },
    videoOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        justifyContent: 'end',
        zIndex: 2,
    },
    userImage: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        marginBottom: 8,
        borderRadius: 9999,
    },
    icon: {
        width: 34,
        resizeMode: 'contain',
        marginBottom: 5,
    },
});

export default PostSingle;
