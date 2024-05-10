
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, View, StyleSheet, Text } from 'react-native'
import useMaterialNavBarHeight from '../hooks/useMaterialNavBarHeight'
import PostSingle from './post'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
// import { getFeed, getPostsByUserId } from '../../services/posts'





export default function Scroller({ posts:allposts,change,profile }) {
    const [posts, setPosts] = useState(allposts)
    const isScrollTab = useRef(true);
    
    
    const mediaRefs = useRef([])
    const storeCellRef = useRef([]);
    
    const currentVideoRes = useRef(null);
    
    const navigation = useNavigation()

    const {change:pagechange} = useSelector(store => store.user);

    useEffect(() => {
        setPosts(allposts);
    },[posts,change])


 


    useEffect(() => {
        console.log('mount')
    },[pagechange])


    useEffect(() => {
        const handleScreenChange = () => {
          if(currentVideoRes.current) currentVideoRes.current.stop();
          isScrollTab.current = false; 
        };

        const handleFocus = (e) => {
            
                isScrollTab.current = true; 
                if(currentVideoRes.current) currentVideoRes.current.play(); 
            
        }

        
    
        // Add event listeners for screen focus/change
      
        const unsubscribeBlur = navigation.addListener('blur', handleScreenChange);
        const unsubscribeFocus = navigation.addListener('focus',handleFocus );
    
        // Clean up event listeners on component unmount
        return () => {
            unsubscribeFocus();
            unsubscribeBlur();
        };
    }, [navigation]);


    
   
    const onViewableItemsChanged = useRef(({changed}) => {

        changed.forEach(element => {
            const cell = mediaRefs.current[element.key]
            
            if (cell) {
                if (element.isViewable && isScrollTab.current) {
                    for (let index = 0; index < storeCellRef.current.length; index++) {
                        const cell = storeCellRef.current[index];
                        cell.stop();
                    }
                    cell.play()
                    currentVideoRes.current = cell;
                    storeCellRef.current.push(cell);
                } else {
                    cell.stop()
                }
            }
            
        });

    })



  

    const feedItemHeight = Dimensions.get('window').height - useMaterialNavBarHeight(profile);

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ height: feedItemHeight, backgroundColor: 'black' }}>
                <PostSingle item={item} ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)} />
            </View>
        )
    }

   


       
      return (
        <FlatList
            windowSize={4}
            data={posts}
            renderItem={renderItem}
            itialNumToRender={0}
            maxToRenderPerBatch={2}
            removeClippedSubviews
            viewabilityConfig={{
                itemVisiblePercentThreshold: 0
            }}
            pagingEnabled
            decelerationRate={'normal'}
            onViewableItemsChanged={onViewableItemsChanged.current}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        />
      );
}

const styles = StyleSheet.create({
    container: { flex: 1 }
})