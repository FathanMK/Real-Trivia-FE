import { View } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import Text from "../Layouts/Text";
import socket from "../../lib/socket";
import { useGetUserByIdQuery } from "../../stores/services/user";

export default function PlayersOnline() {
  const [totalPlayers, setTotalPlayers] = useState(0)
  const { data, isLoading } = useGetUserByIdQuery()
  const isFocused = useIsFocused()

  function handleSocket(data: any) {
    setTotalPlayers(data.totalPlayers)
  }

  useEffect(() => {
    if (!isLoading) {
      socket.emit("player online", data!.user)
      socket.emit("get total player online")
    }
  }, [isLoading])

  useEffect(() => {
    if (isFocused) {
      socket.emit("get total player online")
    }
  }, [isFocused])

  useEffect(() => {
    socket.on("send total players", handleSocket)
    return () => {
      socket.off("send total players", handleSocket)
    }
  }, [])

  return (
    <View style={{ marginTop: "auto", marginHorizontal: 16, marginBottom: 16 }}>
      <Text>Players Online: {totalPlayers}</Text>
    </View>
  )
}