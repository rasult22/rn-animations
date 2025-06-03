import { useMemo, useRef, useState } from "react";
import { View, ViewProps } from "react-native";
import { ConfettiMethods, PIConfetti } from "react-native-fast-confetti";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
} from "react-native-reanimated";
import KotlinIcon from "../icons/kotlin-icon";
import ReactIcon from "../icons/react-icon";
import SwiftIcon from "../icons/swift-icon";
import TypescriptIcon from "../icons/typescript-icon";
const _itemSize = 60;
const numberOfItems = 4;
const TWO_PI = Math.PI * 2;
const theta = TWO_PI / numberOfItems;
const circleRadius = _itemSize * 1.5;
const getX = (index: number) => {
  return Math.cos(-Math.PI / 2 + theta * index) * circleRadius - _itemSize / 2;
};
const getY = (index: number) => {
  return Math.sin(-Math.PI / 2 + theta * index) * circleRadius - _itemSize / 2;
};

export default function Confetti() {
  const elRef = useRef<ConfettiMethods>(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PIConfetti
        ref={elRef}
        colors={["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]}
        count={100}
        blastDuration={150}
        fallDuration={1200}
        sizeVariation={0.8}
        fadeOutOnEnd
        height={position.y}
        blastPosition={{
          x: position.x,
          y: position.y,
        }}
        onAnimationEnd={() => console.log("Animation ended")}
      />
      <View>
        <GestureItem
          style={{
            position: "absolute",
            left: getX(1),
            top: getY(1),
          }}
          setPosition={setPosition}
          start={() => {
            elRef.current?.restart();
          }}
        >
          <Animated.View
            entering={ZoomIn.springify().damping(12).delay(250 + 1 * 100)}
            style={{
              width: _itemSize,
              height: _itemSize,
              borderRadius: 16,
              padding: 8,
              backgroundColor: "white",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ReactIcon
              style={{
                flex: 1,
                aspectRatio: 1,
              }}
              width={_itemSize - 24}
              height={_itemSize - 24}
            />
          </Animated.View>
        </GestureItem>
      </View>
      <View>
        <GestureItem
          style={{
            position: "absolute",
            left: getX(2),
            top: getY(2),
          }}
          setPosition={setPosition}
          start={() => {
            elRef.current?.restart();
          }}
        >
          <Animated.View
            entering={ZoomIn.springify().damping(12).delay(250 + 2 * 100)}
            style={{
              width: _itemSize,
              height: _itemSize,
              borderRadius: 16,
              padding: 8,
              backgroundColor: "white",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TypescriptIcon
              style={{
                flex: 1,
                aspectRatio: 1,
              }}
              width={_itemSize - 24}
              height={_itemSize - 24}
            />
          </Animated.View>
        </GestureItem>
      </View>
      <View>
        <GestureItem
          style={{
            position: "absolute",
            left: getX(3),
            top: getY(3),
          }}
          setPosition={setPosition}
          start={() => {
            elRef.current?.restart();
          }}
        >
          <Animated.View
            entering={ZoomIn.springify().damping(12).delay(250 + 3 * 100)}
            style={{
              width: _itemSize,
              height: _itemSize,
              borderRadius: 16,
              padding: 8,
              backgroundColor: "white",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KotlinIcon
              style={{
                flex: 1,
                aspectRatio: 1,
              }}
              width={_itemSize - 24}
              height={_itemSize - 24}
            />
          </Animated.View>
        </GestureItem>
      </View>
      <View>
        <GestureItem
          style={{
            position: "absolute",
            left: getX(4),
            top: getY(4),
          }}
          setPosition={setPosition}
          start={() => {
            elRef.current?.restart();
          }}
        >
          <Animated.View
            entering={ZoomIn.springify().damping(12).delay(250 + 4 * 100)}
            style={{
              width: _itemSize,
              height: _itemSize,
              borderRadius: 16,
              padding: 8,
              backgroundColor: "white",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SwiftIcon
              style={{
                flex: 1,
                aspectRatio: 1,
              }}
              width={_itemSize - 24}
              height={_itemSize - 24}
            />
          </Animated.View>
        </GestureItem>
      </View>
    </View>
  );
}

type GestureItemProps = {
  start: () => void;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
} & ViewProps;

function GestureItem({
  children,
  setPosition,
  style,
  start,
}: GestureItemProps) {
  const aRef = useAnimatedRef();
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const initialRotation = useMemo(() => {
    return (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10);
  }, []);

  const stylez = useAnimatedStyle(() => {
    const distance = initialRotation + Math.sqrt(x.value ** 2 + y.value ** 2);
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
        {
          rotate: `${distance}deg`,
        },
      ],
    };
  });
  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      const measurements = measure(aRef);
      if (!measurements) {
        return;
      }
      runOnJS(setPosition)({
        x: measurements.pageX + measurements.width / 2,
        y: measurements.pageY + measurements.height / 2,
      });
    })
    .onChange((e) => {
      x.value = e.translationX;
      y.value = e.translationY;
    })
    .onFinalize(() => {
      x.value = withTiming(
        0,
        { duration: 400, easing: Easing.inOut(Easing.exp) },
        (finished) => {
          if (finished) {
            runOnJS(start)();
          }
        }
      );
      y.value = withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.exp),
      });
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View ref={aRef} style={[style, stylez]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
