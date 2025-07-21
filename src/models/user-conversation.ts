import {useState} from "react";

export default () => {
  const [userConversations, setUserConversations] = useState<API.UserConversationResDTO[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetUserConversations = (userId: string, page: any) => {
    setIsLoading(true);
    // getUserConversations({...page, userId}).then(res => {
    //   setUserConversations(res?.data?.content ?? []);
    //   setIsLoading(false);
    // }).catch(e => {
    //   console.log('error: ', e);
    //   setIsLoading(false);
    // })
  }

  return {isLoading, userConversations, handleGetUserConversations}
}
