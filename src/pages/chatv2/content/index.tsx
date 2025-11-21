import React, {useEffect, useRef, useState} from "react";
import MessageBubble from "@/pages/chatv2/content/components/MessageBubble";
import {Flex, Spin} from "antd";
import MessageInput from "@/pages/chatv2/content/components/MessageInput";
import ChatHeader from "@/pages/chatv2/content/components/ChatHeader";
import {useModel} from "@umijs/max";
import {useWebSocket} from "@/hooks/useWebSocket";
import {useCurrentUser} from "@/selectors/useCurrentUser";
import {Virtuoso} from "react-virtuoso";
import {LoadingOutlined} from "@ant-design/icons";
import {
  TOPIC_CONNECT_CONVERSATION,
  TOPIC_MESSAGE_EDIT,
  TOPIC_MESSAGE_PIN,
  TOPIC_MESSAGE_REACT,
  TOPIC_MESSAGE_SEND
} from "@/core/constant";
import {markReadMessages} from "@/services/message/messageController";
import background from "../../../../public/background.jpg";

const ChatContent = () => {
  const [activeConversationId, setActiveConversationId] = useState('1');
  const [isMobile, setIsMobile] = useState(false);
  const [showConversations, setShowConversations] = useState(false);
  const [showInfoSidebar, setShowInfoSidebar] = useState(false);
  const currentUser = useCurrentUser();
  const {messages, handleNewMessage, fetchMessages, isLoading, total} = useModel("message");
  const {embeddedMessage, updateEmbeddedMessage} = useModel("chat");
  const {activeConversation} = useModel("conversation");
  const {subscribe, send} = useWebSocket();
  const [visibleRange, setVisibleRange] = useState({
    startIndex: 0,
    endIndex: 0,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (visibleRange?.startIndex === 0) {
  //     if (activeConversation?.conversationId) {
  //       fetchMessages(activeConversation.conversationId);
  //     }
  //   }
  // }, [visibleRange]);

  const handleFetchMoreMessages = () => {
    if (activeConversation?.conversationId && total > 20) {
      fetchMessages(activeConversation.conversationId);
    }
  }

  const handleInitialFetchMessages = () => {
    if (activeConversation?.conversationId) {
      fetchMessages(activeConversation.conversationId);
    }
  }

  const handleConnectConversation = () => {
    if (activeConversation?.conversationId) {
      send(TOPIC_CONNECT_CONVERSATION + activeConversation?.conversationId, {})
    }
  }

  const handleRangeChanged = (startIndex: number, endIndex: number) => {
    const visibleMessages = messages.slice(startIndex, endIndex + 1);
    const req = visibleMessages?.filter(f => f.senderId !== currentUser?.userId && f.status === "SENT");
    if (req?.length > 0) {
      // @ts-ignore
      markReadMessages(req.map(m => m.id)).then(() => {
      })

    }
    console.log('visibleMessages', visibleMessages);
  }

  useEffect(() => {

    handleInitialFetchMessages();
    handleConnectConversation();

    const unSubscribe = subscribe(`/topic/message/conversation/${activeConversation?.conversationId}`, (msg) => {
      handleNewMessage(msg);
      console.log('msg...........', msg);
    });

    return () => {
      unSubscribe()
    }

  }, [activeConversation]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setShowInfoSidebar(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);


  const handleSendMessage = (content: string, embeddedMessage?: any) => {
    const newMessage: any = {
      tempId: Date.now().toString(),
      conversationId: activeConversation?.conversationId,
      content,
      type: 'TEXT',
      senderId: currentUser?.userId,
      userName: currentUser?.username,
      sentAt: new Date(),
      isOwn: true,
      status: 'SENDING',
      replyTo: embeddedMessage,
    };

    handleNewMessage(newMessage);

    send(TOPIC_MESSAGE_SEND + activeConversation?.conversationId, newMessage)
  };

  const handleEditMessage = (content: string, embeddedMessage: any) => {
    if (embeddedMessage) {
      embeddedMessage.content = content;
      send(TOPIC_MESSAGE_EDIT + activeConversation?.conversationId, embeddedMessage)
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {

    const exist = messages.find(f => f.id === messageId);
    if (exist) {
      const summaryReaction = exist.summaryReaction ?? {};
      if (summaryReaction?.[emoji]) {
        summaryReaction[emoji] = summaryReaction?.[emoji] + 1;
      } else {
        summaryReaction[emoji] = 1;
      }
      exist.summaryReaction = summaryReaction;
    }
    handleNewMessage(exist);
    const payload = {
      conversationId: activeConversation?.conversationId,
      messageId: messageId,
      emoji: emoji,
      userId: currentUser?.userId,
    }
    send(TOPIC_MESSAGE_REACT + activeConversation?.conversationId, payload)
  };

  const handleReply = (message: API.MessageResDTO) => {
    updateEmbeddedMessage(message, "REPLY");
  };

  const handleEdit = (message: API.MessageResDTO) => {
    updateEmbeddedMessage(message, "EDIT");
  };

  const handlePin = (message: any) => {
    if (message) {
      send(TOPIC_MESSAGE_PIN + activeConversation?.conversationId, embeddedMessage)
    }
  };

  const handleClearEmbeddedMessage = () => {
    updateEmbeddedMessage(undefined);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content).then(r => {
    });
    alert('Đã sao chép tin nhắn!');
  };
  console.log("messages", messages)
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      width: isMobile ? '100%' : '100%',
    }}>
      <ChatHeader
        conversation={activeConversation}
        onCall={() => alert('Voice call started')}
        onVideoCall={() => alert('Video call started')}
        onBack={() => setShowConversations(true)}
        onToggleInfo={() => setShowInfoSidebar(!showInfoSidebar)}
        showBackButton={isMobile}
        showInfoButton={!isMobile}
      />

      {/*{isMobile && !activeConversationId && (*/}
      {/*  <div style={{*/}
      {/*    flex: 1,*/}
      {/*    display: 'flex',*/}
      {/*    flexDirection: 'column',*/}
      {/*    alignItems: 'center',*/}
      {/*    justifyContent: 'center',*/}
      {/*    padding: '20px'*/}
      {/*  }}>*/}
      {/*    <h3 style={{color: '#666', marginBottom: '16px'}}>Chào mừng đến với Chat!</h3>*/}
      {/*    <Button*/}
      {/*      type="primary"*/}
      {/*      onClick={() => setShowConversations(true)}*/}
      {/*    >*/}
      {/*      Chọn cuộc trò chuyện*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*)}*/}

      <div style={{
        height: '100%',
        backgroundColor: '#f1f1f1',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${background})`,
        justifyContent: 'end'
      }}>
        {/*{activeConversationId && (*/}
          <>
            {
              messages?.length > 0 &&
              <Virtuoso
                totalCount={messages?.length}
                defaultItemHeight={100}
                data={messages}
                followOutput={(isAtBottom) => {
                  return isAtBottom;
                }}
                rangeChanged={({startIndex, endIndex}) => handleRangeChanged(startIndex, endIndex)}
                firstItemIndex={0}
                initialTopMostItemIndex={messages.length - 1}
                startReached={(index) => {
                  handleFetchMoreMessages();
                }}
                itemContent={(index, message) => (
                  <MessageBubble
                    currentUserId={currentUser?.userId}
                    key={message.id}
                    message={message}
                    allMessages={messages}
                    onCopy={handleCopy}
                    onEdit={handleEdit}
                    onPin={handlePin}
                    onDelete={(id) => {
                      alert(`Deleted message: ${id}`);
                    }}
                    onReply={handleReply}
                    onReaction={handleReaction}
                  />)
                }
                components={{
                  Header: () => {
                    return (
                      <Flex align="center" gap="middle" justify={"center"}>
                        <Spin indicator={<LoadingOutlined spin={isLoading}/>}/>
                      </Flex>
                    )
                  },
                  Scroller: React.forwardRef((props, ref) => (
                    <div className="chat-scroll-wrapper" ref={ref} {...props} />
                  )),
                  List: React.forwardRef((props, ref) => {
                    return <div className={"message-list-container"}>
                      <div className={"message-list"} {...props} ref={ref}/>
                    </div>
                  })
                }}
              />
            }

            <MessageInput
              onSend={handleSendMessage}
              onEdit={handleEditMessage}
              disabled={!activeConversationId}
              embeddedMessage={embeddedMessage}
              onClearEmbeddedMessage={handleClearEmbeddedMessage}
              // onFileUpload={undefined}
            />
          </>
        {/*)}*/}
      </div>

    </div>

    //   {/* Info Sidebar */}
    //   {!isMobile && (
    //     <ChatInfoSidebar
    //       conversation={activeConversation}
    //       isVisible={showInfoSidebar}
    //       onClose={() => setShowInfoSidebar(false)}
    //     />
    //   )}
    //
    //
    // {/* Mobile Menu Button */}
    // {isMobile && activeConversationId && !showConversations && (
    //   <button
    //     onClick={() => setShowConversations(true)}
    //     style={{
    //       position: 'fixed',
    //       top: '20px',
    //       left: '20px',
    //       width: '44px',
    //       height: '44px',
    //       borderRadius: '50%',
    //       backgroundColor: '#1890ff',
    //       border: 'none',
    //       color: 'white',
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //       boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    //       cursor: 'pointer',
    //       zIndex: 999,
    //     }}
    //   >
    //     <MenuIcon/>
    //   </button>
    // )}

  );
};

export default ChatContent;
