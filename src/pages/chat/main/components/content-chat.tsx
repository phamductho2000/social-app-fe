import {Layout, List, Typography} from "antd";
import React, {useEffect} from "react";
import {useParams} from "@@/exports";
import {useWebSocket} from "@/hooks/useWebSocket";
import Message from "@/pages/chat/main/components/message";
import PinMessage from "@/pages/chat/components/PinMessage";
import {useModel} from "@umijs/max";

const {Content} = Layout;
const {Text} = Typography;

const ContentChat = () => {
  const params = useParams();
  const conversationId = params.conversationId;
  const {messages, handleNewMessage, fetchMessages} = useModel('message');
  const {subscribe} = useWebSocket();

  useEffect(() => {

    if (conversationId) {
      fetchMessages(conversationId);
    }

    const unSubscribe = subscribe(`/topic/message/conversation/${conversationId}`, (msg) => {
      // setMessages((prev) => [...prev, msg]);
      // setMessages((prevMessages) => addOrUpdateToDataSource(prevMessages, msg));
      handleNewMessage(msg);
      console.log('msg...........', msg);
    });

    return () => {
      unSubscribe()
    }
  }, [conversationId]);

  return (
    <div style={{background: "#fff", overflow: 'auto', height: '100%'}}>
      <PinMessage/>
      <List
        style={{padding: 16}}
        dataSource={messages}
        renderItem={(msg: any, index: number) => (
          <Message message={msg} isLast={index === messages.length - 1}/>
        )}
      />
    </div>
  )
}
export default ContentChat;
