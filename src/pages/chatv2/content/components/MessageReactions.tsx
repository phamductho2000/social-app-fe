import {Button, Flex} from "antd";
import {FC} from "react";

type MessageReactionProps = {
  summaryReaction: any;
  onReactionClick?: (emoji: string) => void
  onAddReaction?: () => void
}

const MessageReactions: FC<MessageReactionProps> = ({summaryReaction, onReactionClick, onAddReaction}) => {
  if (!summaryReaction) return null;

  return (
    <Flex wrap gap={4} style={{marginTop: '4px'}}>
      {Object.entries(summaryReaction)?.map(([emoji, count]) => (
        <Button
          size={"small"}
          key={emoji}
          onClick={() => onReactionClick?.(emoji)}
          style={{
            // background: users.some(user => user.id === 'me') ? '#e6f7ff' : '#f5f5f5',
            background: '#ffffff',
            // border: users.some(user => user.id === 'me') ? '1px solid #1890ff' : '1px solid #d9d9d9',
            border: '1px solid #d9d9d9',
            borderRadius: '12px',
            padding: '2px 6px',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <span>{emoji}</span>
          <span style={{fontSize: '10px', color: '#666'}}>{count}</span>
        </Button>
      ))}
      {/* eslint-disable-next-line react/button-has-type */}
      <Button
        size={"small"}
        onClick={onAddReaction}
        style={{
          background: '#f5f5f5',
          border: '1px solid #d9d9d9',
          borderRadius: '12px',
          padding: '2px 6px',
          fontSize: '12px',
          cursor: 'pointer',
          color: '#666',
        }}
      >
        +
      </Button>
    </Flex>
  );
};
export default MessageReactions;
