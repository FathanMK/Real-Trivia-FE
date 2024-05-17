import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Container from "../../components/Layouts/Container";
import MainButton from "../../components/Buttons/MainButton";
import Header from "../../components/Layouts/Header";
import socket from "../../lib/socket";
import { useGetUserByIdQuery } from "../../stores/services/user";
import PlayersOnline from "../../components/PlayersOnline";

export default function PlayScreen() {
  const navigation = useNavigation()
  const { data } = useGetUserByIdQuery()

  function handleAgainstBot() {
    navigation.navigate("AgainstBot")
    socket.emit("play game", { type: "AGAINST BOT", user: data?.user })
  }

  function handleAgainstPlayer() {
    navigation.navigate("AgainstPlayer")
    socket.emit("play game", { type: "AGAINST PLAYER", user: data?.user })
  }

  return (
    <Container style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, marginHorizontal: 16, alignItems: "center", justifyContent: "center", gap: 20 }}>
        <MainButton variant="primary" width="100%" onPress={handleAgainstBot}>
          Play against Bots
        </MainButton>
        <MainButton variant="primary" width="100%" onPress={handleAgainstPlayer}>
          Play against Players
        </MainButton>
      </View>
      <PlayersOnline />
    </Container>
  )
}