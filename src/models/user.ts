import {useState} from "react";
import {getUsers} from "@/services/user/userController";

export default () => {
  // @ts-ignore
  const [user, setUser] = useState<API.UserResponseDTO>();
  const [users, setUsers] = useState<API.UserResponseDTO[]>([]);
  const [listFriends, setListFriends] = useState<API.UserFriendsViewResDTO[]>([]);
  const [searchAfter, setSearchAfter] = useState<string>();

  const createUser = (body: API.UserResponseDTO) => {
    // create({body}).then(res => {
    //   setUser(res.body)
    // })
  }

  const getUserByUsername = (body: API.UserResponseDTO) => {
    // getCurrentUserLogin({body}).then(res => {
    //   setUser(res.body);
    // })
  }

  const loadListFriends = (body: API.FilterUsersRequest) => {
    // getListFriends({body}).then(res => {
    //   setListFriends(res?.body?.content ?? []);
    // })
  }

  const handleSearchUsers = (body: API.SearchUserRequestDto) => {
    getUsers({...body, limit: 20, searchAfter: searchAfter}).then(res => {
      setUsers(res?.data?.content ?? []);
      setSearchAfter(res?.data?.extendData?.searchAfter)
    })
  }

  return {user, createUser, getUserByUsername, listFriends, loadListFriends, users, handleSearchUsers}
}
