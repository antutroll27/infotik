import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, View, StyleSheet } from 'react-native';
import useMaterialNavBarHeight from '../hooks/useMaterialNavBarHeight';
import PostSingle from './post';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function Scroller({ posts: allPosts, change, profile }) {
    const [posts, setPosts] = useState(allPosts);
    const isScrollTab = useRef(true);
    const mediaRefs = useRef([]);
    const currentVideoRes = useRef(null);
    const navigation = useNavigation();

    const { change: pageChange } = useSelector(store => store.user);

    useEffect(() => {
        setPosts(allPosts);
    }, [allPosts, change]);

    useEffect(() => {
        console.log('mount');
    }, [pageChange]);

    useEffect(() => {
        const handleScreenChange = () => {
            if (currentVideoRes.current) currentVideoRes.current.stop();
            isScrollTab.current = false;
        };

        const handleFocus = () => {
            isScrollTab.current = true;
            if (currentVideoRes.current) currentVideoRes.current.play();
        };

        const unsubscribeBlur = navigation.addListener('blur', handleScreenChange);
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);

        return () => {
            unsubscribeFocus();
            unsubscribeBlur();
        };
    }, [navigation]);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length === 0) return;

        const visibleItem = viewableItems[0];
        const cell = mediaRefs.current[visibleItem.key];

        if (cell && isScrollTab.current) {
            if (currentVideoRes.current && currentVideoRes.current !== cell) {
                currentVideoRes.current.stop();
            }
            cell.play();
            currentVideoRes.current = cell;
        }
    });

    const feedItemHeight = Dimensions.get('window').height - useMaterialNavBarHeight(profile);

    const renderItem = ({ item }) => {
        return (
            <View style={{ height: feedItemHeight, backgroundColor: 'black' }}>
                <PostSingle item={item} ref={ref => (mediaRefs.current[item.id] = ref)} />
            </View>
        );
    };

    return (
        <FlatList
            windowSize={4}
            data={posts}
            renderItem={renderItem}
            initialNumToRender={0}
            maxToRenderPerBatch={2}
            removeClippedSubviews
            viewabilityConfig={{
                itemVisiblePercentThreshold: 50 // Set a threshold to ensure that the video plays only when it's fully in view
            }}
            pagingEnabled
            decelerationRate={'normal'}
            onViewableItemsChanged={onViewableItemsChanged.current} /*
            to fix the audio leak bug
            */
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 }
});
