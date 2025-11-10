import React, {FC} from "react";
import {Flex, Typography} from "antd";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

type EmbeddedMessageProps = {
  message?: any;
  isView?: boolean;
  onClose?: () => void;
}

const {Text} = Typography;

const EmbeddedMessage: FC<EmbeddedMessageProps> = ({message, isView, onClose}) => {
  if (!message) return null;

  const renderIcon = () => {
    switch (message?.action) {
      case 'EDIT':
        return <EditOutlinedIcon style={{color: '#46BA43'}}/>
      default:
        return <ReplyOutlinedIcon style={{color: '#46BA43'}}/>
    }
  }

  const renderTitle = () => {
    switch (message?.action) {
      case 'EDIT':
        return "Chỉnh sửa";
      default:
        return "Thọ Phạm";
    }
  }

  return (
    <Flex align={"center"} gap={10} style={{width: '100%', minWidth: 0}}>
      {
        !isView && renderIcon()
      }
      <Flex gap={1} vertical className={"reply-message"}
            style={{
              backgroundColor: '#46BA431a',
              borderRadius: '6px',
              position: 'relative',
              paddingLeft: 10,
              width: '100%',
              minWidth: 0
            }}>
        <div style={{color: '#46BA43', fontWeight: 500}}>
          {renderTitle()}
        </div>
        <Text ellipsis={{tooltip: false}}
              style={{flex: 1, minWidth: 0, fontSize: '14px', color: '#333'}}>{message.content}</Text>
      </Flex>
      {
        !isView && <CloseOutlinedIcon style={{color: '#46BA43'}} onClick={onClose}/>
      }
    </Flex>

  );
};
export default EmbeddedMessage;
