import { ActivityIndicator } from "react-native";
import Container from "../../components/Layouts/Container";
import useTheme from "../../hooks/useTheme";
import colors from "../../styles/colors";

export default function LoadingScreen() {
  const { isLight } = useTheme()
  return (
    <Container style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={isLight ? colors.dark() : colors.light()} />
    </Container>
  )
}