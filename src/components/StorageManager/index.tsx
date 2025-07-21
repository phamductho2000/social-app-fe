import React, {useEffect, useImperativeHandle, useState} from "react";
import {Col, ConfigProvider, Modal, notification, Row} from "antd";
import SideBar from "@/components/StorageManager/SideBar";
import Content from "@/components/StorageManager/Content";
import Info from "@/components/StorageManager/Info";
import {useModel} from "@@/exports";
import PopupProgressUpload from "@/components/StorageManager/components/PopupProgressUpload";

export type RefStorage = {
  create: () => void,
}
const StorageManager = React.forwardRef<RefStorage, any>((props, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const {listFile, getListFile} = useModel("storage");

  const handleClose = () => {
    setOpen(false);
  }

  useImperativeHandle(ref, () => {
    return {
      create() {
        setOpen(true);
      },
    };
  }, [open]);

  useEffect(() => {
    getListFile({pageSize: 100, prefix: ""});
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            wireframe: true
          },
        }
      }}
    >
      <Modal title={"Chọn hình ảnh"} open={open} width={1700} onCancel={handleClose} centered className={"modal-storage-manager"}>
        <Row gutter={24} id={"mount-node"}>
          <Col span={5}>
            <SideBar/>
          </Col>
          <Col span={14}>
            <Content listFile={listFile}/>
          </Col>
          <Col span={5}>
            <Info/>
          </Col>
        </Row>
       <PopupProgressUpload/>
      </Modal>
    </ConfigProvider>
  )
})
export default StorageManager;
