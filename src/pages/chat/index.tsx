import React, {useEffect, useState} from "react";
import {Layout} from "antd";
import './style.css';
import ChatMain from "@/pages/chat/main";
import Conversation from "@/pages/chat/conversation";
import Setting from "@/pages/chat/setting";
import {useLocation} from "@@/exports";

const {Sider} = Layout;

const ChatApp = () => {
  const location = useLocation();
  const [isNewChat, setIsNewChat] = useState<boolean>(false);

  useEffect(() => {
    setIsNewChat(location?.pathname.includes("/message/new"));
  }, [location]);

  return (
    <Layout style={{height: "100vh"}}>
      <Sider width={400} style={{background: "#fff", padding: "16px"}}>
        <Conversation/>
      </Sider>

      <Layout style={{margin: 20}}>
        <ChatMain isNewChat={isNewChat}/>
      </Layout>

      {!isNewChat &&
        <Sider width={400} style={{background: "#fff", margin: "20px 20px 20px 0px", borderRadius: 10}}>
          <Setting/>
        </Sider>
      }
    </Layout>

  );
};

export default ChatApp;
