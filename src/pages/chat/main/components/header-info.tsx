import {Avatar, Badge, Flex, Layout, Space, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhoneVolume, faVideo} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useModel} from "@@/exports";

const {Header} = Layout;
const {Text} = Typography;

const HeaderInfo = () => {
  const {infoConversation} = useModel('chat');

  const getLastActiveStatus = (isOnline: boolean, lastActive: any) => {
    if (isOnline) {
      return "Đang hoạt động";
    }

    const now = new Date().getTime();
    const lastActiveTime = new Date(lastActive).getTime();
    const diffInMilliseconds = now - lastActiveTime;

    const diffInMinutes = diffInMilliseconds / (1000 * 60);
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    if (diffInMinutes < 60) {
      return `Hoạt động ${Math.floor(diffInMinutes)} phút trước`;
    } else if (diffInHours < 24) {
      return `Hoạt động ${Math.floor(diffInHours)} giờ trước`;
    } else if (diffInDays < 7) {
      return `Hoạt động ${Math.floor(diffInDays)} ngày trước`;
    } else {
      return 'Không hoạt động';
    }
  };

  return (
    <Header style={{
      background: "#fff",
      padding: "0px 16px",
      fontSize: "16px",
      borderBottom: '1px solid #f0f2f5',
      borderRadius: '10px 10px 0px 0px'
    }}>
      <Flex style={{width: '100%'}}
            justify={"space-between"} align={"center"} gap={"middle"}>
        <Badge color={"green"} dot offset={[-5, 50]}>
          <Avatar src={infoConversation?.avatar} size={"large"}/>
        </Badge>
        <Flex vertical style={{width: '100%'}}>
          <Text strong>{infoConversation?.name}</Text>
          <Text>{getLastActiveStatus(infoConversation?.status, infoConversation?.lastConnectionTime)}</Text>
        </Flex>
        <Space size={"large"}>
          <FontAwesomeIcon icon={faPhoneVolume}/>
          <FontAwesomeIcon icon={faVideo}/>
        </Space>
      </Flex>
    </Header>
  )
}
export default HeaderInfo;
