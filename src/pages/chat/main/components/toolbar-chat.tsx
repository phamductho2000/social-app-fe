import {Flex, Input, Layout, Popover} from "antd";
import React, {type FC, useState} from "react";
import {history, useModel, useParams} from "@@/exports";
import {useCurrentUser} from "@/selectors/useCurrentUser";
import {ChatMainProps} from "@/pages/chat/main";
import {createConversation} from "@/services/conversation/conversationController";
import {useWebSocket} from "@/hooks/useWebSocket";
import {faFaceSmile} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
import {faImage, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import UploadPopup from "@/pages/chat/components/UploadPopup";
import {v4 as uuidv4} from 'uuid';

const {Footer} = Layout;

const ToolbarChat: FC<ChatMainProps> = ({isNewChat}) => {
  const [input, setInput] = useState("");
  const params = useParams();
  const id = params.conversationId;
  const currentUser = useCurrentUser();
  const {selectedUsers, updateReloadConversation, messageReply, updateMessageReply} = useModel("chat");
  const {fileList, handlePreviewFile} = useModel("upload");
  const {handleNewMessage} = useModel("message");
  const {send} = useWebSocket();

  const handleCreateConversation = () => {
    if (selectedUsers?.length > 0 && currentUser) {
      const body = {
        participantIds: [...selectedUsers.map(m => m.userId)],
        message: {
          content: input,
          contentType: 'TEXT'
        }
      }
      createConversation(body).then(res => {
        if (res.code === "SUCCESS") {
          updateReloadConversation(true);
          history.push(`/message/${res?.data?.id}`)
        }
      })
    }
  }

  // const sendMessage = () => {
  //   if (fileList?.length> 0) {
  //     fileList
  //   }
  // }

  const sendMessage = () => {
    if (currentUser) {
      // if (isNewChat) {
      //   handleCreateConversation();
      // } else {
      //   send(TOPIC_MESSAGE_SEND, {
      //     conversationId: id,
      //     senderId: currentUser.userId,
      //     senderName: currentUser.fullName,
      //     content: input,
      //     contentType: 'TEXT',
      //     reply: messageReply
      //   })
      // }
      // setInput("");
      // updateMessageReply(undefined);
      const msg: API.MessageResDTO = {
        content: input,
        contentType: 'IMAGE',
        attachments: fileList.map(m => ({
          type: 'IMAGE',
          url: m.url,
          name: m.name,
        }))
      }
      handleNewMessage(msg);
    }
  }

  const handleChoseEmoji = (e: EmojiClickData) => {
    console.log('emoji', e);
    setInput((prev) => prev + e.emoji)
  }


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // const formData = new FormData();
    // formData.append("file", file);
    //
    // uploadBinaryFile(formData).then((r) => {})
    const tempUrl = URL.createObjectURL(file);
    handlePreviewFile({
      uid: uuidv4(),
      name: 'image.png',
      status: 'done',
      url: tempUrl
    });
  };


  return (
    <>
      <Footer style={{
        padding: "16px",
        background: "#fff",
        // display: "flex",
        borderTop: '1px solid #f0f2f5',
        borderRadius: '0px 0px 10px 10px'
      }}>
        {/*{*/}
        {/*  messageReply && <ReplyPopup message={messageReply}/>*/}
        {/*}*/}

        <Flex style={{width: '100%'}} align={"center"} gap={10}>

          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            style={{display: "none"}}
          />


          <label htmlFor="file-upload" style={{cursor: "pointer"}}>
            <FontAwesomeIcon size={'xl'} color={'#1677ff'} icon={faImage}/>
          </label>
          <div style={{width: '100%', backgroundColor: '#F0F2F5', borderRadius: 20, padding: 5}}>
            {
              fileList?.length > 0 && <UploadPopup fileList={fileList}/>
            }
            <Input
              variant={"borderless"}
              size={'middle'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={sendMessage}
              placeholder="Aa"
              style={{flex: 1, marginRight: "8px"}}
              suffix={
                <Popover content={<EmojiPicker lazyLoadEmojis={true} onEmojiClick={handleChoseEmoji}/>} trigger="click">
                  <FontAwesomeIcon icon={faFaceSmile} size={'xl'}/>
                </Popover>
              }
            />
          </div>
          {
            input && <FontAwesomeIcon size={'xl'} color={'#1677ff'} icon={faPaperPlane}/>
          }

        </Flex>

      </Footer>
    </>
  )
}
export default ToolbarChat;
