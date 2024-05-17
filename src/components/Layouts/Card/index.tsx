import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

import Container from "../Container";
import useTheme from "../../../hooks/useTheme";
import colors from "../../../styles/colors";

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>
}

export default function Card({ children, style }: Props) {
  const { isLight } = useTheme()
  const styles = {
    backgroundColor: isLight ? colors.dark("0.1") : colors.light("0.1"),
    padding: 16,
    //@ts-ignore
    ...style,
  };
  return (
    <Container style={styles}>
      {children}
    </Container>
  )
}