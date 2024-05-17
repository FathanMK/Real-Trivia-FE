import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import PlayersOnline from "../../components/PlayersOnline";
import Container from "../../components/Layouts/Container";
import MainButton from "../../components/Buttons/MainButton";
import Header from "../../components/Layouts/Header";

export default function HomeScreen() {
  const navigation = useNavigation()

  function handleToPlay() {
    navigation.navigate("Play")
  }

  return (
    <Container style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, marginHorizontal: 16, alignItems: "center", justifyContent: "center", gap: 20 }}>
        <MainButton variant="primary" width="100%" onPress={handleToPlay}>
          Play
        </MainButton>
        <MainButton variant="primary" width="100%">
          Compendium
        </MainButton>
        <MainButton variant="primary" width="100%">
          Settings
        </MainButton>
      </View>
      <PlayersOnline />
    </Container>
  )
}