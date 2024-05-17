import { View } from "react-native";

import useTheme from "../../../../../hooks/useTheme";
import colors from "../../../../../styles/colors";


export default function OppsIndicator({ botIndicator }: { botIndicator: any }) {
  const { isLight } = useTheme()
  return (
    <View style={{ width: 20, height: 180, borderWidth: 2, borderColor: isLight ? colors.dark() : colors.light() }}>
      <View style={{ height: "20%", borderColor: isLight ? colors.dark() : colors.light(), borderBottomWidth: 2, backgroundColor: botIndicator.length > 0 ? botIndicator[0] ? colors.success() : colors.error() : "transparent" }}></View>
      <View style={{ height: "20%", borderColor: isLight ? colors.dark() : colors.light(), borderBottomWidth: 2, backgroundColor: botIndicator.length > 1 ? botIndicator[1] ? colors.success() : colors.error() : "transparent" }}></View>
      <View style={{ height: "20%", borderColor: isLight ? colors.dark() : colors.light(), borderBottomWidth: 2, backgroundColor: botIndicator.length > 2 ? botIndicator[2] ? colors.success() : colors.error() : "transparent" }}></View>
      <View style={{ height: "20%", borderColor: isLight ? colors.dark() : colors.light(), borderBottomWidth: 2, backgroundColor: botIndicator.length > 3 ? botIndicator[3] ? colors.success() : colors.error() : "transparent" }}></View>
      <View style={{ height: "20%", borderColor: isLight ? colors.dark() : colors.light(), backgroundColor: botIndicator.length > 4 ? botIndicator[4] ? colors.success() : colors.error() : "transparent" }}></View>
    </View>
  )
}