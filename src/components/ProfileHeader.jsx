import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Avatar } from 'react-native-paper'

// import firebase from 'firebase'
import { Feather } from '@expo/vector-icons'
import { FIREBASE_AUTH } from '../../firebaseConfig'
// import { useFollowing } from '../../../hooks/useFollowing'
// import { useFollowingMutation } from '../../../hooks/useFollowingMutation'
import tw from '../customtwrnc'
import { COLORS } from '../constants'
import { checkFollow, followUser } from '../redux/actions/user'
import NavBarGeneral from './general/navbar'



export default function ProfileHeader({ user:puser , change}) {
    const navigation = useNavigation()
    const [user, setUser] = useState();
    
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);


   

    useEffect(() => {
        setUser(puser);
    },[change])

    useEffect(() => {
        (async function(){
            if(user){
                const ans = await checkFollow(user.uid);
                setIsFollowing(ans);
            }
        })()
    },[user])


    const handleFollow = async () => {
        if(loading){
            console.log('lading...')
            return
        }         
        setLoading(true);
        setIsFollowing(prev => !prev);
        await followUser( user.uid, isFollowing );
        setLoading(false);
    }

    // const isFollowing = useFollowing(firebase.auth().currentUser.uid, user.uid).data
    // const isFollowingMutation = useFollowingMutation()
    
    const renderFollowButton = () => {
        if (isFollowing) {
            return (
                <View>

                
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={buttonStyles.grayOutlinedButton}
                        onPress={() => navigation.navigate('chatSingle', { contactId: user?.uid })}
                    >
                        <Text style={buttonStyles.grayOutlinedButtonText}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={buttonStyles.grayOutlinedIconButton}
                        onPress={handleFollow}
                    >
                        <Feather name="user-check" size={20} color={'whitesmoke'}/>
                    </TouchableOpacity>
                </View>
                <Text style={tw`py-2 text-[#86878B] text-center`}>{user?.bio}</Text>
                </View>
            )
        } else {
            return (
                <View>
                <View style={tw`flex flex-row items-center gap-2`}>

                    <TouchableOpacity
                        style={tw`py-1 px-4 rounded-md border border-[${COLORS.secondary}] flex flex-row items-center gap-1 ${isFollowing ? `bg-[${COLORS.secondary}] text-white` : ''}`}
                        onPress={handleFollow}
                    >

                        <Text style={tw`text-white font-montserrat font-semibold`}>Follow</Text>
                        <Text style={tw`text-white text-2xl font-montserrat`}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`py-[1.6px] px-2 rounded-md border border-[${COLORS.secondary}] flex flex-row items-center gap-1`}
                    >

                       <Image source={require('../../assets/share.png')} style={{objectFit: 'contain',width: 25}}/>
                      
                    </TouchableOpacity>
                </View>
                <Text style={tw`py-2 text-[#86878B] text-center`}>{user?.bio}</Text>
                </View>
            )

        }
    }
    return (
        <>
        <NavBarGeneral title={user?.displayName} rightButton={{ display: true, name: 'more-horizontal', color: 'white',action: null }}/>
        <View style={styles.container}>
            {
                user?.photoURL ? 
                <Image
                    style={{height: 80, width: 80,borderRadius: 999999,objectFit: 'contain'}}
                    source={{ uri: user?.photoURL }} 
                />
                : <Avatar.Icon size={80} backgroundColor={COLORS.secondary} icon={"account"}/>
            }
            <Text style={styles.emailText}>@{user?.username}</Text>
            <View style={styles.counterContainer}>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>{user?.followingCount}</Text>
                    <Text style={styles.counterLabelText}>Following</Text>
                </View>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>{user?.followersCount}</Text>
                    <Text style={styles.counterLabelText}>Followers</Text>
                </View>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>0</Text>
                    <Text style={styles.counterLabelText}>Likes</Text>
                </View>
            </View>
            {FIREBASE_AUTH.currentUser?.uid === user?.uid ?
                <View>
                    <TouchableOpacity
                        style={buttonStyles.grayOutlinedButton}
                        onPress={() => navigation.navigate('editProfile')}
                        >
                        <Text style={buttonStyles.grayOutlinedButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <Text style={tw`py-2 text-[#86878B] text-center`} onPress={() => navigation.navigate('editProfileField', { title: 'Bio', field: 'bio', value: user?.bio })}>Tap to add bio</Text>
                </View>
                :
                renderFollowButton()
            }
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        alignItems: 'center',
        paddingHorizontal: 65,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    counterContainer: {
        paddingBottom: 20,
        flexDirection: 'row',
    },
    counterItemContainer: {
        flex: 1,
        alignItems: 'center'
    },
    emailText: {
        padding: 20,
        color: "white",
        fontFamily: 'Montserrat'
    },
    counterNumberText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "white",
        fontFamily: 'Montserrat'
    },
    counterLabelText: {
        color: 'gray',
        fontSize: 11,
        fontFamily: 'Montserrat'
    }
});

const buttonStyles = StyleSheet.create({
    grayOutlinedButton: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    grayOutlinedIconButton: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10
    },
    filledButton: {
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 50,
        backgroundColor: '#ff4040'
    },
    filledButtonText: {
        color: 'white',
        fontWeight: '700'
    },
    grayOutlinedButtonText: {
        color: 'whitesmoke',
        fontWeight: '700'
    },
});