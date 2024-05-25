import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, View, StyleSheet } from 'react-native';
import useMaterialNavBarHeight from '../hooks/useMaterialNavBarHeight';
import PostSingle from './PostSingle'; // Make sure this import is correct
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function Scroller({ posts: allPosts, change, profile }) {
    const [posts, setPosts] = useState(allPosts);
    const mediaRefs = useRef(new Map());
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
        };

        const handleFocus = () => {
            if (currentVideoRes.current) currentVideoRes.current.play();
        };

        const unsubscribeBlur = navigation.addListener('blur', handleScreenChange);
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);

        return () => {
            unsubscribeFocus();
            unsubscribeBlur();
        };
    }, [navigation]);

    const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        changed.forEach(element => {
            const cell = mediaRefs.current.get(element.key);
            if (cell) {
                if (element.isViewable) {
                    if (currentVideoRes.current && currentVideoRes.current !== cell) {
                        currentVideoRes.current.stop();
                    }
                    cell.play();
                    currentVideoRes.current = cell;
                } else {
                    cell.stop();
                }
            }
        });
    });

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50 // Ensure the video plays only when it's at least 50% in view
    };

    const feedItemHeight = Dimensions.get('window').height - useMaterialNavBarHeight(profile);

    const renderItem = ({ item }) => (
        <View style={{ height: feedItemHeight, backgroundColor: 'black' }}>
            <PostSingle item={item} ref={ref => mediaRefs.current.set(item.id, ref)} />
        </View>
    );

    return (
        <FlatList
            windowSize={4}
            data={posts}
            renderItem={renderItem}
            initialNumToRender={0}
            maxToRenderPerBatch={2}
            removeClippedSubviews
            viewabilityConfig={viewabilityConfig}
            pagingEnabled
            decelerationRate="normal"
            onViewableItemsChanged={onViewableItemsChanged.current}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 }
});
