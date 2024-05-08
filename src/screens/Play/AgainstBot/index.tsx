import { useEffect } from "react";
import Container from "../../../components/Layouts/Container";
import Text from "../../../components/Layouts/Text";
import socket from "../../../lib/socket";

export default function AgainstBotScreen() {

  useEffect(() => {
    socket.on("connect", () => { })
    socket.on("disconnect", () => { })

    return () => {
      socket.off("connect", () => { })
      socket.off("disconnect", () => { })
    }
  }, [])

  return (
    <Container>
      <Text>Hello World</Text>
    </Container>
  )
}