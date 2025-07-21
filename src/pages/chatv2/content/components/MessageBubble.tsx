import {FC, useState} from "react";
import {Avatar, Dropdown, MenuProps} from "antd";
import {EmojiIcon, ReplyIcon} from "@/components/Icon";
import MessageReactions from "@/pages/chatv2/content/components/MessageReactions";
import ReactionPicker from "@/pages/chatv2/content/components/ReactionPicker";
import ImageMessage from "@/pages/chatv2/content/components/ImageMessage";
import VideoMessage from "@/pages/chatv2/content/components/VideoMessage";
import FileMessage from "@/pages/chatv2/content/components/FileMessage";
import dayjs from "dayjs";
import {CopyOutlined, EditOutlined, RestOutlined} from "@ant-design/icons";


type Message = API.MessageResDTO & {
  isOwn: boolean
};

type MessageBubbleProps = {
  currentUserId?: string,
  message: Message,
  onDelete: (messageId: string | undefined) => void,
  onEdit: (messageId: string) => void,
  onCopy: (content: any) => void,
  onReply: (message: API.MessageResDTO) => void,
  onReaction: (messageId: string, emoji: string) => void,
  allMessages: API.MessageResDTO[]
}
const MessageBubble: FC<MessageBubbleProps> = ({
                                                 currentUserId,
                                                 message,
                                                 onDelete,
                                                 onEdit,
                                                 onCopy,
                                                 onReply,
                                                 onReaction,
                                                 allMessages
                                               }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [isOwn, setIsOwn] = useState<boolean>(currentUserId === message?.senderId);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Thả cảm xúc',
      icon: <EmojiIcon/>,
      onClick: () => {
        setShowReactionPicker(true);
        setShowMenu(false);
      }
    },
    {
      key: '2',
      label: 'Trả lời',
      icon: <ReplyIcon/>,
      onClick: () => {
        onReply?.(message);
      }
    },
    {
      key: '3',
      label: 'Chỉnh sửa',
      icon: <EditOutlined/>
    },
    {
      key: '4',
      label: 'Sao chép',
      icon: <CopyOutlined/>,
      onClick: () => {
        onCopy?.(message.content);
      }
    },
    {
      key: '5',
      label: 'Xóa',
      icon: <RestOutlined/>
    },
  ];

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
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
  const replyToMessage = message.replyTo ?
    allMessages.find(msg => msg.id === message.replyTo) : null;

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
              <div style={{marginTop: '8px', fontSize: '14px'}}>
                {message.content}
              </div>
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
              <div style={{marginTop: '8px', fontSize: '14px'}}>
                {message.content}
              </div>
            )}
          </div>
        );

      case 'FILE':
        return (
          <div>
            <FileMessage
              file={message.file}
              onDownload={() => handleFileDownload(message.file)}
            />
            {message.content && (
              <div style={{marginTop: '8px', fontSize: '14px'}}>
                {message.content}
              </div>
            )}
          </div>
        );

      case 'TEXT':
      default:
        return message.content;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: 15,
        position: 'relative',
      }}
    >
      {/*{!isOwn && (*/}
      <Avatar
        size={32}
        src={message?.sender?.avatar}
        style={{marginRight: 8}}
      />
      {/*)}*/}

      <div style={{maxWidth: '70%', position: 'relative'}}>
        {/* Reply indicator */}
        {replyToMessage && (
          <div style={{
            backgroundColor: isOwn ? 'rgba(255,255,255,0.2)' : '#e6f7ff',
            border: `2px solid ${isOwn ? 'rgba(255,255,255,0.3)' : '#1890ff'}`,
            borderRadius: '6px',
            padding: '4px 8px',
            marginBottom: '4px',
            fontSize: '12px',
          }}>
            <div style={{
              color: isOwn ? 'rgba(255,255,255,0.8)' : '#666',
              marginBottom: '2px'
            }}>
              {replyToMessage.sender.name}
            </div>
            <div style={{
              color: isOwn ? 'rgba(255,255,255,0.9)' : '#333',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {replyToMessage.content}
            </div>
          </div>
        )}

        <Dropdown menu={{items}} trigger={['contextMenu']}>
          <div
            onContextMenu={handleContextMenu}
            style={{
              padding: '8px 12px',
              borderRadius: '12px 12px 12px 4px',
              backgroundColor: isOwn ? '#1890ff' : '#f0f0f0',
              color: isOwn ? 'white' : 'black',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            {renderMessageContent()}
            {showReactionPicker && (
              <ReactionPicker
                onSelect={handleReactionSelect}
                onClose={() => setShowReactionPicker(false)}
              />
            )}
          </div>

        </Dropdown>

        <MessageReactions
          summaryReaction={message.summaryReaction}
          onReactionClick={handleReactionClick}
          onAddReaction={() => setShowReactionPicker(true)}
        />

        <div
          style={{
            fontSize: '12px',
            color: '#999',
            marginTop: 4,
            // textAlign: isOwn ? 'right' : 'left',
            textAlign: 'left',
          }}
        >
          {dayjs(message?.sentAt)?.format("HH:mm")}
          {isOwn && message?.status && (
            <span style={{marginLeft: 4}}>
              {message?.status === 'READ' ? '✓✓' : message.status === 'SENT' ? '✓' : '○'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default MessageBubble;
