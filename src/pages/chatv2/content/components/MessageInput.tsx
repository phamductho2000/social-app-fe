import React, {FC, useState} from "react";
import {Button, Flex, Input} from "antd";
import ReplyPreview from "@/pages/chatv2/content/components/ReplyPreview";
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SendIcon from '@mui/icons-material/Send';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import {SendOutlined} from "@ant-design/icons";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

type MessageInputProps = {
  onSend: (message: string, replyToId?: string) => void;
  onFileUpload: () => void;
  placeholder?: string;
  disabled: boolean;
  replyTo?: API.MessageResDTO;
  onClearReply?: () => void;
}

const MessageInput: FC<MessageInputProps> = ({
                                               onSend,
                                               onFileUpload,
                                               placeholder = 'Nhập tin nhắn...',
                                               disabled = false,
                                               replyTo,
                                               onClearReply
                                             }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim(), replyTo?.id);
      setMessage('');
      onClearReply?.();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{maxWidth: 800, margin: '0 auto', width: '100%'}}>


      <Flex style={{marginTop: 10, marginBottom: 20}} gap={10} align={"center"}>
        <Flex gap={15} vertical style={{backgroundColor: '#ffffff', width: '100%', borderRadius: 15,  padding: 10}}>
          <ReplyPreview replyTo={replyTo} />
          <Flex align={"center"} gap={10} style={{width: '100%'}}>
            <SentimentSatisfiedOutlinedIcon/>
            <Input
              variant={'borderless'}
              size="large"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={replyTo ? `Trả lời ${replyTo.sender.name}...` : placeholder}
              disabled={disabled}
              style={{padding: 0, borderRadius: 0, flex: 1}}
            />
            <AttachFileOutlinedIcon/>
          </Flex>

        </Flex>


        {/*<Button icon={<EmojiIcon/>} disabled={disabled}/>*/}

        <Button
          size={"large"}
          shape={"circle"}
          type="primary"
          icon={<SendOutlined/>}
          onClick={handleSend}
          disabled={disabled || !message.trim()}
        />
      </Flex>
    </div>
  );
};
export default MessageInput;
