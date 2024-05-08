import { View } from "react-native";

import PlayerCard from "./components/PlayerCard"
import ThemeToggle from "../../Buttons/ThemeToggle";

export default function Header() {
  return (
    <View style={{ margin: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
      <PlayerCard />
      <ThemeToggle />
    </View>
  )
}