import { MAX_MESSAGES } from "@/mock/chat";
import { ListRenderItem } from "react-native";
import Animated, { FadeInDown, FlatListPropsWithLayout, interpolate, LinearTransition, useAnimatedStyle, useDerivedValue, withSpring } from "react-native-reanimated";

type TiktokMessagesProps<T> = FlatListPropsWithLayout<T> & {
  renderItem: ListRenderItem<T>;
}

function AnimatedItem({index,children}: {index: number,children: React.ReactNode}) {
  const newIndex = useDerivedValue(() => {
    return withSpring(index, {damping: 80, stiffness: 200})
  })

  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(newIndex.value, [0, 1], [1, 1 - 1 / MAX_MESSAGES]),
    }
  })
  return (
    <Animated.View entering={FadeInDown.springify().damping(80).stiffness(200).withInitialValues({
      opacity: 0,
      transform: [
        {
          translateY: 100
        }
      ]
    })}>
      <Animated.View style={[stylez]}>
        {children}
      </Animated.View>
    </Animated.View>
  )
}

export default function TiktokMessages<T>({renderItem, ...rest}: TiktokMessagesProps<T>) {
  return (
    <Animated.FlatList
      inverted
      itemLayoutAnimation={LinearTransition.springify().damping(80).stiffness(200)}
      renderItem={(props) => {
        return <AnimatedItem index ={props.index}>
          {renderItem(props)}
        </AnimatedItem>
      }}
      {...rest}
    />
  )
}