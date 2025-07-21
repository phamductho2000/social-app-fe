import {Button, Card, Flex, Spin, Typography} from "antd";
import {CheckOutlined, LoadingOutlined} from "@ant-design/icons";
import React from "react";
import {useModel} from "@@/exports";

const {Text} = Typography;

export default function PopupProgressUpload() {
  const {currentFilesUpload, isLoading} = useModel("storage");

  console.log('currentFilesUpload', currentFilesUpload)

  return (
    <div className={"popup-progress-upload"}>
      <Card title={"Đã tải lên 1 mục"} size={"small"}>
        <Flex justify={"space-between"}>
          <div className={"file-name"}>
            <Text strong>{currentFilesUpload[0]?.name}</Text>
          </div>
          <div>
            {`${(currentFilesUpload[0]?.size / 1048576)?.toFixed(2)} MB`}
          </div>
          <div>
            {
              isLoading ?
                <Spin spinning={true} indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
                : <Button type="primary" size={"small"} shape="circle" icon={<CheckOutlined/>}/>
            }
          </div>
        </Flex>

      </Card>
    </div>
  )
}
