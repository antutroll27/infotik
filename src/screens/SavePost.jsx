import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { createPost } from '../redux/actions/user'
import tw from 'twrnc'
import { COLORS } from '../constants/index'
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button'
import * as ImagePicker from 'expo-image-picker'


const allKeyword = [
    '#News',
    '#Politics',
    '#Science',
    '#Technology',
    '#Health',
    '#Environment',
    '#Education',
    '#History',
    '#Sports',
    '#AI',
    '#Business',
    '#Finance',
    '#Travel',
    '#Culture',
    '#Art',
    '#Fashion',
    '#Food',
    '#Cooking',
    '#DIY',
    '#Fitness',
    '#Wellness',
    '#Nature',
    '#Space',
    '#Philosophy',
    '#Psychology',
    '#Sustainability'
]



const GradientText = ({ children, selected, onPress }) => {
    return (
        <>
            {
                !selected ? (
                    <TouchableOpacity onPress={onPress}>
                        <View

                            style={tw`p-1 px-3 rounded-2xl flex items-center border border-[${COLORS.secondary}]`}

                        >
                            <Text style={tw`text-white text-sm font-montserrat text-[${COLORS.secondary}]`}>{children}</Text>
                        </View>
                    </TouchableOpacity>
                ) :
                    (
                        <TouchableOpacity onPress={onPress}>
                            <LinearGradient
                                colors={['#53C8D8', '#668AF7']}
                                style={tw`p-1 px-3 rounded-3xl flex items-center `}

                            >
                                <Text style={tw`text-white text-sm font-montserrat`}>{children}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )
            }
        </>

    );
};

export default function SavePostScreen(props) {
    const [description, setDescription] = useState('')
    const [requestRunning, setRequestRunning] = useState(false)
    const [newsdescription, setnewsdescription] = useState('');
    const [newstitle, setnewstitle] = useState('');
    const [newslink, setnewslink] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [open, setOpen] = useState(false)
    const [thumbnails, setThumbNail] = useState('')
    const navigation = useNavigation()


    const pickFromGallery = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [16, 9],
            quality: 1,
        });        
        
        if (!result.canceled) {
          
            setThumbNail(result.assets[0].uri)
   
        }
    }

    useEffect(() => {
        setThumbNail(props.route.params.sourceThumb)
    },[props.route.params.sourceThumb])


    const dispatch = useDispatch();
    const handleSavePost = async () => {
        setRequestRunning(true)
        const res = await createPost(description, props.route.params.source, thumbnails, newstitle, newsdescription, newslink, hashtags);
        if (res) {
            navigation.dispatch(StackActions.popToTop());
            setRequestRunning(false);
        } else {
            setRequestRunning(false)
        }
    }

    if (requestRunning) {
        return (
            <View style={styles.uploadingContainer}>
                <ActivityIndicator size={79} color={COLORS.secondary} />
            </View>
        )
    }

    const handleSelect = (k) => {
        if(hashtags.length >= 5 && !hashtags.includes(k)){
            return
        }
        setHashtags(prev => {
          if(prev.includes(k)){
            return prev.filter(ke => ke != k);
          }else{
            return [...prev,k];
          }
        })
      }
    return (
       
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Image
                        style={styles.mediaPreview}
                        source={{ uri: thumbnails }}
                    />

                    <TouchableOpacity
                        onPress={pickFromGallery}
                        style={tw`px-8 border w-50 flex flex-row items-center border-[${COLORS.secondary}] h-16 rounded-md`}>
                        <Text style={tw`text-center text-xl text-[${COLORS.secondary}]`}>Change cover image</Text>
                    </TouchableOpacity>
                </View>


                <View style={''}>
                    <Text style={tw`text-white font-montserrat ml-6`}>Title (150 characters)</Text>
                    <View style={tw`mx-6 mt-1 mb-6 flex-row justify-center`}>
                        <TextInput
                            style={styles.inputText}
                            maxLength={150}
                            multiline
                            onChangeText={(text) => setDescription(text)}

                            placeholder=""
                        />
                    </View>
                </View>

                {/* <View style={''}>
                    <Text style={tw`text-white font-montserrat ml-6`}>News Title</Text>
                    <View style={tw`mx-6 mt-1 mb-6 flex-row justify-center`}>
                        <TextInput
                            style={styles.inputText}
                            maxLength={150}
                            multiline
                            onChangeText={(text) => setnewstitle(text)}

                            placeholder="Describe your video"
                        />
                    </View>
                </View> */}


                <View style={''}>
                    <Text style={tw`text-white font-montserrat ml-6`}>News link</Text>
                    <View style={tw`mx-6 mt-1 mb-6 flex-row justify-center`}>
                        <TextInput
                            style={styles.inputText}
                            maxLength={150}
                            multiline
                            onChangeText={(text) => setnewslink(text)}

                            placeholder=""
                        />
                    </View>
                </View>
                <View style={''}>
                    <Text style={tw`text-white font-montserrat ml-6`}>News Description</Text>
                    <View style={tw`mx-6 mt-1 flex-row justify-center`}>
                        <TextInput
                            style={styles.inputText}
                            maxLength={150}
                            multiline
                            onChangeText={(text) => setnewsdescription(text)}

                            placeholder=""
                        />
                    </View>
                </View>


                <View style={tw.style(`h-32 border border-[${COLORS.secondary}] m-6 mr-11`, { borderRadius: 4 })} >
                    <TouchableOpacity onPress={() => setOpen(true)}>

                    <Text style={tw`text-[${COLORS.secondary}] text-xl text-center`}>{hashtags.length == 0 ? 'Add': 'Edit'} # tags</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        <View style={tw`p-4 flex flex-wrap flex-row gap-3 justify-center`}>
                            {
                                hashtags.map((k) => (
                                    <GradientText onPress={() => handleSelect(k)} selected={hashtags.includes(k)}>
                                        {k}
                                    </GradientText>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>


                <View style={styles.spacer} />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>CANCEL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleSavePost()}
                        style={styles.postButton}>
                        <Text style={styles.postButtonText}>POST</Text>
                        <Feather name="chevron-right" size={24} color={COLORS.secondary} />
                    </TouchableOpacity>
                </View>
                <View style={tw`absolute top-0 left-0 right-0 bottom-0 bg-[${COLORS.primary}] ${open ? '' : 'hidden'}`}>
                    <View style={tw`flex-1 bg-[${COLORS.primary}] py-4`}>
                        <View style={tw`flex items-center`}>
                            <Image source={require('../../assets/fulllogo.png')} style={{ width: 80, height: 80, resizeMode: 'contain', marginBottom: 2 }} />
                        </View>
                        <View style={tw`flex gap-2 items-center`}>
                            <Text style={tw`text-white text-lg text-center font-montserrat`}>
                                Choose some of your favorite topics
                            </Text>
                            <Text style={tw`text-white text-2xl text-center`}>
                                ({hashtags.length}/5)
                            </Text>
                        </View>


                        <View style={tw`p-4 flex flex-wrap flex-row gap-3 justify-center`}>
                            {
                                allKeyword.map((k) => (
                                    <GradientText onPress={() => handleSelect(k)} selected={hashtags.includes(k)}>
                                        {k}
                                    </GradientText>
                                ))
                            }
                        </View>

                        <View style={tw`p-4 px-8`}>
                            <Button onPress={() => setOpen(false)}>NEXT</Button>
                        </View>
                    </View>
                </View>
            </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: COLORS.primary
    },
    uploadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary
    },
    spacer: {
        flex: 1
    },
    formContainer: {
        margin: 20,
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        margin: 20,
    },
    inputText: {
        paddingVertical: 10,
        marginRight: 20,
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        color: 'white',
        borderRadius: 4,

    },
    mediaPreview: {
        aspectRatio: 9 / 16,
        backgroundColor: 'black',
        width: 60
    },
    cancelButton: {
        alignItems: 'center',
        flex: 1,
        borderColor: COLORS.secondary,
        borderWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    postButton: {
        alignItems: 'center',
        flex: 1,
        borderColor: COLORS.secondary,
        borderWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        borderRadius: 4,
        marginRight: 10
    },
    cancelButtonText: {
        marginLeft: 5,
        color: COLORS.secondary,

        fontSize: 16,
        fontFamily: 'Montserrat'
    },
    postButtonText: {
        marginLeft: 5,
        color: COLORS.secondary,
        fontSize: 16,
        fontFamily: 'Montserrat'
    }
});