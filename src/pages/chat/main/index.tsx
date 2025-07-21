import React, {type FC} from "react";
import HeaderInfo from "@/pages/chat/main/components/header-info";
import HeaderNewChat from "@/pages/chat/main/components/header-new-chat";
import ToolbarChat from "@/pages/chat/main/components/toolbar-chat";
import ContentChat from "@/pages/chat/main/components/content-chat";
import {Layout} from "antd";

const {Content} = Layout;

export type ChatMainProps = {
  isNewChat: boolean;
};

const ChatMain: FC<ChatMainProps> = ({isNewChat}) => {

  return (
    <Content style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      {isNewChat ? <HeaderNewChat/> : <HeaderInfo/>}
      <ContentChat/>
      <ToolbarChat isNewChat={isNewChat}/>
    </Content>
  )
}

export default ChatMain;
