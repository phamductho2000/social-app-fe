import {Button} from "antd";
import {CloseIcon} from "@/components/Icon";
import Input from "@/pages/chatv2/content/components/Input";
import ConversationItem from "@/pages/chatv2/sidebar/ConversationItem";
import {useEffect, useState} from "react";
import {useModel} from "@@/exports";
import {useWebSocket} from "@/hooks/useWebSocket";


const Conversations = () => {
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
    }}>
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

      <div style={{padding: '16px', borderBottom: '1px solid #f0f0f0'}}>
        <Input placeholder="Tìm kiếm cuộc trò chuyện..." value={undefined} onChange={undefined} onKeyPress={undefined}/>
      </div>

      <div style={{
        overflowY: 'auto',
        height: isMobile ? 'calc(100% - 128px)' : 'calc(100% - 64px)'
      }}>
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === activeConversationId}
            onClick={() => handleSelectConversation(conversation)}
          />
        ))}
      </div>
    </div>
  )
}

export default Conversations;
