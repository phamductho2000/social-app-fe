import {useState} from "react";

export default () => {

  const [selectedUsers, setSelectedUsers] = useState<API.UserResponseDTO[]>([]);

  const [reloadConversation, setReloadConversation] = useState<boolean>(false);

  const [infoConversation, setInfoConversation] = useState();

  const [embeddedMessage, setEmbeddedMessage] = useState<API.MessageResDTO>()

  const updateInfoConversation = (info: any) => {
    setInfoConversation(info);
  }

  const updateReloadConversation = (reload: boolean) => {
    setReloadConversation(reload);
  }

  const updateSelectedUsers = (user: API.UserResponseDTO) => {
    setSelectedUsers([...selectedUsers, user]);
  }

  const updateEmbeddedMessage = (msg: API.MessageResDTO | undefined, action?: string | undefined) => {
    setEmbeddedMessage(msg ? {
      ...msg,
      action: action,
    } : undefined);
  }

  return {
    selectedUsers, updateSelectedUsers,
    reloadConversation, updateReloadConversation,
    infoConversation, updateInfoConversation,
    embeddedMessage, updateEmbeddedMessage
  }
}
