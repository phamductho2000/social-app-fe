import {Menu, MenuProps} from "antd";
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";

const ContextMenu = () => {

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      key: 'sub1',
      icon: <MailOutlined />,
      label: 'Navigation One',
    },
    {
      key: 'sub2',
      icon: <AppstoreOutlined />,
      label: 'Navigation Two',
    },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <SettingOutlined />,
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  return (
    <Menu onClick={onClick} style={{ width: 200 }} mode="vertical" items={items} />
  )
}

export default ContextMenu;
