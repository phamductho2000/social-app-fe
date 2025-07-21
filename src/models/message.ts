import {useState} from "react";
import {searchMessage} from "@/services/message/messageController";
import {addOrUpdateToDataSource} from "@/utils/dataUtil";

export default () => {
  const [messages, setMessages] = useState<API.MessageResDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchAfter, setSearchAfter] = useState<string>();

  const fetchMessages = (conversationId: string) => {
    setIsLoading(true);
    searchMessage({conversationId, limit: 20, searchAfter: searchAfter ? searchAfter : undefined}).then(res => {
      setMessages((prevState => [...res?.data?.content?.reverse() ?? [], ...prevState]));
      setSearchAfter(res?.data?.extendData?.searchAfter);
    }).finally(() => setIsLoading(false));
  }

  const handleNewMessage = (message: API.MessageResDTO) => {
    setMessages((prevMessages) => addOrUpdateToDataSource(prevMessages, message, "tempId"));
  }

  return {isLoading, messages, handleNewMessage, fetchMessages}
}
