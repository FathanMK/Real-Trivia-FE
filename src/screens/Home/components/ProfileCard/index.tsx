import { Image, ToastAndroid, View } from "react-native";
import { LogOut } from "lucide-react-native";

import Text from "../../../../components/Layouts/Text";
import IconButton from "../../../../components/Buttons/Icon";
import colors from "../../../../styles/colors";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import { removeToken } from "../../../../stores/slices/user";
import useTheme from "../../../../hooks/useTheme";

export default function ProfileCard() {
  const dispatch = useAppDispatch()
  const { isLight } = useTheme()

  function handleLogOut() {
    ToastAndroid.show("Logged Out!", ToastAndroid.SHORT)
    dispatch(removeToken())
  }
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
        <View style={{ width: 50, height: 50 }}>
          <Image style={{ width: "100%", height: "100%", borderRadius: 4, borderWidth: 2, borderColor: isLight ? colors.dark() : colors.light() }} src="https://res.cloudinary.com/dts5hyzdq/image/upload/v1698223958/vfygy9mtsax2i7zehkyl.jpg" />
        </View>
        <View style={{ width: 155 }}>
          <Text weight={900} style={{ fontSize: 16, marginTop: -4 }}>extenderp</Text>
          <Text weight={500} style={{ fontSize: 12, marginTop: -4 }}>level 0</Text>
          <View style={{ height: 10, width: "100%", borderRadius: 5, borderWidth: 2, borderColor: isLight ? colors.dark() : colors.light(), marginTop: 8 }} />
        </View>
      </View>
      <IconButton variant="error" onPress={handleLogOut}>
        <LogOut size={22} color={colors.light()} />
      </IconButton>
    </View>
  )
}