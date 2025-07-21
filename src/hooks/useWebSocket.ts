import {useContext} from "react";
import {IStompContext, StompContext} from "@/websocket/WebSocketProvider";

export const useWebSocket = (): IStompContext => {
  const context = useContext(StompContext);
  if (!context) throw new Error('useStompSubscribe must be used within StompProvider');

  return context;
};
