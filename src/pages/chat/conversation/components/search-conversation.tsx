import React from "react";
import {Button, Flex, Input, Segmented, Space} from "antd";
import {FormOutlined, SearchOutlined} from "@ant-design/icons";
import {history} from "@@/core/history";

const SearchConversation = () => {
  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Flex justify={'space-between'} align={'baseline'}>
        <h2>Đoạn chat</h2>
        <Button type="primary" shape={'circle'} icon={<FormOutlined/>} onClick={() => history.push('/message/new')}/>
      </Flex>
      <Input placeholder="Tìm kiếm" prefix={<SearchOutlined/>}/>
      <Segmented
        style={{width: '100%', background: 'none'}}
        shape={'round'}
        options={['Tất cả', 'Chưa đọc', 'Nhóm']}
        onChange={(value) => {
          console.log(value); // string
        }}
      />
    </Space>
  )
}
export default SearchConversation;
