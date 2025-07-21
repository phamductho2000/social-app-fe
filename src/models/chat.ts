import {useState} from "react";

export default () => {

  const [selectedUsers, setSelectedUsers] = useState<API.UserResponseDTO[]>([]);

  const [reloadConversation, setReloadConversation] = useState<boolean>(false);

  const [infoConversation, setInfoConversation] = useState();

  const [messageReply, setMessageReply] = useState<API.MessageResDTO>()

  const updateInfoConversation = (info: any) => {
    setInfoConversation(info);
  }

  const updateReloadConversation = (reload: boolean) => {
    setReloadConversation(reload);
  }

  const updateSelectedUsers = (user: API.UserResponseDTO) => {
    setSelectedUsers([...selectedUsers, user]);
  }

  const updateMessageReply = (msg: API.MessageResDTO | undefined) => {
    setMessageReply(msg);
  }

  return {
    selectedUsers, updateSelectedUsers,
    reloadConversation, updateReloadConversation,
    infoConversation, updateInfoConversation,
    messageReply, updateMessageReply
  }
}
