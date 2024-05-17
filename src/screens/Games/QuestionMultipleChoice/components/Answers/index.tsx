import { Pressable, ScrollView, View, Text } from "react-native";
import { ReactNode, useEffect, useState } from "react";
import { shuffle } from "lodash"

import colors from "../../../../../styles/colors";
import useTheme from "../../../../../hooks/useTheme";
import socket from "../../../../../lib/socket";

interface AnswerProps {
  isSelected?: boolean;
  isCorrect?: boolean;
  isDisabled?: boolean;
  isIncorrect?: boolean;
  children?: ReactNode;
  onPress?: () => void;
}

function Answer({ isSelected, isCorrect, isIncorrect, isDisabled, children, onPress }: AnswerProps) {
  const { isLight } = useTheme()
  const bgStyles: any = {
    borderWidth: 2, borderColor: isLight ? colors.dark() : colors.light(), padding: 12,
    backgroundColor: isIncorrect ? colors.error() : isCorrect ? colors.success() : isSelected ? isLight ? colors.dark() : colors.light() : "transparent",
    width: "100%",
    opacity: isDisabled ? 0.5 : 1
  }
  const textStyles: any = {
    color: isSelected ? isLight ? colors.light() : colors.dark() : isLight ? colors.dark() : colors.light(),
    fontFamily: isSelected ? "Inter-Bold" : "Inter-Medium"
  }

  return (
    <Pressable style={bgStyles} onPress={onPress} disabled={isDisabled}>
      <Text style={textStyles}>{children}</Text>
    </Pressable>
  )
}

interface Props {
  roomId?: string;
  username?: string;
  answers?: any,
  questionId?: string
  correctAnswer?: string;
  timer?: number;
}

export default function Answers({ roomId, username, answers, questionId, correctAnswer, timer }: Props) {
  const [selected, setSelected] = useState<string>()
  const [isFinished, setIsFinished] = useState<boolean>()
  const [shuffled, setShuffledAnswers] = useState<any>([])

  function handleSelected(id: string) {
    socket.emit("selecting game answer", { username, questionId, answerId: id, correctAnswer, timer, roomId })
    setSelected(id)
  }

  function handleIsFinished(data: any) {
    setIsFinished(data.isFinished)
  }

  useEffect(() => {
    const shuffled = shuffle(answers);
    setShuffledAnswers(shuffled);
  }, [answers]);

  useEffect(() => {
    socket.on("finish answering", handleIsFinished)
    return () => {
      socket.off("finish answering", handleIsFinished)
    }
  }, [])

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ gap: 20, marginVertical: 20, width: "80%", }}>
        {shuffled.map((item: any) => (
          <Answer
            key={item.id}
            isDisabled={isFinished}
            isSelected={selected === item.id} onPress={() => handleSelected(item.id)}
            isIncorrect={isFinished && selected !== null && selected !== correctAnswer && selected === item.id}
            isCorrect={isFinished && correctAnswer === item.id}
          >{item.value}</Answer>
        ))}
      </View>
    </ScrollView>
  )
}