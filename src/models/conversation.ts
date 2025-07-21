import {useState} from "react";
import {searchUserConversation} from "@/services/conversation/conversationController";
import {addOrUpdateToDataSource} from "@/utils/dataUtil";

export default () => {
  const [conversations, setConversations] = useState<API.UserConversationResDTO[]>([]);
  const [activeConversation, setActiveConversation] = useState<API.UserConversationResDTO>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchConversations = () => {
    setIsLoading(true);
    searchUserConversation({limit: 20}).then(res => {
      setConversations(res?.data?.content ?? []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false))
      .finally(() => setIsLoading(false));
  }

  const handleUpdateConversation = (conversation: API.ConversationResDTO) => {
    setConversations((prevConversations) => addOrUpdateToDataSource(prevConversations, conversation, "id"));
  }

  const updateActiveConversation = (conversation: API.UserConversationResDTO) => {
    setActiveConversation(conversation);
  }

  return {
    isLoading,
    conversations,
    fetchConversations,
    activeConversation,
    updateActiveConversation,
    handleUpdateConversation
  }
}
