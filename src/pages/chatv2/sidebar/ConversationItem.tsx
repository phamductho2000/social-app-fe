import {Avatar, Badge} from "antd";
import {FC} from "react";

type ConversationItemProps = {
  conversation: API.UserConversationResDTO;
  isActive?: boolean;
  onClick?: (conversationId: string) => void
};

const ConversationItem: FC<ConversationItemProps> = ({ conversation, isActive = false, onClick }) => {

  const handleClick = () => {
    if (conversation?.id) {
      onClick?.(conversation?.id);
    }
  };

  // @ts-ignore
  return (
    <div
      onClick={handleClick}
      style={{
        padding: '12px 16px',
        cursor: 'pointer',
        backgroundColor: isActive ? '#e6f7ff' : 'transparent',
        borderLeft: isActive ? '3px solid #1890ff' : '3px solid transparent',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Badge
          dot={conversation.type === 'private'}
          color="#52c41a"
        >
          <Avatar
            shape={"circle"}
            src={conversation.avatar}
            size={40}
          />
        </Badge>

        <div style={{ flex: 1, marginLeft: 12, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: '#000',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '60%',
              }}
            >
              {conversation.name}
            </div>
            {/*{conversation.lastMessage && (*/}
            {/*  <div style={{ fontSize: '12px', color: '#999' }}>*/}
            {/*    {conversation.lastMessage?.timestamp.toLocaleTimeString('vi-VN', {*/}
            {/*      hour: '2-digit',*/}
            {/*      minute: '2-digit',*/}
            {/*    })}*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <div
              style={{
                fontSize: '13px',
                color: '#666',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '70%',
              }}
            >
              {conversation.lastMessage?.content || 'Chưa có tin nhắn'}
            </div>
            {conversation?.unreadCount as number > 0 && (
              <Badge count={conversation.unreadCount} color={"blue"}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConversationItem;
