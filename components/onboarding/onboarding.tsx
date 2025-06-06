import { Pressable, PressableProps, Text, View } from "react-native";
import Animated, {
  AnimatedProps,
  FadeInDown,
  FadeInLeft,
  FadeOutLeft,
  FadeOutUp,
  interpolateColor,
  LinearTransition,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const _spacing = 8;
const _buttonHeight = 42;
const _layoutTransition = LinearTransition.springify()
  .damping(80)
  .stiffness(200);
const _dotContainer = 24;
const _dotSize = _dotContainer / 3;

const _activeDot = '#fff'
const _inactiveDot = '#aaa'

function Button({ children, style, ...rest }: AnimatedProps<PressableProps>) {
  return (
    <AnimatedPressable
      style={[
        {
          height: _buttonHeight,
          borderRadius: _buttonHeight / 2,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: _spacing * 2,
        },
        style,
      ]}
      entering={FadeInLeft.springify().damping(80).stiffness(200)}
      exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
      layout={_layoutTransition}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}

function Dot({ index, animation }: { index: number, animation: SharedValue<number> }) {
  
  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(animation.value, [index - 1, index, index + 1], [_inactiveDot, _activeDot, _activeDot])
    }
  })

  return (
    <View
      style={{
        width: _dotContainer,
        height: _dotContainer,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[{
          width: _dotSize,
          height: _dotSize,
          borderRadius: 100,
          backgroundColor: "#000",
        }, stylez]}
      />
    </View>
  );
}

function PaginationIndicator({
  animation,
}:{
  animation: SharedValue<number>
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      width: _dotContainer + _dotContainer * animation.value,
    }
  })
  return <Animated.View style={[{
    backgroundColor: "#29BE56",
    position: 'absolute',
    height: _dotContainer,
    width: _dotContainer,
    borderRadius: 100,
    left: 0,
    top: 0
  }, stylez]} />
}

function Pagination({
  selectedIndex,
  total,
}: {
  selectedIndex: number;
  total: number;
}) {

  const animation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      damping: 80,
      stiffness: 200,
    })
  })
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <PaginationIndicator animation={animation} />
        {[...Array(total).keys()].map((i) => {
          return <Dot key={`dot-${i}`} index={i} animation={animation}/>;
        })}
      </View>
    </View>
  );
}

export default function Onboarding({
  total,
  selectedIndex,
  onIndexChange,
}: {
  total: number;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
}) {
  return (
    <View style={{ padding: _spacing, gap: _spacing * 2 }}>
      <Pagination total={total} selectedIndex={selectedIndex} />
      <View style={{ flexDirection: "row", gap: _spacing }}>
        {selectedIndex > 0 && (
          <Button
            style={{
              backgroundColor: "#ddd",
            }}
            onPress={() => {
              onIndexChange(selectedIndex - 1);
            }}
          >
            <Text>Back</Text>
          </Button>
        )}
        <Button
          style={{
            backgroundColor: "#036bfb",
            flex: 1,
          }}
          onPress={() => {
            if (selectedIndex === total - 1) {
              return;
            }
            onIndexChange(selectedIndex + 1);
          }}
        >
          {selectedIndex === total - 1 ? (
            <Animated.Text
              key="finish"
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              style={{ color: "#fff" }}
            >
              Finish
            </Animated.Text>
          ) : (
            <Animated.Text
              key="continue"
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              layout={_layoutTransition}
              style={{ color: "#fff" }}
            >
              Continue
            </Animated.Text>
          )}
        </Button>
      </View>
    </View>
  );
}
