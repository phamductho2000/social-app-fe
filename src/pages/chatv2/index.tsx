import Conversations from "@/pages/chatv2/sidebar";
import ChatContent from "@/pages/chatv2/content";
import {useState} from "react";
import {Flex} from "antd";

export const mockUsers = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    status: 'online',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    status: 'away',
  },
  {
    id: '3',
    name: 'Lê Văn C',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    status: 'offline',
    lastSeen: new Date(Date.now() - 3600000),
  },
];

export const mockConversations = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    unreadCount: 2,
    type: 'private',
    participants: [mockUsers[0]],
    lastMessage: {
      id: '1',
      content: 'Chào bạn! Bạn khỏe không?',
      type: 'text',
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
  },
  {
    id: '2',
    name: 'Nhóm Dự án ABC',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=group1',
    unreadCount: 0,
    type: 'group',
    participants: mockUsers,
    lastMessage: {
      id: '2',
      content: 'Meeting lúc 2h chiều nhé mọi người',
      type: 'text',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 600000),
      isOwn: true,
    },
  },
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    unreadCount: 2,
    type: 'private',
    participants: [mockUsers[0]],
    lastMessage: {
      id: '1',
      content: 'Chào bạn! Bạn khỏe không?',
      type: 'text',
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
  },
  {
    id: '2',
    name: 'Nhóm Dự án ABC',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=group1',
    unreadCount: 0,
    type: 'group',
    participants: mockUsers,
    lastMessage: {
      id: '2',
      content: 'Meeting lúc 2h chiều nhé mọi người',
      type: 'text',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 600000),
      isOwn: true,
    },
  },
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    unreadCount: 2,
    type: 'private',
    participants: [mockUsers[0]],
    lastMessage: {
      id: '1',
      content: 'Chào bạn! Bạn khỏe không?',
      type: 'text',
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
  },
  {
    id: '2',
    name: 'Nhóm Dự án ABC',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=group1',
    unreadCount: 0,
    type: 'group',
    participants: mockUsers,
    lastMessage: {
      id: '2',
      content: 'Meeting lúc 2h chiều nhé mọi người',
      type: 'text',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 600000),
      isOwn: true,
    },
  },
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    unreadCount: 2,
    type: 'private',
    participants: [mockUsers[0]],
    lastMessage: {
      id: '1',
      content: 'Chào bạn! Bạn khỏe không?',
      type: 'text',
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
  },
  {
    id: '2',
    name: 'Nhóm Dự án ABC',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=group1',
    unreadCount: 0,
    type: 'group',
    participants: mockUsers,
    lastMessage: {
      id: '2',
      content: 'Meeting lúc 2h chiều nhé mọi người',
      type: 'text',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 600000),
      isOwn: true,
    },
  },
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    unreadCount: 2,
    type: 'private',
    participants: [mockUsers[0]],
    lastMessage: {
      id: '1',
      content: 'Chào bạn! Bạn khỏe không?',
      type: 'text',
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
  },
  {
    id: '2',
    name: 'Nhóm Dự án ABC',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=group1',
    unreadCount: 0,
    type: 'group',
    participants: mockUsers,
    lastMessage: {
      id: '2',
      content: 'Meeting lúc 2h chiều nhé mọi người',
      type: 'text',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 600000),
      isOwn: true,
    },
  },
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    unreadCount: 2,
    type: 'private',
    participants: [mockUsers[0]],
    lastMessage: {
      id: '1',
      content: 'Chào bạn! Bạn khỏe không?',
      type: 'text',
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
  },
  {
    id: '2',
    name: 'Nhóm Dự án ABC',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=group1',
    unreadCount: 0,
    type: 'group',
    participants: mockUsers,
    lastMessage: {
      id: '2',
      content: 'Meeting lúc 2h chiều nhé mọi người',
      type: 'text',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 600000),
      isOwn: true,
    },
  },
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    unreadCount: 2,
    type: 'private',
    participants: [mockUsers[0]],
    lastMessage: {
      id: '1',
      content: 'Chào bạn! Bạn khỏe không?',
      type: 'text',
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
  },
  {
    id: '2',
    name: 'Nhóm Dự án ABC',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=group1',
    unreadCount: 0,
    type: 'group',
    participants: mockUsers,
    lastMessage: {
      id: '2',
      content: 'Meeting lúc 2h chiều nhé mọi người',
      type: 'text',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 600000),
      isOwn: true,
    },
  },
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    unreadCount: 2,
    type: 'private',
    participants: [mockUsers[0]],
    lastMessage: {
      id: '1',
      content: 'Chào bạn! Bạn khỏe không?',
      type: 'text',
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
  },
  {
    id: '2',
    name: 'Nhóm Dự án ABC',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=group1',
    unreadCount: 0,
    type: 'group',
    participants: mockUsers,
    lastMessage: {
      id: '2',
      content: 'Meeting lúc 2h chiều nhé mọi người',
      type: 'text',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 600000),
      isOwn: true,
    },
  },
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    unreadCount: 2,
    type: 'private',
    participants: [mockUsers[0]],
    lastMessage: {
      id: '1',
      content: 'Chào bạn! Bạn khỏe không?',
      type: 'text',
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
  },
  {
    id: '2',
    name: 'Nhóm Dự án ABC',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=group1',
    unreadCount: 0,
    type: 'group',
    participants: mockUsers,
    lastMessage: {
      id: '2',
      content: 'Meeting lúc 2h chiều nhé mọi người',
      type: 'text',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 600000),
      isOwn: true,
    },
  },
];


const ChatContainer = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <>
      <div style={{backgroundColor: '#f5f5f5', minHeight: '100vh'}}>
        <div style={{
          backgroundColor: 'white',
          boxShadow: isMobile ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          height: isMobile ? '100vh' : '100vh'
        }}>
          <Flex style={{height: '100%'}}>
            <Conversations/>
            <ChatContent/>
          </Flex>
        </div>
      </div>
    </>
  )
}

export default ChatContainer;
