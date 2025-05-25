import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated, { clamp, FadeIn, FadeOut, interpolate, interpolateColor, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const images = [
  'https://images.unsplash.com/photo-1747570440649-ff0af69538b0?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1747077138172-590c023ec442?q=80&w=2572&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1747901718484-8883316cc00d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1744400363909-4627ac0acb0c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1747619715083-3db63905a75a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1747861890182-51033cfa8f9d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1747570440647-907910092df1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1743961815743-554cf8ce8430?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

const CircularSlider = () => {
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = clamp(e.contentOffset.x / _itemTotalSize, 0, images.length - 1);

    const newActiveIndex = Math.round(scrollX.value);

    if (newActiveIndex !== activeIndex) {
      runOnJS(setActiveIndex)(newActiveIndex);
    }
  })

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#000' }}>
      <View style={[StyleSheet.absoluteFillObject]}>
        <Animated.Image entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)} key={`image-${activeIndex}`} source={{uri: images[activeIndex]}} style={{ flex: 1 }}/>
      </View>
      <Animated.FlatList
       style={{
        flexGrow: 0
       }}
       contentContainerStyle={{
        paddingHorizontal: (width - _itemSize ) / 2,
        height: _itemSize * 2,
        gap: _spacing
       }}
       onScroll={onScroll}
       scrollEventThrottle={1000 / 60} // ~ 16ms
       data={images}
       keyExtractor={(_, index) => index.toString()}
       horizontal
       showsHorizontalScrollIndicator={false}
       renderItem={({ item, index }) => {
        return <CarouselItem imageUri={item} index={index} scrollX={scrollX} />
       }}
       snapToInterval={_itemTotalSize}
       decelerationRate={"fast"}
       
      />
    </View>
  );
};

const {width} = Dimensions.get('screen');
const _itemSize = width * .24;
const _spacing = 12;
const _itemTotalSize = _itemSize + _spacing;

const CarouselItem: React.FC<{
  imageUri: string,
  index: number,
  scrollX: Animated.SharedValue<number>
}> = ({ imageUri, index, scrollX }) => {

  const stylez = useAnimatedStyle(() => {
    return {
      borderWidth: 4,
      borderColor: interpolateColor(scrollX.value, [index -1, index, index + 1], ['transparent', 'white', 'transparent']),
      transform: [
        {
          translateY: interpolate(scrollX.value, [index -1, index, index + 1], [_itemSize / 6, 0, _itemSize / 6])
        }
      ]
    }
  })
  return (
    <Animated.View style={[{
      width: _itemSize,
      height: _itemSize,
      borderRadius: _itemSize / 2
    },stylez]}>
      <Image 
        source={{ uri: imageUri }}
        style={{
          flex: 1,
          borderRadius: _itemSize / 2,
        }}
        />
    </Animated.View>
  )
}

export default CircularSlider;
