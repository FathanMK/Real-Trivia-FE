import type { ISocketData } from "../../../interfaces/ISocketData";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Indicators from "./components/Indicators";
import Question from "./components/Question";
import Answers from "./components/Answers";
import OppsIndicator from "./components/OppsIndicator";
import Container from "../../../components/Layouts/Container";
import Text from "../../../components/Layouts/Text";
import LoadingScreen from "../../Loading";
import socket from "../../../lib/socket";

export default function QuestionMultipleChoiceScreen({ route }: { route: any }) {
  const [socketData, setSocketData] = useState<ISocketData>({
    status: "PLEASE WAIT",
  })
  const params = route.params
  const navigation = useNavigation()

  const player = params.room.players[params.username]
  const [key, opps] = Object.entries(params.room.players).find(([key]) => key !== params.username) || []

  //@ts-ignore
  const [oppsIndicator, setOppsIndicator] = useState<any[]>(() => opps.answers ? handleIndicators(opps.answers) : [])
  const [playerIndicator, setPlayerIndicator] = useState<any[]>(() => player.answers ? handleIndicators(player.answers) : [])


  function handleIndicators(indicator: any) {
    const correctIndicator = Object.values(indicator).map((data: any) => data.isCorrect);
    return correctIndicator
  }

  function handleNextQuestion(data: any) {
    navigation.reset({
      index: 0,
      routes: [{ name: "QuestionMultipleChoice", params: { room: data.room, username: data.username, currentQuestion: data.currentQuestion } }],
    })
  }

  function handleGameOver(data: any) {
    navigation.navigate("Result", { username: params.username, room: data.room })
  }

  function setIndicators(data: any) {
    const correctPlayerIndicator = handleIndicators(data.room.players[params.username].answers)
    const [key, opps] = Object.entries(data.room.players).find(([key]) => key !== params.username) || []
    //@ts-ignore
    const correctBotIndicator = handleIndicators(opps.answers)

    setPlayerIndicator(correctPlayerIndicator)
    setOppsIndicator(correctBotIndicator)
    setSocketData(data)
  }

  function handleSocket(data: any) {
    setSocketData(data)
  }

  useEffect(() => {
    socket.on("answering", handleSocket)
    socket.on("finish answering", setIndicators)
    socket.on("next question", handleNextQuestion)
    socket.on("game over", handleGameOver)
    return () => {
      socket.off("answering", handleSocket)
      socket.off("finish answering", setIndicators)
      socket.off("next question", handleNextQuestion)
      socket.off("game over", handleGameOver)
    }
  })

  return (
    <Container style={{ flex: 1 }}>
      {socketData.status === "PLEASE WAIT" ? <LoadingScreen /> :
        <>
          <Indicators playerIndicator={playerIndicator} />
          <View style={{ alignItems: "center", justifyContent: "center", gap: 4, marginTop: 16 }}>
            <Text weight={900} style={{ fontSize: 22 }}>{socketData.status}</Text>
            <Text weight={700} style={{ fontSize: 20, marginTop: -10 }}>{socketData.timer}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", gap: 10, margin: 16 }}>
              <Question question={params.room.questions[params.currentQuestion].question} />
              <OppsIndicator botIndicator={oppsIndicator} />
            </View>
            <Answers roomId={params.room.id} username={params.username} timer={socketData.timer} questionId={params.room.questions[params.currentQuestion].id} correctAnswer={params.room.questions[params.currentQuestion].correctAnswer} answers={params.room.questions[params.currentQuestion].answers} />
          </View>
        </>
      }
    </Container>
  )
}