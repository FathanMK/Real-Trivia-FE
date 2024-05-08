import { View } from "react-native";

import Container from "../../components/Layouts/Container";
import MainButton from "../../components/Buttons/MainButton";
import Header from "../../components/Layouts/Header";

export default function PlayScreen() {
  return (
    <Container style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, marginHorizontal: 16, alignItems: "center", justifyContent: "center", gap: 20 }}>
        <MainButton variant="primary" width="100%">
          Play against Bots
        </MainButton>
        <MainButton variant="primary" width="100%">
          Play against Players
        </MainButton>
      </View>
    </Container>
  )
}