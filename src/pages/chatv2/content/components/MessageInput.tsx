import React, {FC, useState} from "react";
import {Button, Input} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {AttachIcon, EmojiIcon, SendIcon} from "@/components/Icon";
import ReplyPreview from "@/pages/chatv2/content/components/ReplyPreview";
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
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
    <div style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
      <ReplyPreview replyTo={replyTo} onClose={onClearReply}/>
      <div style={{padding: '12px', borderTop: '1px solid #f0f0f0'}}>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: '8px'}}>
          <Button
            icon={<AttachIcon/>}
            disabled={disabled}
          />

          <Input
            prefix={<SentimentSatisfiedOutlinedIcon fontWeight={200}/>}
            size="large"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={replyTo ? `Trả lời ${replyTo.sender.name}...` : placeholder}
            disabled={disabled}
            style={{flex: 1}}
          />

          <Button icon={<EmojiIcon/>} disabled={disabled}/>

          <Button
            type="primary"
            icon={<SendIcon/>}
            onClick={handleSend}
            disabled={disabled || !message.trim()}
          />
        </div>
      </div>
    </div>
  );
};
export default MessageInput;
