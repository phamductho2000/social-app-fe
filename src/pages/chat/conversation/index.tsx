import {Avatar, Badge, Flex, List, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {history, useModel, useRequest} from "@@/exports";
import SearchConversation from "@/pages/chat/conversation/components/search-conversation";
import {searchUserConversation} from "@/services/conversation/conversationController";
import {useWebSocket} from "@/hooks/useWebSocket";
import {addOrUpdateToDataSource} from "@/utils/dataUtil";

const {Text} = Typography;

const Conversation = () => {
  const {reloadConversation, updateInfoConversation} = useModel('chat');
  const [conversations, setConversations] = useState<API.UserConversationResDTO[]>([]);
  const {subscribe} = useWebSocket();

  const {data, error, loading, run} = useRequest((searchAfter) => searchUserConversation({
    limit: 20,
    searchAfter: searchAfter
  }), {manual: true});

  useEffect(() => {
    run(null)
  }, [reloadConversation]);

  useEffect(() => {
    setConversations(data?.content ?? []);
  }, [data]);

  const handleChooseUser = (conversation: API.UserConversationResDTO) => {
    updateInfoConversation(conversation);
    if (conversation) {
      history.push(`/message/${conversation.conversationId}`);
    }
  }

  useEffect(() => {

    const unSubscribe = subscribe(`/user/queue/conversation`, (conversation) => {
      console.log('conversation...........', conversation);
      setConversations((prev) => addOrUpdateToDataSource(prev, conversation, "conversationId"));
    });

    return () => {
      unSubscribe()
    }
  }, []);

  // useEffect(() => {
  //   if (currentUser) {
  //     handleGetUserConversations(currentUser.id, {page: 0, size: 20});
  //   }
  // }, [currentUser]);

  return (
    <>
      <Flex style={{width: '100%', height: '100%'}} vertical gap={10}>
        <SearchConversation/>
        <div style={{overflow: 'auto'}}>
          <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={conversations}
            renderItem={(conversation) => (
              <Flex style={{width: '100%', padding: '10px 10px 10px 10px', borderRadius: 5}}
                    className={"list-sidebar-chat"}
                    justify={"space-between"} align={"center"} gap={"middle"}
                    onClick={() => handleChooseUser(conversation)}>
                <Badge color={"green"} dot offset={[-5, 35]}>
                  <Avatar style={{backgroundColor: '#f56a00'}} src={conversation?.avatar}
                          size={"large"}>{conversation?.name}</Avatar>
                </Badge>
                <Flex vertical style={{width: '100%'}}>
                  <Text strong>{conversation?.name}</Text>
                  {/*<Text>{dayjs(user?.lastConnectionTime).format("DD/MM/YYYY HH:mm")}</Text>*/}
                  <Text>{conversation?.lastMessage?.content}</Text>
                </Flex>
                {
                  conversation?.unreadCount !== 0 &&
                  <Badge color={"blue"} count={conversation?.unreadCount}/>
                }
              </Flex>
            )}
          />
        </div>
      </Flex>
    </>
  )
}

export default Conversation;
