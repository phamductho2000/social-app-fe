import React, {FC, useEffect, useState} from "react";
import {Button, Flex, Input} from "antd";
import EmbeddedMessage from "@/pages/chatv2/content/components/EmbeddedMessage";
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import {SendOutlined} from "@ant-design/icons";

const { TextArea } = Input;

type MessageInputProps = {
  onSend: (content: string, embeddedMessage?: any) => void;
  onEdit: (content: string, embeddedMessage: any) => void;
  onFileUpload?: () => void;
  placeholder?: string;
  disabled: boolean;
  embeddedMessage?: API.MessageResDTO;
  onClearEmbeddedMessage?: () => void;
}

const MessageInput: FC<MessageInputProps> = ({
                                               onSend,
                                               onEdit,
                                               onFileUpload,
                                               placeholder = 'Nhập tin nhắn...',
                                               disabled = false,
                                               embeddedMessage,
                                               onClearEmbeddedMessage
                                             }) => {
  const [message, setMessage] = useState('');
  const [action, setAction] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      switch (action) {
        case 'EDIT':
          onEdit(message.trim(), embeddedMessage);
          break;
        default:
          onSend(message.trim(), embeddedMessage);
          break;
      }
      setMessage('');
      onClearEmbeddedMessage?.();
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (embeddedMessage) {
      if (embeddedMessage?.action === 'EDIT') {
        setMessage(embeddedMessage?.content);
        setAction(embeddedMessage?.action)
      }
    }
  }, [embeddedMessage])

  console.log('embeddedMessage',  embeddedMessage);

  return (
    <div style={{maxWidth: 800, margin: '0 auto', width: '100%', marginTop: 20}}>
      <Flex style={{marginTop: 10, marginBottom: 20}} gap={10} align={"center"}>
        <Flex gap={10} vertical style={{backgroundColor: '#ffffff', width: '100%', borderRadius: 15,  padding: '2px 10px'}}>
          <EmbeddedMessage message={embeddedMessage} onClose={onClearEmbeddedMessage}/>
          <Flex align={"center"} gap={10} style={{width: '100%'}}>
            <SentimentSatisfiedOutlinedIcon/>
            <TextArea
              autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder={"Nhập tin nhắn"}
              variant={'borderless'}
              size="large"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={disabled}
              style={{flex: 1}}
            />
            <AttachFileOutlinedIcon/>
          </Flex>
        </Flex>


        {/*<Button icon={<EmojiIcon/>} disabled={disabled}/>*/}

        <Button
          size={"large"}
          shape={"circle"}
          type="default"
          icon={<SendOutlined/>}
          onClick={handleSend}
        />
      </Flex>
    </div>
  );
};
export default MessageInput;
