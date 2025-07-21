import React, {FC} from "react";
import {Avatar, Card, Flex, Image, Popover, Space, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical, faReply} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import './style.css';
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
import {faFaceSmile} from "@fortawesome/free-regular-svg-icons";
import ReactionMessage from "@/pages/chat/components/ReactionMessage";
import ReplyMessage from "@/pages/chat/components/ReplyMessage";

const {Text} = Typography;

type MessageProps = {
  message: API.MessageResDTO;
  isSender: boolean;
  isLast?: boolean;
  onChoseReaction?: (e: EmojiClickData) => void;
  onChoseReply?: (e: API.MessageResDTO) => void;
};

const MessageBox: FC<MessageProps> = ({message, isSender, onChoseReaction, onChoseReply}) => {

  const renderContent = (message: API.MessageResDTO) => {
    switch (message?.contentType) {
      case 'TEXT':
        return <Text>{message?.content}</Text>;
      case 'IMAGE':
        return <Image.PreviewGroup
          preview={{
            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          {
            message?.attachments?.map(att => (
              <Image key={att.name} width={200} src={att.url}/>
            ))
          }

        </Image.PreviewGroup>;
    }
    return <></>
  }

  const optional = (
    <Space direction={"vertical"}>
      <Text>Thu hồi</Text>
      <Text>Chuyển tiếp</Text>
      <Text>Ghim</Text>
    </Space>
  )

  const content = (
    <Space>
      <Popover
        content={<EmojiPicker lazyLoadEmojis={true} reactions={["2764-fe0f", "1f619"]} reactionsDefaultOpen={true}
                              onReactionClick={onChoseReaction}/>} trigger="click">
        <FontAwesomeIcon icon={faFaceSmile}/>
      </Popover>
      <FontAwesomeIcon icon={faReply} onClick={() => onChoseReply?.(message)}/>
      <Popover content={optional} trigger="click" placement={"right"}>
        <FontAwesomeIcon icon={faEllipsisVertical}/>
      </Popover>
    </Space>
  );

  return (
    <Flex style={{width: '100%'}} justify={'start'} align={'self-end'} gap={10}>
      <Avatar size={'large'}/>
      <Popover content={content} trigger="hover" placement={"right"}>
        <Card size={'small'} className={`message-box`}
              style={{
                '--bubble-color': isSender ? '#e6f7ff' : '#ffffff'
              } as React.CSSProperties}
              styles={{body: {padding: 0}}}>
          <ReplyMessage data={message?.reply}/>
          <Flex gap={6} justify={"space-between"} align={"baseline"} wrap>
            {/*<Text>{message?.content}</Text>*/}
            {renderContent(message)}
            {/*<img width={200} height={200} src={"https://www.bigc.vn/files/logo/sieu-thi-go.jpg"} alt={""}/>*/}
            <Space style={{marginTop: 5}} size={'small'}>
              <Text style={{fontSize: 11}}>{dayjs(message?.createdAt)?.format("HH:mm A")}</Text>
              {
                message?.status === 'SEEN' ?
                  <img height={16} width={16} src={'/icons/icons8-double-check-24.png'} alt="avatar"/> :
                  <img height={16} width={16} src={'/icons/icons8-check-24.png'} alt="avatar"/>
              }
            </Space>
          </Flex>
          <ReactionMessage data={message?.reactions}/>
        </Card>
      </Popover>
    </Flex>

  )
}
export default MessageBox;
