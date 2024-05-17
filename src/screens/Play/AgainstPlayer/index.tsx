import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Container from "../../../components/Layouts/Container";
import socket from "../../../lib/socket";
import Text from "../../../components/Layouts/Text";
import LoadingScreen from "../../Loading";
import PlayerCard from "../../../components/PlayerCard";
import { useGetUserByIdQuery } from "../../../stores/services/user";
import { ISocketData } from "../../../interfaces/ISocketData";

export default function AgainstPlayer() {
  const navigation = useNavigation()
  const [socketData, setSocketData] = useState<ISocketData>({
    status: "INIT",
  })
  const [opps, setOpps] = useState<any>()

  const { data, isLoading } = useGetUserByIdQuery()
  //@ts-ignore
  const { user } = data

  function handleSocket(data: any) {
    setSocketData(data)
  }

  function handleStartGame(data: any) {
    socket.emit("start PVP game", { roomId: data.room.id, username: data.username, players: data.room.players })
    navigation.reset({
      index: 0,
      routes: [{ name: "QuestionMultipleChoice", params: { room: data.room, username: data.username, currentQuestion: data.currentQuestion } }],
    })
  }

  useEffect(() => {
    socket.on("initialize game", handleSocket)
    socket.on("looking for opponents", handleSocket)
    socket.on("opponents found", handleSocket)
    socket.on("start game", handleStartGame)
    return () => {
      socket.off("initialize game", handleSocket)
      socket.off("looking for opponents", handleSocket)
      socket.off("opponents found", handleSocket)
      socket.off("start game", handleStartGame)
    }
  }, [])

  useEffect(() => {
    if (socketData.room) {
      if (Object.keys(socketData.room.players).length === 2) {
        const [key, opps] = Object.entries(socketData.room.players).find(([key]) => key !== user.username) || []

        setOpps(opps)
      }
    }
  }, [socketData])

  return (
    <Container style={{ flex: 1 }}>
      {socketData.status === "INIT" ? <LoadingScreen /> :
        <>
          <View style={{ alignItems: "center", justifyContent: "center", gap: 4, marginTop: 16 }}>
            <Text weight={900} style={{ fontSize: 22 }}>{socketData.status}</Text>
            <Text weight={700} style={{ fontSize: 20, marginTop: -10 }}>{socketData.timer}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View>
              <PlayerCard isLoading={isLoading} {...user} />
            </View>
            <Text weight={900} style={{ fontSize: 36, marginVertical: 50 }}>vs</Text>
            <View>
              {socketData.status !== "PREPARING GAME" ?
                <ActivityIndicator />
                : <PlayerCard {...opps} />
              }
            </View>
          </View>
        </>
      }
    </Container>
  )
}