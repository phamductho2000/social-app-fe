import React, {FC, useEffect, useRef} from "react";
import {Flex, Typography} from "antd";
import {useCurrentUser} from "@/selectors/useCurrentUser";
import "./style.css";
import {markReadMessages} from "@/services/message/messageController";
import {EmojiClickData} from "emoji-picker-react";
import MessageBox from "@/pages/chat/components/MessageBox";
import {useModel} from "@@/exports";

const {Text} = Typography;

type MessageProps = {
  message: API.MessageResDTO;
  isLast?: boolean;
};

const Message: FC<MessageProps> = ({message, isLast}: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const currentUser = useCurrentUser();
  const isSender = message?.senderId === currentUser?.userId;
  const {updateMessageReply} = useModel('chat');

  console.log('isSelf', isSender);
  console.log('message', message);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && message?.senderId !== currentUser?.userId && message?.status === 'SENT') {
          markReadMessages([message.id]).then(r => {
          });
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [message]);

  const handleChoseReaction = (e: EmojiClickData) => {
    if (e) {
      // markReaction({
      //   fullName: currentUser?.fullName,
      //   emoji: e.emoji,
      //   unified: e.unified,
      //   messageId: message.id,
      // }).then(r => {
      // })
    }
  }

  const handleChoseReply = (msg: API.MessageResDTO) => {
    updateMessageReply(msg);
  }

  return (
    <Flex ref={ref} style={{width: '100%', marginBottom: '8px'}} gap={"small"} justify={"flex-start"}>
      <MessageBox
        message={message}
        isSender={isSender}
        onChoseReaction={handleChoseReaction}
        onChoseReply={handleChoseReply}
      />
    </Flex>
  )
}
export default Message;
