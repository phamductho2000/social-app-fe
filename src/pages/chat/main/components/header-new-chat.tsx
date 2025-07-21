import {
  Avatar,
  Badge,
  Divider,
  Flex,
  Form,
  Input,
  InputRef,
  Layout,
  List,
  Popover,
  Skeleton,
  Tag,
  Typography
} from "antd";
import React, {useEffect, useRef, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {getUsers} from "@/services/user/userController";
import './style.css'
import {useModel} from "@@/exports";

const {Header} = Layout;
const {Text} = Typography;

const HeaderNewChat = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchAfter, setSearchAfter] = useState<string>()
  const [input, setInput] = useState<string>();
  const [users, setUsers] = useState<API.UserResponseDTO[]>([]);
  const inputRef = useRef<InputRef>(null);

  const {selectedUsers, updateSelectedUsers} = useModel("chat");

  useEffect(() => {
    if (inputRef.current) {
      inputRef?.current?.input?.click?.();
    }
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    getUsers({searchValue: input, limit: 20, searchAfter: searchAfter})
      .then(res => {
        setUsers([...users, ...res?.data?.content ?? []]);
        setSearchAfter(res?.data?.extendData?.searchAfter)
      })
      .finally(() => setLoading(false));
  }

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    fetchUsers();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
  }

  const handleChooseUser = (user: API.UserResponseDTO) => {
    updateSelectedUsers(user);
  }

  console.log('selectedUsers', selectedUsers)
  console.log('users', users)

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  };

  const content = (
    <div
      id="scrollableDiv"
      style={{
        width: 300,
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
      }}
    >
      <InfiniteScroll
        dataLength={users.length}
        next={loadMoreData}
        hasMore={users.length < 1}
        loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={users}
          renderItem={(user) => (
            <Flex style={{width: '100%', padding: '10px 0px', borderRadius: 5}} className={"list-sidebar-chat"}
                  justify={"space-between"} align={"center"} gap={"middle"}
                  onClick={() => handleChooseUser(user)}>
              <Badge color={"green"} dot offset={[-5, 35]}>
                <Avatar style={{backgroundColor: '#f56a00'}} src={user?.avatar}
                        size={"large"}>{user?.fullName}</Avatar>
              </Badge>
              <Flex vertical style={{width: '100%'}}>
                <Text strong>{user?.fullName}</Text>
              </Flex>
            </Flex>
          )}
        />
      </InfiniteScroll>
    </div>
  );

  return (
    <>
      <Header style={{
        background: "#fff",
        padding: "0px 16px",
        borderBottom: '1px solid #f0f2f5',
        width: '100%',
        height: 'auto',
        borderRadius: '10px 10px 0px 0px'
      }}>
        <Flex gap={5} style={{width: '100%'}} align={"baseline"} justify={"start"}>
          <span>Đến: </span>
          <div className="wrap-input-tags">
            {
              selectedUsers?.map(user => (
                <>
                  <Tag closable color="#108ee9" style={{padding: 4, margin: 5}}>{user?.fullName}</Tag>
                </>

              ))
            }
            <Popover content={content} title="Danh sách người dùng" trigger={"click"} placement={"bottomLeft"}
                     onOpenChange={handleOpenChange}>
              <Input ref={inputRef}
                     className="input-ele" allowClear
                     size={"large"}
                     value={input}
                     onChange={handleOnChange}
              />
            </Popover>
          </div>
        </Flex>
      </Header>
    </>
  )
}
export default HeaderNewChat;
