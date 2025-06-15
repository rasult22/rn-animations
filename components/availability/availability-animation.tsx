import { HomeType } from "@/mock/homes";
import { MotiView } from 'moti';
import { Image, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

const _spacing = 4;
const _borderRadius = 8;
const _itemSize = 60;
const _stagger = 75;
const _loadingColor = "#ddd";
const _loadingColorWashed = "#eee";
const getRandomRotation = () =>
  (Math.random() > 0.5 ? -1 : 1) * Math.random() * 15;

function Item({ item, index }: { item: HomeType; index: number }) {
  return (
    <View
      style={{
        width: _itemSize,
        aspectRatio: 1,
        borderRadius: _borderRadius,
        padding: _spacing,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 7,
        elevation: 5,
        marginLeft: index !== 0 ? -_itemSize / 2 : 0,
        transform: [
          {
            rotate: `${getRandomRotation()}deg`,
          },
        ],
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          flex: 1,
          borderRadius: _borderRadius,
        }}
      />
    </View>
  );
}

export default function AvailabilityAnimation({
  data,
  isLoading,
}: {
  data: HomeType[];
  isLoading: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: _itemSize,
      }}
    >
      <View
        style={{ flex: 0.6, minHeight: _itemSize, justifyContent: "center" }}
      >
        {!isLoading ? (
          <Animated.Text
            entering={FadeIn.springify().damping(80).stiffness(200)}
            exiting={FadeOut.springify().damping(80).stiffness(200)}
            key="text"
          >
            {data.length} available
          </Animated.Text>
        ) : (
          <Skeleton
            key="skeleton"
            style={{
              width: "80%",
              height: _itemSize * 0.25,
              borderRadius: _borderRadius / 2,
              backgroundColor: _loadingColor,
            }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "flex-end",
          minHeight: _itemSize,
        }}
      >
        {!isLoading ? (
          data.map((home, index) => (
            <Animated.View
              style={{ zIndex: index }}
              key={home.key}
              entering={ZoomIn.springify()
                .stiffness(200)
                .damping(80)
                .delay(index * _stagger)}
              exiting={ZoomOut.springify()
                .stiffness(200)
                .damping(80)
                .delay(index * _stagger)}
            >
              <Item item={home} index={index} />
            </Animated.View>
          ))
        ) : (
          <LoadingSkeleton key={'image-skeleton'} />
        )}
      </View>
    </View>
  );
}

function LoadingSkeleton() {
  return (
    <View style={{flexDirection: 'row'}}>
      {[...Array(3).keys()].map((index) => {
        return (
          <Skeleton
            key={index}
            style={{
              width: _itemSize,
              aspectRatio: 1,
              borderRadius: _borderRadius,
              backgroundColor: _loadingColor,
              marginLeft: index === 0 ? 0 : -_itemSize / 2,
              borderWidth: _spacing / 2,
              borderColor: '#fff',
              transform: [
                {
                  rotate: `${getRandomRotation()}deg`
                }
              ]
            }}
          />
        );
      })}
    </View>
  );
}

export function Skeleton({ style, ...rest }: ViewProps) {
  return (
    <MotiView
      style={[style]}
      {...rest}
      from={{ backgroundColor: _loadingColor }}
      animate={{ backgroundColor: _loadingColorWashed }}
      transition={{
        duration: 1000,
        loop: true,
        repeatReverse: true
      }}
      entering={FadeIn.springify().damping(80).stiffness(200)}
      exiting={FadeOut.springify().damping(80).stiffness(200)}
    ></MotiView>
  );
}
