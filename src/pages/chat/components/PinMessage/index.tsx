import React, {FC} from "react";
import {Flex, Space, Typography} from "antd";
import './style.css'
import {DownOutlined, PushpinFilled} from "@ant-design/icons";

type PinMessageProps = {
  data?: API.MessageResDTO;
};
const {Text} = Typography;

const PinMessage: FC<PinMessageProps> = ({data}) => {

  // if(!data) {
  //   return<></>
  // }

  return (
    <div className={"pin-message"}>
      <Space size="small">
        <PushpinFilled />
        <Flex gap={0} vertical>
          <Text className={'title'}>{data?.senderName ?? 'You'}</Text>
          <Text className={'content'}>{data?.content ?? 'Tin nhắn pin'}</Text>
        </Flex>
      </Space>
      <DownOutlined />
    </div>
  )
}
export default PinMessage;
