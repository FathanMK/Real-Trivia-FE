import { ScrollView } from "react-native";

import Card from "../../../../../components/Layouts/Card";
import Text from "../../../../../components/Layouts/Text";


export default function Question({ question }: { question: string }) {
  return (
    <Card style={{ height: 180, flex: 1 }}>
      <ScrollView>
        <Text weight={500} style={{ fontSize: 16 }}>{question}</Text>
      </ScrollView>
    </Card>
  )
}