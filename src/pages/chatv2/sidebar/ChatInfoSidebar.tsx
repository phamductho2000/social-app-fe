import {useState} from "react";
import {Avatar, Button, Flex, Menu, Space, Typography} from "antd";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
const { Title } = Typography;

const ChatInfoSidebar = ({ conversation, onClose, isVisible }) => {
  const [activeTab, setActiveTab] = useState('info');

  if (!conversation || !isVisible) return null;

  const items: MenuItem[] = [
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <MailOutlined />
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <AppstoreOutlined />,
    },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <SettingOutlined />,
    }
  ];

  return (
    <Flex vertical style={{
      width: '800px',
      borderLeft: '1px solid #f0f0f0',
      backgroundColor: 'white',
      height: '100%'
    }}>
      <Flex align={"flex-start"} gap={10} style={{padding: 15}}>
        <Button
          icon={<ArrowBackIcon/>}
          type={"text"}
          shape={"circle"}
        />

        <Title level={4}>Chỉnh sửa</Title>
      </Flex>
      <Flex align={"center"} vertical gap={10}>
        <Avatar size={128}/>
        <Title level={4}>Tên</Title>
      </Flex>
      <Menu
        // onClick={onClick}
        // style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </Flex>
  );
};
export default ChatInfoSidebar;
