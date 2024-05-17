import { View } from "react-native";

import useTheme from "../../../../../hooks/useTheme";
import colors from "../../../../../styles/colors";


export default function Indicators({ playerIndicator }: { playerIndicator: any }) {
  const { isLight } = useTheme()
  return (
    <View style={{ marginVertical: 16, alignItems: "center", justifyContent: "center" }}>
      <View style={{ height: 22, width: "80%", borderWidth: 2, borderColor: isLight ? colors.dark() : colors.light(), flexDirection: "row", overflow: "hidden" }}>
        <View style={{ width: "20%", borderColor: isLight ? colors.dark() : colors.light(), borderRightWidth: 2, height: "100%", backgroundColor: playerIndicator.length > 0 ? playerIndicator[0] ? colors.success() : colors.error() : "transparent" }}></View>
        <View style={{ width: "20%", borderColor: isLight ? colors.dark() : colors.light(), borderRightWidth: 2, height: "100%", backgroundColor: playerIndicator.length > 1 ? playerIndicator[1] ? colors.success() : colors.error() : "transparent" }}></View>
        <View style={{ width: "20%", borderColor: isLight ? colors.dark() : colors.light(), borderRightWidth: 2, height: "100%", backgroundColor: playerIndicator.length > 2 ? playerIndicator[2] ? colors.success() : colors.error() : "transparent" }}></View>
        <View style={{ width: "20%", borderColor: isLight ? colors.dark() : colors.light(), borderRightWidth: 2, height: "100%", backgroundColor: playerIndicator.length > 3 ? playerIndicator[3] ? colors.success() : colors.error() : "transparent" }}></View>
        <View style={{ width: "20%", backgroundColor: playerIndicator.length > 4 ? playerIndicator[4] ? colors.success() : colors.error() : "transparent" }}></View>
      </View>
    </View>
  )
}