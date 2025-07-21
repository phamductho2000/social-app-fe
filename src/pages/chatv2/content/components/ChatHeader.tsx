import {Avatar, Button} from "antd";
import {BackIcon, InfoIcon, MoreIcon, PhoneIcon, VideoIcon} from "@/components/Icon";
import {FC} from "react";

type ChatHeaderProps = {
  conversation?: API.UserConversationResDTO;
  onCall: () => void;
  onVideoCall: () => void;
  onToggleInfo: () => void;
  onBack: () => void;
  showBackButton: boolean;
  showInfoButton: boolean
}

const ChatHeader: FC<ChatHeaderProps> = ({
                                           conversation,
                                           onCall,
                                           onVideoCall,
                                           onToggleInfo,
                                           onBack,
                                           showBackButton = false,
                                           showInfoButton = true
                                         }) => {
  if (!conversation) {
    return (
      <div style={{padding: '16px', borderBottom: '1px solid #f0f0f0', textAlign: 'center'}}>
        <div style={{color: '#999', fontSize: '14px'}}>Chọn một cuộc trò chuyện để bắt đầu</div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center'}}>
        {showBackButton && (
          <Button
            type="text"
            icon={<BackIcon/>}
            onClick={onBack}
            style={{marginRight: '8px'}}
          />
        )}
        <Avatar
          src={conversation.avatar}
          size={36}
        />
        <div style={{marginLeft: 12}}>
          <div style={{fontSize: '16px', fontWeight: 600, margin: 0}}>
            {conversation.name}
          </div>
          <div style={{fontSize: '12px', color: '#666'}}>
            {conversation.type === 'group'
              ? `${conversation?.participants?.length} thành viên`
              : 'Đang hoạt động'}
          </div>
        </div>
      </div>

      <div style={{display: 'flex', gap: '4px'}}>
        <Button
          type="text"
          icon={<PhoneIcon/>}
          onClick={onCall}
        />
        <Button
          type="text"
          icon={<VideoIcon/>}
          onClick={onVideoCall}
        />
        {showInfoButton && (
          <Button
            type="text"
            icon={<InfoIcon/>}
            onClick={onToggleInfo}
          />
        )}
        <Button
          type="text"
          icon={<MoreIcon/>}
        />
      </div>
    </div>
  );
};
export default ChatHeader;
