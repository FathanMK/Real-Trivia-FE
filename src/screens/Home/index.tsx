import { View } from "react-native";

import Container from "../../components/Layouts/Container";
import ThemeToggle from "../../components/Buttons/ThemeToggle";
import ProfileCard from "./components/ProfileCard";

export default function HomePage() {
  return (
    <Container style={{ flex: 1 }}>
      <View style={{ margin: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <ProfileCard />
        <ThemeToggle />
      </View>
    </Container>
  )
}