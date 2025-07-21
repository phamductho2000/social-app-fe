import {createContext, useEffect, useRef} from "react";
import {Client} from "@stomp/stompjs";
import {useCurrentUser} from "@/selectors/useCurrentUser";

export interface IStompContext {
  subscribe: (topic: string, callback: (msg: any) => void) => () => void;
  send: (destination: string, body: any, headers?: Record<string, string>) => void;
}

export const StompContext = createContext<IStompContext | null>(null);

export const WebSocketProvider = ({children}: any) => {
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionsRef = useRef({});
  const currentUser = useCurrentUser();
  // const {updateWebsocket} = useModel('websocket');
  const pendingSubscriptions = useRef<{ topic: string, callback: (msg: any) => void }[]>([]);


  const subscribe = (topic: string, callback: (msg: any) => void) => {
    if (!subscriptionsRef.current[topic]) {
      if (stompClientRef.current && stompClientRef.current.connected) {
        subscriptionsRef.current[topic] = [];
        subscriptionsRef.current[topic].push(callback);
        stompClientRef.current.subscribe(topic, (message) => {
          subscriptionsRef.current[topic].forEach((cb: any) => cb(JSON.parse(message.body)));
        });
      } else {
        // 👉 Nếu chưa kết nối, đẩy vào hàng đợi
        pendingSubscriptions.current.push({topic, callback});
      }
    }

    // Trả về hàm hủy subscribe
    return () => {
      subscriptionsRef.current[topic] = subscriptionsRef.current[topic].filter((cb: any) => cb !== callback);
      if (subscriptionsRef.current[topic].length === 0) {
        delete subscriptionsRef.current[topic];
      }
    };
  };

  const send = (destination: string, body: any, headers = {}) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({destination, headers, body: JSON.stringify(body)});
    }
  };

  useEffect(() => {
    const connectWebSocket = () => {
      const stompClient = new Client({
        brokerURL: `ws://localhost:9000/ws?token=${localStorage.getItem('access_token')}`,
        connectHeaders: {Authorization: `Bearer ${localStorage.getItem('access_token')}`},
        debug: (str) => {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,

        onConnect: () => {
          console.log('connected websocket');
          pendingSubscriptions.current.forEach(({topic, callback}) => {
            subscribe(topic, callback); // Gọi lại chính nó
          });
          pendingSubscriptions.current = []; // Clear
        },

        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        }
      });

      // stompClient.onConnect = () => {
      //   updateWebsocket(stompClient);
      //   console.log('connected websocket')
      // };
      //
      // stompClient.onStompError = (frame) => {
      //   console.error('Broker reported error: ' + frame.headers['message']);
      //   console.error('Additional details: ' + frame.body);
      // };

      stompClient.activate();
      stompClientRef.current = stompClient;
    };

    if (currentUser) {
      connectWebSocket();
    }

    return () => {
      stompClientRef.current?.deactivate();
    };
  }, [currentUser]);


  return (
    <StompContext.Provider value={{subscribe, send}}>
      {children}
    </StompContext.Provider>
  )
}

export default WebSocketProvider;
