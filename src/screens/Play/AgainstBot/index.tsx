import { useEffect, useState } from "react";
import Container from "../../../components/Layouts/Container";
import Text from "../../../components/Layouts/Text";
import socket from "../../../lib/socket";

export default function AgainstBotScreen() {
  const [socketData, setSocketData] = useState<any>()

  function handleSocket(data: any) {
    console.log(data)
  }

  useEffect(() => {
    socket.on("connect", () => { })
    socket.on("disconnect", () => { })
    socket.on("initialization", handleSocket)
    return () => {
      socket.off("connect", () => { })
      socket.off("disconnect", () => { })
      socket.off("initialization", handleSocket)
    }
  }, [])

  return (
    <Container>
      <Text>Hello World</Text>
    </Container>
  )
}