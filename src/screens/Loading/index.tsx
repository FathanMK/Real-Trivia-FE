import { ActivityIndicator } from "react-native";
import Container from "../../components/Layouts/Container";

export default function LoadingScreen() {
  return (
    <Container style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </Container>
  )
}