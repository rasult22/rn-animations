import { PerplexityItem } from "@/mock/perplexity";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

type VerticalListProps = {
  data: PerplexityItem[];
};

const { height } = Dimensions.get("screen");
const _spacing = 8;
const _itemSize = height * 0.72;
const _itemFullsize = _itemSize + _spacing * 2;

function AnimatedCard({ item, index, scrollY }: { item: PerplexityItem, index: number, scrollY: SharedValue<number> }) {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [index - 1, index, index + 1], [0.3, 1, 0.3]),
      transform: [{
        scale: interpolate(scrollY.value, [index - 1, index, index + 1], [0.92, 1, 0.92]),
      }]
    }
  })
  
  return (
    <Animated.View
      style={[{
        flex: 1,
        height: _itemSize,
        padding: _spacing * 2,
        borderRadius: 8,
        gap: _spacing
      }, stylez]}
    >
      <Image source={{ uri: item.image }} blurRadius={50} style={[StyleSheet.absoluteFillObject, { borderRadius: 12 }]} />
      <Image
        source={{
          uri: item.image,
        }}
        style={{
          flex: 1,
          height: _itemSize * 0.4,
        }}
      />
      <View style={{ gap: _spacing }}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#fff' }}>{item.title}</Text>
        <Text style={{ color: '#ddd' }} numberOfLines={3}>{item.description}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: _spacing }}>
        <Image source={{ uri: item.author.avatar }} style={{ width: 24, aspectRatio: 1, borderRadius: 12 }} />
        <Text style={{ fontSize: 12, color: '#ddd' }}>{item.author.name}</Text>
      </View>
    </Animated.View>
  );
}

export default function VerticalList({ data }: VerticalListProps) {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y / _itemFullsize;
  })
  return (
    <Animated.FlatList
      data={data}
      contentContainerStyle={{
        paddingHorizontal: _spacing * 3,
        paddingVertical: (height - _itemFullsize) / 2,
        gap: _spacing * 2,
      }}
      decelerationRate={"fast"}
      snapToInterval={_itemFullsize}
      onScroll={onScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return <AnimatedCard item={item} index={index} scrollY={scrollY} />;
      }}
    />
  );
}
