import { Marquee } from '@animatereactnative/marquee';
import { Stagger } from '@animatereactnative/stagger';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, { Easing, FadeIn, FadeInUp, FadeOut, interpolate, runOnJS, SharedValue, useAnimatedReaction, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
const images = [
  'https://i.pinimg.com/736x/4a/b9/d8/4ab9d8f2f73a4e96d772cb70eb2e84ff.jpg',
  'https://i.pinimg.com/736x/ae/e9/4b/aee94bc89aa21bbe55b468f4f7737301.jpg',
  'https://i.pinimg.com/736x/1b/05/54/1b0554671a9dcc1d32a65e7ce8e36195.jpg',
  'https://i.pinimg.com/736x/8d/8d/cc/8d8dcc5b350c7066b14986b957448183.jpg',
  'https://i.pinimg.com/736x/a3/de/fa/a3defa97a124a1dc311a5e5083d9eaea.jpg',
  'https://i.pinimg.com/736x/64/f1/08/64f108fd2e71561fbb555acc00137baa.jpg',
  'https://i.pinimg.com/736x/6e/34/c9/6e34c9d2186d4aace0a5e723906416cc.jpg'
]
const { width } = Dimensions.get('window')
const _itemWidth = width * .62
const _itemHeigth = _itemWidth * 1.67
const _spacing = 16
const _itemSize = _itemWidth + _spacing


export default function AppleInvites() {
  const offset = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(1);

  useAnimatedReaction(() => (offset.value / _itemSize) % images.length, (value) => {
    runOnJS(setActiveIndex)(Math.round(value))
  })
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <View style={[StyleSheet.absoluteFillObject]}>
        <Animated.Image
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
          blurRadius={50}
          key={`image-${activeIndex}`}
          source={{ uri: images[activeIndex] }}
          style={{
            flex: 1
          }} />
      </View>
      <Marquee spacing={_spacing} position={offset}>
        <Animated.View entering={FadeInUp.delay(500).duration(1000).easing(Easing.elastic(0.9)).withInitialValues({
          transform: [{ translateY: -_itemHeigth / 2}]
        })} style={{ flexDirection: 'row', gap: _spacing }}>
          {images.map((image, index) => (<Item offset={offset} key={`image-${index}`} image={image} index={index} />))}
        </Animated.View>
      </Marquee>
      <Stagger key={"123"} stagger={100} style={{flex: .5, justifyContent: 'center', alignItems: 'center'}} initialEnteringDelay={1000}>
        <Text style={{ color: 'white', fontWeight: '500', opacity: 0.6 }}>Movie name:</Text>
        <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Blade Runner 2077</Text>
        <Text style={{ color: 'white', fontWeight: '500', opacity: 0.6, textAlign: 'center', marginHorizontal: 16 }}>
        Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.
        </Text>
      </Stagger>
    </View>
  )
}


function Item({ image, index, offset }: { image: string, index: number, offset: SharedValue<number> }) {
  const _stylez = useAnimatedStyle(() => {
    const itemPosition = index * _itemSize - width - _itemSize / 2;
    const totalSize = images.length * _itemSize;

    const range = ((itemPosition - (offset.value + totalSize * 1000)) % totalSize) + width + _itemSize / 2;
    return {
      transform: [{
        rotate: `${interpolate(range, [-_itemSize, (width - _itemSize) / 2, width], [-3, 0, 3])}deg`
      }]
    }
  })
  return (
    <Animated.View style={[{
      width: _itemWidth,
      height: _itemHeigth,
    }, _stylez]}>
      <Image source={{
        uri: image
      }} style={[{
        flex: 1,
        borderRadius: 16,
      }]} />
    </Animated.View>
  )
}