import {Button, Dropdown, Flex, Input, MenuProps, Spin} from "antd";
import {CloseIcon} from "@/components/Icon";
import ConversationItem from "@/pages/chatv2/sidebar/ConversationItem";
import React, {useEffect, useState} from "react";
import {useModel} from "@@/exports";
import {useWebSocket} from "@/hooks/useWebSocket";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EditIcon from '@mui/icons-material/Edit';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MessageBubble from "@/pages/chatv2/content/components/MessageBubble";
import {LoadingOutlined} from "@ant-design/icons";
import {Virtuoso} from "react-virtuoso";

const Conversations = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showConversations, setShowConversations] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState('1');
  const {
    conversations,
    isLoading,
    fetchConversations,
    updateActiveConversation,
    handleUpdateConversation
  } = useModel("conversation");
  const {subscribe, send} = useWebSocket();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Tạo nhóm mới',
      icon: <GroupOutlinedIcon/>
    },
    {
      key: '2',
      label: 'Tạo tin nhắn mới',
      icon: <PersonOutlineOutlinedIcon/>
    },
  ];

  useEffect(() => {
    fetchConversations();

    const unSubscribe = subscribe(`/user/queue/conversation`, (msg) => {
      console.log('msg queue...........', msg);
      handleUpdateConversation(msg);
    });

    return () => {
      unSubscribe()
    }
  }, []);

  const handleSelectConversation = (conversation: API.UserConversationResDTO) => {
    updateActiveConversation(conversation);
    if (isMobile) {
      setShowConversations(false);
    }
  };

  return (
    <div style={{
      width: isMobile ? '100%' : '800px',
      borderRight: isMobile ? 'none' : '1px solid #f0f0f0',
      position: isMobile ? 'absolute' : 'relative',
      top: 0,
      left: 0,
      height: '100%',
      backgroundColor: 'white',
      zIndex: isMobile ? 1000 : 'auto',
      transform: isMobile ? (showConversations ? 'translateX(0)' : 'translateX(-100%)') : 'none',
      transition: isMobile ? 'transform 0.3s ease' : 'none',
      display: isMobile && !showConversations ? 'none' : 'block'
    }}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
    >
      {isMobile && (
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{margin: 0, fontSize: '18px', fontWeight: 600}}>Tin nhắn</h2>
          <Button
            type="text"
            icon={<CloseIcon/>}
            onClick={() => setShowConversations(false)}
          />
        </div>
      )}

      <Flex style={{padding: '14px 16px'}}>
        <Input prefix={<SearchOutlinedIcon/>}
               placeholder="Tìm kiếm cuộc trò chuyện..."
               size={'large'}
               variant="filled"
               style={{borderRadius: 15, width: '100%'}}/>
      </Flex>

      <Virtuoso
        totalCount={conversations?.length}
        defaultItemHeight={100}
        data={conversations}
        followOutput={(isAtBottom) => {
          return isAtBottom;
        }}
        // rangeChanged={({startIndex, endIndex}) => handleRangeChanged(startIndex, endIndex)}
        firstItemIndex={0}
        initialTopMostItemIndex={0}
        // startReached={(index) => {
        //   handleFetchMoreMessages();
        // }}
        itemContent={(index, conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === activeConversationId}
            onClick={() => handleSelectConversation(conversation)}
          />
        )
        }
        components={{
          Header: () => {
            return (
              // <Flex align="center" gap="middle" justify={"center"}>
              //   <Spin indicator={<LoadingOutlined spin={isLoading}/>}/>
              // </Flex>
              <></>
            )
          },
          Scroller: React.forwardRef((props, ref) => (
            <div className="chat-scroll-wrapper" ref={ref} {...props} />
          )),
          // List: React.forwardRef((props, ref) => {
          //   return <div className={"message-list-container"} {...props} ref={ref}/>
          // })
        }}
      />

      {
        isHovered &&
        <Dropdown menu={{items}} placement="topRight">
          <Button
            size="large"
            shape="circle"
            type="primary"
            style={{bottom: 20, right: 20, position: 'absolute'}}
            icon={<EditIcon style={{fontSize: 24}}/>}
          />
        </Dropdown>
      }

    </div>
  )
}

export default Conversations;
