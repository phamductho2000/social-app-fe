import {FC, useState} from "react";
import {Avatar, Dropdown, Menu, MenuProps, Popover} from "antd";
import MessageReactions from "@/pages/chatv2/content/components/MessageReactions";
import ReactionPicker from "@/pages/chatv2/content/components/ReactionPicker";
import ImageMessage from "@/pages/chatv2/content/components/ImageMessage";
import VideoMessage from "@/pages/chatv2/content/components/VideoMessage";
import FileMessage from "@/pages/chatv2/content/components/FileMessage";
import dayjs from "dayjs";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

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
      label: <ReactionPicker
        onSelect={handleReactionSelect}
        onClose={() => setShowReactionPicker(false)}
      />,
      // icon: <EmojiIcon/>,
      onClick: () => {
        setShowReactionPicker(true);
        setShowMenu(false);
      },
      className: "no-hover"
    },
    {
      type: 'divider',
    },
    {
      //  style: {
      //   margin: 10,
      //   fontSize: 16
      // },
      key: '2',
      label: 'Trả lời',
      icon: <ReplyOutlinedIcon/>,
      onClick: () => {
        onReply?.(message);
      }
    },
    {
      key: '3',
      label: 'Chỉnh sửa',
      icon: <EditOutlinedIcon/>
    },
    {
      key: '4',
      label: 'Sao chép',
      icon: <ContentCopyOutlinedIcon/>,
      onClick: () => {
        onCopy?.(message.content);
      }
    },
    {
      key: '5',
      label: 'Ghim',
      icon: <PushPinOutlinedIcon/>,
      onClick: () => {
        onCopy?.(message.content);
      }
    },
    {
      key: '6',
      label: 'Chọn',
      icon: <CheckCircleOutlineOutlinedIcon/>,
      onClick: () => {
        onCopy?.(message.content);
      }
    },
    {
      key: '6',
      label: 'Chuyển tiếp',
      icon: <ForwardOutlinedIcon/>,
      onClick: () => {
        onCopy?.(message.content);
      }
    },
    {
      key: '7',
      label: 'Xóa',
      icon: <DeleteOutlinedIcon/>
    },
    {
      type: "divider"
    }
  ];

  console.log('showMenu', showMenu)

  const handleContextMenu = (e) => {
    e.preventDefault();
    // setShowMenu(!showMenu);
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
        return (
          <div style={{fontSize: '16px'}}>
            {message.content}
          </div>
        );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isOwn ? 'flex-end' : 'flex-start',
        marginBottom: 15,
        position: 'relative',
      }}
    >
      {!isOwn && (
        <Avatar
          size={32}
          src={message?.sender?.avatar}
          style={{marginRight: 8}}
        />
      )}

      <div style={{maxWidth: '70%', position: 'relative'}}>
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


        <Dropdown popupRender={(menu) => (
          // <Popover
          //   content={
          //
          //     <ReactionPicker
          //       onSelect={handleReactionSelect}
          //       onClose={() => setShowReactionPicker(false)}
          //     />
          //   }
          // trigger="click"
          // trigger="click"
          // open={showReactionPicker} // Thêm prop open để control
          // onOpenChange={(visible) => setShowReactionPicker(visible)}
          // onOpenChange={handleClickChange}
          // >
          <Menu
            style={{width: 150, fontSize: 16}}
            mode="vertical"
            items={items}
          />
          // </Popover>
        )}
                  trigger={['contextMenu']}
                  onOpenChange={(open) => {
                    setShowMenu(open);
                    // Đóng popover khi dropdown đóng
                    setShowReactionPicker(open);

                  }}
        >
          <div
            onContextMenu={handleContextMenu}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: isOwn ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
              backgroundColor: isOwn ? '#EEFFDE' : '#ffffff',
              color: isOwn ? 'black' : 'black',
              position: 'relative',
              cursor: 'pointer',
              width: 'fit-content'
            }}
          >
            {renderMessageContent()}
            <div
              style={{
                fontSize: "11px",
                color: "#777",
              }}
            >
              <div style={{visibility: 'hidden'}}>
                {dayjs(message?.sentAt)?.format("HH:mm")}
                {isOwn && message?.status && (
                  <span style={{marginLeft: 4}}>
                  {message?.status === 'READ' ? '✓✓' : message.status === 'SENT' ? '✓' : '○'}
                </span>
                )}
              </div>
              <div style={{
                bottom: 3,
                position: 'absolute',
              }}>
                {dayjs(message?.sentAt)?.format("HH:mm")}
                {isOwn && message?.status && (
                  <span style={{marginLeft: 4}}>
                  {message?.status === 'READ' ? '✓✓' : message.status === 'SENT' ? '✓' : '○'}
                </span>
                )}
              </div>
            </div>
          </div>
        </Dropdown>

        <MessageReactions
          summaryReaction={message.summaryReaction}
          onReactionClick={handleReactionClick}
          onAddReaction={() => setShowReactionPicker(true)}
        />

        {/*{showReactionPicker && (*/}
        {/*  <ReactionPicker*/}
        {/*    onSelect={handleReactionSelect}*/}
        {/*    onClose={() => setShowReactionPicker(false)}*/}
        {/*  />*/}
        {/*)}*/}

        {/*<div*/}
        {/*  style={{*/}
        {/*    fontSize: '12px',*/}
        {/*    color: '#999',*/}
        {/*    marginTop: 4,*/}
        {/*    // textAlign: isOwn ? 'right' : 'left',*/}
        {/*    textAlign: 'right',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {dayjs(message?.sentAt)?.format("HH:mm")}*/}
        {/*  {isOwn && message?.status && (*/}
        {/*    <span style={{marginLeft: 4}}>*/}
        {/*      {message?.status === 'READ' ? '✓✓' : message.status === 'SENT' ? '✓' : '○'}*/}
        {/*    </span>*/}
        {/*  )}*/}
        {/*</div>*/}
      </div>
    </div>
  )
    ;
};
export default MessageBubble;
