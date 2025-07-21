import React, {FC} from "react";
import {Flex, Space, Typography} from "antd";
import './style.css'
import {faX} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type ReplyPopupProps = {
  message: API.MessageResDTO
};
const {Text} = Typography;

const ReplyPopup: FC<ReplyPopupProps> = ({message}) => {

  return (
    <div className={'reply-popup'}>
      <Flex gap={10} justify={'space-between'} align={'flex-start'}>
        <Space>
          {/*<div>*/}
          {/*  <FontAwesomeIcon size={'lg'} icon={faReply} color={'#1890ff'}/>*/}
          {/*</div>*/}

          <Space direction={"vertical"} size={"small"}>
            <Text strong className={'to'}>Đang trả lời {message.senderName}</Text>
            <Text>{message.content}</Text>
          </Space>
        </Space>

        <FontAwesomeIcon icon={faX}/>
      </Flex>

    </div>
  )
}
export default ReplyPopup;
