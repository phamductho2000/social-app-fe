import {Calendar, MenuProps, Modal} from 'antd';
import {Avatar, Button, Dropdown, Flex, Input} from "antd";
import React, {FC, useState} from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';

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

  const [isSearch, setIsSearch] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)

  const items: MenuProps['items'] = [
    {
      label: 'Chỉnh sửa',
      icon: <EditOutlinedIcon/>,
      key: '0',
    },
    {
      label: 'Tắt thông báo',
      icon: <NotificationsOffOutlinedIcon/>,
      key: '1',
    },
    {
      label: 'Chặn',
      icon: <BlockOutlinedIcon/>,
      key: '2',
    },
    {
      type: 'divider'
    },
    {
      label: 'Xóa',
      icon: <DeleteOutlinedIcon/>,
      key: '3',
    },
  ];

  if (!conversation) {
    return (
      <div style={{padding: '16px', borderBottom: '1px solid #f0f0f0', textAlign: 'center'}}>
        <div style={{color: '#999', fontSize: '14px'}}>Chọn một cuộc trò chuyện để bắt đầu</div>
      </div>
    );
  }

  return (
    <Flex justify={'space-between'} align={'center'} gap={10}
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #f0f0f0'
          }}
    >
      <Flex align={"center"} gap={10} style={{flex: 1}}>
        <Avatar src={conversation.avatar} size={36}/>
        {
          isSearch ?
            <Input
              prefix={<SearchOutlinedIcon/>}
              size="large"
              placeholder={'Tìm kiếm'}
              style={{borderRadius: 15, width: '100%'}}
              suffix={<CloseOutlinedIcon onClick={() => setIsSearch(false)}/>}
            /> :
            <Flex vertical>
              <div style={{fontSize: '16px', fontWeight: 600, margin: 0}}>
                {conversation.name}
              </div>
              <div style={{fontSize: '12px', color: '#666'}}>
                {conversation.type === 'GROUP'
                  ? `${conversation?.participants?.length} thành viên`
                  : 'Đang hoạt động'}
              </div>
            </Flex>
        }
      </Flex>

      {
        isSearch ?
          <Flex gap={10}>
            <Button
              type="text"
              shape={"circle"}
              icon={<CalendarMonthOutlinedIcon/>}
              onClick={() => setIsOpenCalendar(true)}
            />
          </Flex>
          :
          <Flex gap={10}>
            <Button
              type="text"
              shape={"circle"}
              icon={<SearchOutlinedIcon/>}
              onClick={() => setIsSearch(true)}
            />
            <Button
              type="text"
              shape={"circle"}
              icon={<LocalPhoneOutlinedIcon/>}
              onClick={onCall}
            />
            <Button
              type="text"
              icon={<VideocamOutlinedIcon/>}
              onClick={onVideoCall}
            />
            <Button
              type="text"
              shape={"circle"}
              icon={<ViewSidebarOutlinedIcon/>}
              // onClick={() => setIsSearch(true)}
            />
            <Dropdown menu={{items}} trigger={['click']} placement={"bottomRight"}>
              <Button
                onClick={(e) => e.preventDefault()}
                type="text"
                shape={"circle"}
                icon={<MoreVertOutlinedIcon/>}
              />
            </Dropdown>
          </Flex>
      }

      <Modal
        title="Tìm theo ngày"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpenCalendar}
        // onOk={handleOk}
        onCancel={() => setIsOpenCalendar(false)}
      >
        <Calendar fullscreen={false} />
      </Modal>

    </Flex>
  );
};
export default ChatHeader;
