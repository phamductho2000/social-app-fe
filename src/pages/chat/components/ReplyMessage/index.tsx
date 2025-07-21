import React, {FC} from "react";
import {Typography} from "antd";
import './style.css'

type ReplyMessageProps = {
  data?: API.Reply;
};
const {Text} = Typography;

const ReplyMessage: FC<ReplyMessageProps> = ({data}) => {

  if(!data) {
    return<></>
  }

  return (
    <div className="reply-message">
      <Text className={'title'}>{data?.senderName}</Text>
      <Text className={'content'}>{data?.content}</Text>
    </div>
  )
}
export default ReplyMessage;
