import {Button, Input, Space} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";
import React, {useEffect, useRef} from "react";
import FolderSvg from "../../../../public/icons/folder.svg";

export default function Element(props: any) {
  const {data, action} = props;
  const refInput = useRef(null);

  useEffect(() => {
    if (action === "ADD_FOLDER") {
      refInput.current?.focus();
    }
  }, [action]);

  return (
    <Space direction={"vertical"} align={"center"} style={{width: 150, height: 150, padding: 40}}>
      <div className={"wrap-image"}>
        {
          (action === "ADD_FOLDER" || data.type === "folder") ?
            <img className={"wrap-image-img"} width={100} height={100} src={FolderSvg} alt={""}/>
            :
            <img className={"wrap-image-img"} width={150} height={150}
                 src={`http://localhost:8080/api/storage/get/${data.name}`} alt={""}/>
        }
        <div className={"wrap-image-hover"}>
          <Space align={"end"} style={{padding: 5}} size={"small"}>
            <Button type={"primary"} size={"small"} shape={"circle"} icon={<EllipsisOutlined/>}></Button>
            <Button size={"small"} shape={"circle"} icon={<EllipsisOutlined/>}></Button>
          </Space>
        </div>
      </div>
      {
        action === "ADD_FOLDER" ?
          <Input ref={refInput} allowClear/> :
          <p className={"image-name"}>{data.name}</p>
      }
    </Space>
  )
}
