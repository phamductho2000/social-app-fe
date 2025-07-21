import {useState} from "react";
import {Avatar, Button} from "antd";
import {CloseIcon, ImageIcon, InfoIcon, LinkIcon} from "@/components/Icon";

const ChatInfoSidebar = ({ conversation, onClose, isVisible }) => {
  const [activeTab, setActiveTab] = useState('info');

  if (!conversation || !isVisible) return null;

  const mockSharedMedia = [
    {
      id: '1',
      type: 'image',
      url: 'https://picsum.photos/200/200?random=1',
      name: 'image1.jpg',
    },
    {
      id: '2',
      type: 'image',
      url: 'https://picsum.photos/200/200?random=2',
      name: 'screenshot.png',
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div style={{ padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Avatar src={conversation.avatar} size={80} />
              <h3 style={{ margin: '12px 0 4px', fontSize: '18px', fontWeight: 600 }}>
                {conversation.name}
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                {conversation.type === 'group'
                  ? `Nhóm • ${conversation.participants.length} thành viên`
                  : 'Đang hoạt động'
                }
              </p>
            </div>

            {conversation.type === 'group' && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#333' }}>
                  Thành viên ({conversation.participants.length})
                </h4>
                {conversation.participants.map((user) => (
                  <div key={user.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <Avatar src={user.avatar} size={32} />
                    <div style={{ marginLeft: '12px', flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 500 }}>{user.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {user.status === 'online' ? 'Đang hoạt động' :
                          user.status === 'away' ? 'Vắng mặt' : 'Offline'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button
                style={{ justifyContent: 'flex-start', padding: '12px 16px' }}
                onClick={() => alert('Tắt thông báo')}
              >
                Tắt thông báo
              </Button>
              <Button
                style={{ justifyContent: 'flex-start', padding: '12px 16px' }}
                onClick={() => alert('Tìm kiếm tin nhắn')}
              >
                Tìm kiếm tin nhắn
              </Button>
            </div>
          </div>
        );

      case 'media':
        return (
          <div style={{ padding: '16px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: '#333' }}>
              Ảnh và Video ({mockSharedMedia.length})
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
            }}>
              {mockSharedMedia.map((media) => (
                <div key={media.id} style={{
                  aspectRatio: '1',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}>
                  <img
                    src={media.url}
                    alt={media.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'links':
        return (
          <div style={{ padding: '16px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: '#333' }}>
              Liên kết (0)
            </h4>
            <p style={{ color: '#666', fontSize: '14px', textAlign: 'center' }}>
              Chưa có liên kết nào được chia sẻ
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      width: '300px',
      borderLeft: '1px solid #f0f0f0',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
          Thông tin
        </h3>
        <Button
          type="text"
          icon={<CloseIcon />}
          onClick={onClose}
        />
      </div>

      <div style={{
        display: 'flex',
        borderBottom: '1px solid #f0f0f0'
      }}>
        {[
          { key: 'info', label: 'Chi tiết', icon: <InfoIcon /> },
          { key: 'media', label: 'Media', icon: <ImageIcon /> },
          { key: 'links', label: 'Links', icon: <LinkIcon /> }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              padding: '12px 8px',
              border: 'none',
              backgroundColor: activeTab === tab.key ? '#e6f7ff' : 'transparent',
              color: activeTab === tab.key ? '#1890ff' : '#666',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {renderTabContent()}
      </div>
    </div>
  );
};
export default ChatInfoSidebar;
