import EmbeddedMessage from '@/pages/chatv2/content/components/EmbeddedMessage';
import { SendOutlined } from '@ant-design/icons';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import {Button, Dropdown, Flex, Input, MenuProps} from 'antd';
import { FC, useEffect, useState } from 'react';

const { TextArea } = Input;

type MessageInputProps = {
  onSend: (content: string, embeddedMessage?: any) => void;
  onEdit: (content: string, embeddedMessage: any) => void;
  onFileUpload?: () => void;
  placeholder?: string;
  disabled: boolean;
  embeddedMessage?: API.MessageResDTO;
  onClearEmbeddedMessage?: () => void;
};

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const MessageInput: FC<MessageInputProps> = ({
  onSend,
  onEdit,
  onFileUpload,
  placeholder = 'Nhập tin nhắn...',
  disabled = false,
  embeddedMessage,
  onClearEmbeddedMessage,
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
        setAction(embeddedMessage?.action);
      }
    }
  }, [embeddedMessage]);

  console.log('embeddedMessage', embeddedMessage);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', marginTop: 20 }}>
      <Flex style={{ marginTop: 10, marginBottom: 20 }} gap={10} align={'center'}>
        <Flex
          gap={10}
          vertical
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            borderRadius: 15,
            padding: '2px 10px',
          }}
        >
          <EmbeddedMessage message={embeddedMessage} onClose={onClearEmbeddedMessage} />
          <Flex align={'center'} gap={10} style={{ width: '100%' }}>
            <SentimentSatisfiedOutlinedIcon />
            <TextArea
              autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder={'Nhập tin nhắn'}
              variant={'borderless'}
              size="large"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={disabled}
              style={{ flex: 1 }}
            />
            <Dropdown menu={{ items }} placement="topRight" overlayStyle={{paddingBottom: 10}}>
              <AttachFileOutlinedIcon />
            </Dropdown>
          </Flex>
        </Flex>

        {/*<Button icon={<EmojiIcon/>} disabled={disabled}/>*/}

        <Button
          size={'large'}
          shape={'circle'}
          type="default"
          icon={<SendOutlined />}
          onClick={handleSend}
        />
      </Flex>
    </div>
  );
};
export default MessageInput;
