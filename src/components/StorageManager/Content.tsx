import React, {useEffect, useRef, useState} from 'react';
import {Button, Flex, Input, notification, Space} from "antd";
import {
  FilterOutlined,
  FolderAddOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  UploadOutlined
} from "@ant-design/icons";
import "./style.css";
import Element from "@/components/StorageManager/components/Element";
import UploadFile, {RefUploadFile} from "@/components/StorageManager/modals/upload-file";

const Content: React.FC = (props: any) => {
  const {listFile} = props;
  const [isAddFolder, setIsAddFolder] = useState<boolean>(false);
  const refUploadFile = useRef<RefUploadFile | null>(null)

  return (
    <>
      <Space direction={"vertical"}>
        <Flex justify={"space-around"}>
          <Input addonBefore={<SearchOutlined/>} placeholder="Tìm kiếm tệp"/>
          <Space>
            <Button icon={<UploadOutlined/>} onClick={() => refUploadFile.current?.create()}></Button>
            <Button icon={<FolderAddOutlined/>} onClick={() => setIsAddFolder(true)}></Button>
            <Button icon={<FilterOutlined/>}></Button>
            <Button icon={<UnorderedListOutlined/>}></Button>
          </Space>
        </Flex>
        <Space size={"large"} wrap>
          {
            isAddFolder &&
            <Element action={"ADD_FOLDER"}/>
          }
          {
            listFile?.map(item => (
              <Element key={item.name} data={item}/>
            ))
          }
        </Space>
      </Space>
      <UploadFile ref={refUploadFile}/>

    </>
  );
};

export default Content;
