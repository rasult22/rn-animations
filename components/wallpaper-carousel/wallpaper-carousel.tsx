import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Dimensions, View } from "react-native";
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const uri = `https://api.pexels.com/v1/search?query=mobilewallpaper&orientation=portrait`;
const {width} = Dimensions.get('window');
const _imageWidth = width * 0.7;
const _imageHeight = _imageWidth * 1.76;
const _spacing = 12

type SearchPayload = {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
}

type Photo = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  },
  liked: boolean;
  alt: string;
}

export default function WallPaperCarousel() {
  const {data, isLoading} = useQuery<SearchPayload>({
    queryKey: ["wallpaper"],
    queryFn: async () => {
      const res = await fetch(uri, {
        headers: {
          Authorization:
            "iAgaoIr4vLC4RlczPdYH3g1NIRaExw8n4oGMpH0GFC2JgdUBnK5VU9mn",
        },
      }).then((res) => res.json());
      console.log(res);
      return res;
    },
  });

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  })

  if (isLoading || !data) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator  size='large'/>
    </View>
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.FlatList
        horizontal={true}
        contentContainerStyle={{ gap: _spacing, paddingHorizontal: (width - _imageWidth) /2 }}
        snapToInterval={_imageWidth + _spacing}
        decelerationRate={'fast'}
        style={{ flexGrow: 0 }}
        keyExtractor={(item) => item.id.toString()} 
        data={data.photos}
        renderItem={({item, index}) => {
          return <Photo scrollX={scrollX} item={item} index={index}/>
        }}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
      />
    </View>
  );
}
function Photo({item, index, scrollX}: {item: Photo, index: number, scrollX: SharedValue<number>}) {

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollX.value, [index - 1, index, index + 1], [1.4, 1, 1.4])
        },
        {
          rotate: `${interpolate(scrollX.value, [index - 1, index, index + 1], [15, 0, -15])}deg`
        }
      ]
    }
  })

  return <View style={{
    width: _imageWidth,
    height: _imageHeight,
    borderRadius: 16,
    overflow: 'hidden'
  }} >
    <Animated.Image  source={{uri: item.src.large}} style={[{ flex: 1 }, stylez]}/>
    </View>
}