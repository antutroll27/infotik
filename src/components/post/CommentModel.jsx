import React, { forwardRef, useImperativeHandle, useRef, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const CommentModel = forwardRef(({ }, prevnetRef) => {
  useImperativeHandle(prevnetRef, () => ({
    open: handlePresentModalPress
  }));

  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [ '75%', '100%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={styles.bottomSheet} // Add this line to apply zIndex
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSheet: {
    position: 'relative',
    zIndex: 10000, // Set your desired zIndex value here
  },
});

export default CommentModel;
