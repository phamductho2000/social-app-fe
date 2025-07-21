import {CloseIcon} from "@/components/Icon";
import {FC} from "react";
import {Button} from "antd";

type ReplyPreviewProps = {
  replyTo: API.MessageResDTO;
  onClose: () => void;
}
const ReplyPreview: FC<ReplyPreviewProps> = ({ replyTo, onClose }) => {
  if (!replyTo) return null;

  return (
    <div style={{
      backgroundColor: '#f0f0f0',
      border: '1px solid #d9d9d9',
      borderRadius: '6px',
      padding: '8px 12px',
      margin: '8px 16px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
          Trả lời {replyTo.sender.name}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#333',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {replyTo.content}
        </div>
      </div>
      <Button
        size={"small"}
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          color: '#666',
          marginLeft: '8px',
        }}
      >
        <CloseIcon />
      </Button>
    </div>
  );
};
export default ReplyPreview;
