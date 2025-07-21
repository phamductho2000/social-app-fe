import {useState} from "react";
import {Client} from "@stomp/stompjs";

export default () => {

  const [websocket, setWebsocket] = useState<Client>();

  const updateWebsocket = (stompClient: Client) => {
    setWebsocket(stompClient);
  }

  return {websocket, updateWebsocket}
}
