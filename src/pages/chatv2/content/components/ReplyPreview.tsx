import React, {FC} from "react";
import {Flex} from "antd";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

type ReplyPreviewProps = {
  replyTo?: API.MessageResDTO;
}
const ReplyPreview: FC<ReplyPreviewProps> = ({replyTo, onClose}) => {
  if (!replyTo) return null;

  return (
    <Flex align={"center"} gap={10} style={{width: '100%'}}>
      <ReplyOutlinedIcon style={{color: '#46BA43'}}/>
      <Flex gap={1} vertical className={"reply-message"}
            style={{
              backgroundColor: '#46BA431a',
              borderRadius: '6px',
              position: 'relative',
              paddingLeft: 10,
              width: '100%'
            }}>
        <div style={{color: '#46BA43', fontWeight: 500}}>
          {/*Trả lời {replyTo.sender.name}*/}
          Thọ Phạm
        </div>
        <div style={{
          fontSize: '14px',
          color: '#333',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {/*{replyTo.content}*/}
          Hehe chào m
        </div>
      </Flex>
      <CloseOutlinedIcon style={{color: '#46BA43'}}/>
    </Flex>

  );
};
export default ReplyPreview;
