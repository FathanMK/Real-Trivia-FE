import { ActivityIndicator, Image, View } from "react-native";
import { CircleSlash } from "lucide-react-native";

import useTheme from "../../hooks/useTheme";
import colors from "../../styles/colors";
import Text from "../Layouts/Text";

interface Props {
  username?: string;
  avatarUrl?: string;
  level?: number;
  points?: number;
  isLoading?: boolean;
}

const defaultAvatarUrl = "https://res.cloudinary.com/dts5hyzdq/image/upload/v1698223958/vfygy9mtsax2i7zehkyl.jpg"

export default function PlayerCard({ username, points, avatarUrl = defaultAvatarUrl, isLoading }: Props) {
  const { isLight } = useTheme()

  if (isLoading) {
    <View>
      <ActivityIndicator />
    </View>
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: isLight ? colors.dark("0.15") : colors.light("0.15"), padding: 16, alignSelf: "flex-start" }}>
      <View style={{ width: 50, height: 50 }}>
        <Image style={{ width: "100%", height: "100%", borderRadius: 4, borderWidth: 2, borderColor: isLight ? colors.dark() : colors.light() }} src={avatarUrl} />
      </View>
      <View style={{ width: 155 }}>
        <Text weight={900} style={{ fontSize: 16, marginTop: -4 }}>{username}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
          <CircleSlash size={16} color={isLight ? colors.dark() : colors.light()} />
          <Text weight={500} style={{ fontSize: 12, marginTop: -4, paddingTop: 2.5 }}>{points}</Text>
        </View>
      </View>
    </View>
  )
}