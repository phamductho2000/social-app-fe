import {Button, Flex} from "antd";
import {FC} from "react";

type ReactionPickerProps = {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}
const ReactionPicker: FC<ReactionPickerProps> = ({onSelect, onClose}) => {

  // const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '😡'];
  const REACTIONS = ['👍', '❤️', '😂'];

  return (
    <Flex gap={4} style={{
      // position: 'absolute',
      // bottom: 25,
      // left: 0,
      // transform: 'translateX(55%)',
      // backgroundColor: 'white',
      // border: '1px solid #d9d9d9',
      // borderRadius: '20px',
      // padding: '5px',
      // boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      // zIndex: 1000,
    }}
    >
      {REACTIONS.map((emoji) => (
        <Button
          size={"small"}
          key={emoji}
          onClick={() => {
            onSelect(emoji);
            onClose();
          }}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            padding: '4px 6px',
            borderRadius: '12px',
          }}
        >
          {emoji}
        </Button>
      ))}
    </Flex>
  );
};
export default ReactionPicker;
