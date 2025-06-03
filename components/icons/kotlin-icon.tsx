import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import Svg, { Defs, Path, RadialGradient, Stop } from "react-native-svg"
const KotlinIcon: React.FC<{
  width?: number
  height?: number
  style?: StyleProp<ViewStyle>
}> = ({
  width = 100,
  height = 101,
}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 100 101"
  >
    <Path fill="url(#a)" d="M100 100.125H0v-100h100L48.965 49.4 100 100.125Z" />
    <Defs>
      <RadialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="translate(96.675 4.235) scale(114.549)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.003} stopColor="#EF4857" />
        <Stop offset={0.469} stopColor="#D211EC" />
        <Stop offset={1} stopColor="#7F52FF" />
      </RadialGradient>
    </Defs>
  </Svg>
)
export default KotlinIcon
