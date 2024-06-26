import { ActivityIndicator, Image, ToastAndroid, View } from "react-native";
import { CircleSlash, LogOut } from "lucide-react-native";

import Text from "../../../Text";
import IconButton from "../../../../Buttons/Icon";
import colors from "../../../../../styles/colors";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import { removeToken } from "../../../../../stores/slices/user";
import useTheme from "../../../../../hooks/useTheme";
import { useGetUserByIdQuery } from "../../../../../stores/services/user";
import socket from "../../../../../lib/socket";

export default function PlayerCard() {
  const dispatch = useAppDispatch()
  const { isLight } = useTheme()
  const { data, isLoading } = useGetUserByIdQuery()

  function handleLogOut() {
    socket.emit("player offline", data!.user)
    ToastAndroid.show("Logged Out!", ToastAndroid.SHORT)
    dispatch(removeToken())
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    )
  }

  //@ts-ignore
  const { user } = data

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
        <View style={{ width: 50, height: 50 }}>
          <Image style={{ width: "100%", height: "100%", borderRadius: 4, borderWidth: 2, borderColor: isLight ? colors.dark() : colors.light() }} src="https://res.cloudinary.com/dts5hyzdq/image/upload/v1698223958/vfygy9mtsax2i7zehkyl.jpg" />
        </View>
        <View style={{ width: 155 }}>
          <Text weight={900} style={{ fontSize: 16, marginTop: -4 }}>{user?.username}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: -2 }}>
            <CircleSlash size={16} color={isLight ? colors.dark() : colors.light()} />
            <Text weight={500} style={{ fontSize: 12, marginTop: -4, paddingTop: 2.5 }}>{user?.points}</Text>
          </View>
        </View>
      </View>
      <IconButton variant="error" onPress={handleLogOut}>
        <LogOut size={22} color={colors.light()} />
      </IconButton>
    </View>
  )
}