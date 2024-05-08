import { ReactNode } from "react";
import { Pressable } from "react-native";

import colors from "../../../styles/colors";
import useTheme from "../../../hooks/useTheme";

interface Props {
  onPress?: () => void;
  children?: ReactNode;
  variant?: "primary" | "secondary" | "error";
}

export default function IconButton({ onPress, children, variant = "primary" }: Props) {
  const { isLight } = useTheme()
  return (
    <Pressable
      style={{
        backgroundColor: variant === "primary" ? isLight ? colors.dark() : colors.light() : variant === "error" ? colors.error() : "transparent",
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
      }}
      android_ripple={{
        color: isLight ? colors.light('0.15') : colors.dark('0.15'),
      }}
      onPress={onPress}>
      {children}
    </Pressable>
  )
}