import EmbeddedMessage from '@/pages/chatv2/content/components/EmbeddedMessage';
import FileMessage from '@/pages/chatv2/content/components/FileMessage';
import ImageMessage from '@/pages/chatv2/content/components/ImageMessage';
import MessageReactions from '@/pages/chatv2/content/components/MessageReactions';
import ReactionPicker from '@/pages/chatv2/content/components/ReactionPicker';
import VideoMessage from '@/pages/chatv2/content/components/VideoMessage';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { Avatar, Dropdown, Flex, Menu, MenuProps } from 'antd';
import dayjs from 'dayjs';
import { FC, useState } from 'react';

type Message = API.MessageResDTO & {
  isOwn: boolean;
};

type MessageBubbleProps = {
  currentUserId?: string;
  message: Message;
  onDelete: (messageId: string | undefined) => void;
  onEdit: (message: API.MessageResDTO) => void;
  onPin: (message: API.MessageResDTO) => void;
  onCopy: (content: any) => void;
  onReply: (message: API.MessageResDTO) => void;
  onReaction: (messageId: string, emoji: string) => void;
  allMessages: API.MessageResDTO[];
};
const MessageBubble: FC<MessageBubbleProps> = ({
  currentUserId,
  message,
  onDelete,
  onEdit,
  onPin,
  onCopy,
  onReply,
  onReaction,
  allMessages,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [isOwn, setIsOwn] = useState<boolean>(currentUserId === message?.senderId);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <ReactionPicker
          onSelect={handleReactionSelect}
          onClose={() => setShowReactionPicker(false)}
        />
      ),
      onClick: () => {
        setShowReactionPicker(true);
      },
      className: 'no-hover',
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Trả lời',
      icon: <ReplyOutlinedIcon />,
      onClick: () => {
        onReply?.(message);
      },
    },
    {
      key: '3',
      label: 'Chỉnh sửa',
      icon: <EditOutlinedIcon />,
      onClick: () => {
        onEdit?.(message);
      },
    },
    {
      key: '4',
      label: 'Sao chép',
      icon: <ContentCopyOutlinedIcon />,
      onClick: () => {
        onCopy?.(message.content);
      },
    },
    {
      key: '5',
      label: 'Ghim',
      icon: <PushPinOutlinedIcon />,
      onClick: () => {
        onPin?.(message);
      },
    },
    {
      key: '6',
      label: 'Chọn',
      icon: <CheckCircleOutlineOutlinedIcon />,
      onClick: () => {
        onCopy?.(message.content);
      },
    },
    {
      key: '6',
      label: 'Chuyển tiếp',
      icon: <ForwardOutlinedIcon />,
      onClick: () => {
        onCopy?.(message.content);
      },
    },
    {
      key: '7',
      label: 'Xóa',
      icon: <DeleteOutlinedIcon />,
    },
    {
      type: 'divider',
    },
  ];

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleReactionSelect = (emoji: string) => {
    if (message?.id) {
      onReaction(message.id, emoji);
    }
  };

  const handleReactionClick = (emoji: string) => {
    if (message?.id) {
      onReaction(message.id, emoji);
    }
  };

  const handleFileDownload = (file: any) => {
    alert(`Tải xuống file: ${file.name}`);
  };

  const handleMediaClick = (mediaUrl: string) => {
    window.open(mediaUrl, '_blank');
  };

  // Find the original message if this is a reply
  const replyToMessage = message.replyTo
    ? allMessages.find((msg) => msg.id === message.replyTo)
    : null;

  const renderMessageContent = () => {
    switch (message.type) {
      case 'IMAGE':
        return (
          <div>
            <ImageMessage
              src={message.imageUrl}
              alt={message.fileName || 'Image'}
              onClick={() => handleMediaClick(message.imageUrl)}
            />
            {message.content && (
              <div style={{ marginTop: '8px', fontSize: '14px' }}>{message.content}</div>
            )}
          </div>
        );

      case 'VIDEO':
        return (
          <div>
            <VideoMessage
              src={message.videoUrl}
              poster={message.thumbnailUrl}
              onClick={() => handleMediaClick(message.videoUrl)}
            />
            {message.content && (
              <div style={{ marginTop: '8px', fontSize: '14px' }}>{message.content}</div>
            )}
          </div>
        );

      case 'FILE':
        return (
          <div>
            <FileMessage file={message.file} onDownload={() => handleFileDownload(message.file)} />
            {message.content && (
              <div style={{ marginTop: '8px', fontSize: '14px' }}>{message.content}</div>
            )}
          </div>
        );

      case 'TEXT':
      default:
        return <div style={{ fontSize: '16px' }}>{message.content}</div>;
    }
  };

  return (
    <Flex
      className={showMenu ? 'message-item has-menu-open' : 'message-item'}
      justify={isOwn ? 'flex-end' : 'flex-start'}
      align={'baseline'}
      style={{
        marginBottom: 15,
        position: 'relative',
      }}
    >
      {!isOwn && <Avatar size={36} src={message?.avatar} style={{ marginRight: 8 }} />}

      <div style={{ maxWidth: '70%', position: 'relative' }}>
        <Dropdown
          popupRender={(menu) => (
            <Menu style={{ width: 200, fontSize: 16 }} mode="vertical" items={items} />
          )}
          trigger={['contextMenu']}
          onOpenChange={(open) => {
            setShowMenu(open);
            setShowReactionPicker(open);
          }}
        >
          <Flex
            vertical
            justify={'flex-start'}
            gap={10}
            onContextMenu={handleContextMenu}
            style={{
              padding: '8px 12px',
              borderRadius: isOwn ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
              backgroundColor: isOwn ? '#EEFFDE' : '#ffffff',
              color: isOwn ? 'black' : 'black',
              position: 'relative',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <EmbeddedMessage message={message?.replyTo} isView={true} />
            <Flex style={{ width: '100%' }} gap={10}>
              {renderMessageContent()}
              <div
                style={{
                  fontSize: '11px',
                  color: '#777',
                }}
              >
                <div style={{ visibility: 'hidden' }}>
                  {message?.pinned && <PushPinIcon />}
                  {message?.edited && 'edited'}
                  {dayjs(message?.sentAt)?.format('HH:mm')}
                  {isOwn && message?.status && (
                    <span>
                      {message?.status === 'READ' ? (
                        <DoneAllOutlinedIcon style={{ fontSize: 16, color: '#46BA43' }} />
                      ) : message.status === 'SENT' ? (
                        <DoneIcon style={{ fontSize: 16, color: '#46BA43' }} />
                      ) : (
                        <AccessTimeIcon style={{ fontSize: 16, color: '#46BA43' }} />
                      )}
                    </span>
                  )}
                </div>
                <Flex
                  gap={2}
                  // align={'normal'}
                  style={{
                    right: 5,
                    bottom: 2,
                    position: 'absolute',
                    alignItems: 'normal',
                  }}
                >
                  {message?.pinned && <PushPinIcon fontSize={'inherit'} color={'inherit'} />}
                  {message?.edited && <span style={{ color: '#46BA43' }}>{'edited'}</span>}

                  <span style={{ color: '#46BA43' }}>
                    {dayjs(message?.sentAt)?.format('HH:mm')}
                  </span>

                  {isOwn && message?.status && (
                    <span>
                      {message?.status === 'READ' ? (
                        <DoneAllOutlinedIcon style={{ fontSize: 16, color: '#46BA43' }} />
                      ) : message.status === 'SENT' ? (
                        <DoneIcon style={{ fontSize: 16, color: '#46BA43' }} />
                      ) : (
                        <AccessTimeIcon style={{ fontSize: 16, color: '#46BA43' }} />
                      )}
                    </span>
                  )}
                </Flex>
              </div>
            </Flex>
          </Flex>
        </Dropdown>

        <MessageReactions
          summaryReaction={message.summaryReaction}
          onReactionClick={handleReactionClick}
          onAddReaction={() => setShowReactionPicker(true)}
        />
      </div>
    </Flex>
  );
};
export default MessageBubble;
