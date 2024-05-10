import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles';
export default function ProfilePostListItem({ item,posts }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('userPosts', { posts: posts, profile: true })}>
            <Image style={styles.image} source={{ uri: item.media[1] }} />
        </TouchableOpacity>
    )
}
