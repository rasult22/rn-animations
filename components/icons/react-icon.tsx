import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import Svg, { Path } from "react-native-svg"

const originalWidth = 101
const originalHeight = 101

const ReactIcon: React.FC<{
  width?: number
  height?: number,
  style?: StyleProp<ViewStyle>
}> = ({
  width = 101,
  height = 101,
  style
}) => (
  <Svg
    width={width}
    height={height}
    style={style}
    viewBox="0 0 101 101"
    fill="none"
  >
    <Path
      fill="#61DAFB"
      d="M50.307 59.003a8.816 8.816 0 1 0 0-17.632 8.816 8.816 0 0 0 0 17.632Z"
    />
    <Path
      stroke="#61DAFB"
      strokeWidth={5}
      d="M50.307 68.25c26.126 0 47.306-8.087 47.306-18.063 0-9.976-21.18-18.063-47.306-18.063C24.18 32.124 3 40.211 3 50.187c0 9.976 21.18 18.062 47.307 18.062Z"
    />
    <Path
      stroke="#61DAFB"
      strokeWidth={5}
      d="M34.664 59.218C47.727 81.844 65.321 96.143 73.96 91.156c8.64-4.988 5.053-27.374-8.01-50C52.885 18.529 35.291 4.23 26.652 9.218c-8.639 4.988-5.052 27.374 8.011 50Z"
    />
    <Path
      stroke="#61DAFB"
      strokeWidth={5}
      d="M34.664 41.156c-13.063 22.626-16.65 45.012-8.01 50 8.638 4.987 26.232-9.312 39.295-31.938 13.064-22.626 16.65-45.012 8.01-50-8.638-4.988-26.232 9.311-39.295 31.938Z"
    />
  </Svg>
)
export default ReactIcon
