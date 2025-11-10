import {Avatar, Badge, Flex, Typography} from "antd";
import {FC} from "react";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import dayjs from "dayjs";

type ConversationItemProps = {
  conversation: API.UserConversationResDTO;
  isActive?: boolean;
  onClick?: (conversationId: string) => void
};

const {Title, Text} = Typography;

const ConversationItem: FC<ConversationItemProps> = ({conversation, isActive = false, onClick}) => {

  const handleClick = () => {
    if (conversation?.id) {
      onClick?.(conversation?.id);
    }
  };

  return (
    <div
      className={'conversation-item'}
      onClick={handleClick}
      style={{
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        padding: '12px 16px',
        cursor: 'pointer',
        backgroundColor: isActive ? '#e6f7ff' : 'transparent',
        borderLeft: isActive ? '3px solid #1890ff' : '3px solid transparent',
        width: '100%'
      }}
    >
      <Flex gap={10} align={'center'} style={{width: "100%"}}>
        <Badge
          dot={conversation.type === 'private'}
          color="#52c41a"
        >
          <Avatar
            shape={"circle"}
            src={conversation.avatar}
            size={54}
          />
        </Badge>

        <Flex justify={'space-between'} vertical style={{flex: 1, minWidth: 0, width: '100%'}}>
          <Flex justify={"space-between"}>
            <Title level={5} style={{marginBottom: 0}}>{conversation.name}</Title>
            <Flex gap={5} align={'center'}>
              <DoneAllOutlinedIcon style={{fontSize: 16, color: '#46BA43'}}/>
              <span style={{fontWeight: 400, fontSize: 12}}>{dayjs()?.format("HH:mm")}</span>
            </Flex>
          </Flex>

          <Flex align={'center'} justify={'flex-start'} style={{width: "100%"}}>
            <Text ellipsis={{tooltip: false}} style={{flex: 1, minWidth: 0}}>
              {conversation.lastMessage?.content || 'Chưa có tin nhắn'}
            </Text>
            {conversation?.unreadCount as number > 0 && (
              <Badge count={conversation.unreadCount} color={"green"}/>
            )}
          </Flex>

        </Flex>
      </Flex>

    </div>
  );
};
export default ConversationItem;
