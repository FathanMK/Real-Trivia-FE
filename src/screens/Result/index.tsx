import { View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import Container from "../../components/Layouts/Container";
import Text from "../../components/Layouts/Text";
import Card from "../../components/Layouts/Card";
import { CircleSlash } from "lucide-react-native";
import useTheme from "../../hooks/useTheme";
import colors from "../../styles/colors";
import MainButton from "../../components/Buttons/MainButton";
import { useEffect, useState } from "react";
import { useCreateMatchMutation } from "../../stores/services/match";
import socket from "../../lib/socket";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../stores/services/user";

export default function ResultScreen({ route }: { route: any }) {
  const isFocused = useIsFocused()
  const [correct, setCorrect] = useState(0)
  const [totalTimer, setTotalTimer] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const navigation = useNavigation()
  const { data, isLoading: isUserLoading } = useGetUserByIdQuery()
  const { isLight } = useTheme()
  const params = route.params

  const timerPoints = totalTimer * 10
  const correctPoints = correct * 100

  const [createMatch] = useCreateMatchMutation()
  const [updateUser] = useUpdateUserMutation()

  useEffect(() => {
    let totalTimerValue = 0
    if (params.room) {
      for (const question in params.room.players[params.username].answers) {
        const { isCorrect, timer } = params.room.players[params.username].answers[question];
        if (isCorrect) {
          setCorrect((prevCorrect) => prevCorrect + 1);
          totalTimerValue += timer
        }
      }
      setTotalTimer(totalTimerValue)
    }
    if (params.room.players[params.username].winner) {
      setTotalPoints(totalPoints => totalPoints + 100)
    }
    if (params.room.players[params.username].draw) {
      setTotalPoints(totalPoints => totalPoints + 50)
    }
  }, [])

  useEffect(() => {
    if (correct === 5) {
      setTotalPoints(totalPoints => totalPoints + 500)
    }
    setTotalPoints(totalPoints => totalPoints + correctPoints + timerPoints)
  }, [correct, totalTimer])

  useEffect(() => {
    async function handleMutation() {
      await createMatch({ id: params.room.id, answers: params.room.players[data?.user?.username!].answers })
      await updateUser({ points: timerPoints + correctPoints + Number(data?.user?.points!) })
    }

    if (!isUserLoading && params) {
      // handleMutation()
    }
  }, [isUserLoading])

  function handlePlayAgain() {
    navigation.navigate("Play")
  }

  function handleBackHome() {
    navigation.navigate("Home")
  }

  useEffect(() => {
    if (!isFocused) {
      socket.emit("delete room", { roomId: params.room.id })
    }
  }, [isFocused])

  return (
    <Container style={{ flex: 1 }}>
      <View style={{ margin: 16, alignItems: "center", justifyContent: "center" }}>
        <Text weight={900} style={{ fontSize: 28 }}>Result</Text>
      </View>
      <View style={{ width: "90%", marginHorizontal: "auto", marginTop: 50 }}>
        <Text style={{ alignSelf: "flex-end", fontSize: 14 }} weight={500}>Match ID: {params.room.id}</Text>
      </View>
      <Card style={{ width: "90%", marginHorizontal: "auto", marginVertical: 16, borderRadius: 4, height: 200 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", gap: 10, marginVertical: 4 }}>
            <Text style={{ fontSize: 16 }} weight={500}>{correct}</Text>
            <Text style={{ fontSize: 16 }} weight={500}>x</Text>
            <Text style={{ fontSize: 16 }} weight={500}>Correct</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, width: 50 }}>
            <CircleSlash size={18} color={isLight ? colors.dark() : colors.light()} />
            <Text style={{ paddingBottom: 1 }}>{correctPoints}</Text>
          </View>
        </View>
        {correct === 5 &&
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", gap: 10, marginVertical: 4 }}>
              <Text style={{ fontSize: 16 }} weight={500}>Clean Sweep Bonus</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, width: 50 }}>
              <CircleSlash size={18} color={isLight ? colors.dark() : colors.light()} />
              <Text style={{ paddingBottom: 1 }}>{500}</Text>
            </View>
          </View>}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", gap: 10, marginVertical: 4 }}>
            <Text style={{ fontSize: 16 }} weight={500}>Extra Time:</Text>
            <Text style={{ fontSize: 16 }} weight={500}>{totalTimer}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, width: 50 }}>
            <CircleSlash size={18} color={isLight ? colors.dark() : colors.light()} />
            <Text style={{ paddingBottom: 1 }}>{timerPoints}</Text>
          </View>
        </View>
        {params.room.players[params.username].winner &&
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", gap: 10, marginVertical: 4 }}>
              <Text style={{ fontSize: 16 }} weight={500}>Winner Bonus</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, width: 50 }}>
              <CircleSlash size={18} color={isLight ? colors.dark() : colors.light()} />
              <Text style={{ paddingBottom: 1 }}>{100}</Text>
            </View>
          </View>}
        {params.room.players[params.username].draw &&
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", gap: 10, marginVertical: 4 }}>
              <Text style={{ fontSize: 16 }} weight={500}>Draw Bonus</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, width: 50 }}>
              <CircleSlash size={18} color={isLight ? colors.dark() : colors.light()} />
              <Text style={{ paddingBottom: 1 }}>{50}</Text>
            </View>
          </View>}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, marginTop: "auto" }}>
          <Text style={{ fontSize: 16 }} weight={500}>You got</Text>
          <CircleSlash size={18} color={isLight ? colors.dark() : colors.light()} />
          <Text style={{ fontSize: 16 }} weight={500}>{totalPoints}</Text>
        </View>
      </Card>
      <View style={{ gap: 20, alignItems: "center", justifyContent: "center", marginTop: "auto", marginBottom: 50 }}>
        <MainButton width={250} variant="primary" onPress={handlePlayAgain}>Play Again</MainButton>
        <MainButton width={250} variant="secondary" onPress={handleBackHome}>Back to Home</MainButton>
      </View>
    </Container>
  )
}