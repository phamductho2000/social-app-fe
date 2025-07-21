import React, {useEffect, useImperativeHandle, useState} from "react";
import {Button, ConfigProvider, Modal, Space} from "antd";
import {useModel} from "@@/exports";
import {fetchEventSource} from "@microsoft/fetch-event-source";

export type RefUploadFile = {
  create: () => void,
}
const UploadFile = React.forwardRef<RefUploadFile, any>((props, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const {uploadFile, updateCurrentFilesUpload, uploadFileLocal} = useModel("storage");

  useImperativeHandle(ref, () => {
    return {
      create() {
        setOpen(true);
      },
    };
  }, [open]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchEventSource("/api/storage/progress-transfer/123", {
        method: "GET",
        headers: {
          Accept: "text/event-stream",
          Authorization: `Bearer ${localStorage.getItem('access_token')}`

        },
        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("Connection made ", res);
          } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
          ) {
            console.log("Client side error ", res);
          }
        },
        onmessage(event) {
          console.log(event.data);
          const parsedData = JSON.parse(event.data);
        },
        onclose() {
          console.log("Connection closed by the server");
        },
        onerror(err) {
          console.log("There was an error from server", err);
        },
      });
    };
    fetchData();
  }, []);


  const handleClose = () => {
    setOpen(false);
  }

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('eee', event.target.files);
    const formData = new FormData();
    // @ts-ignore
    formData.append("file", event?.target?.files[0] as File);
    updateCurrentFilesUpload(event.target.files);
    uploadFileLocal(formData);
  }

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
      <Modal title={"Tải phương tiện lên"}
             open={open}
             width={800}
             onCancel={handleClose}
             centered
             styles={{body: {height: 500, display: "flex", flexGrow: 1}}}
             footer={() => <></>}>
        <div className={"box-upload-file"}>
          <Space direction={"vertical"} style={{width: "100%"}} size={"small"}>
            <span>Kéo & thả tệp vào đây</span>
            <span>hoặc</span>
            <div>
              <input type="file" id="btn-upload" hidden onChange={(e) => handleUploadFile(e)}/>
                <Button shape="round" size={"large"} type={"primary"}>
                  <label htmlFor="btn-upload">Tải lên từ máy tính</label>
                </Button>
            </div>
          </Space>
        </div>
      </Modal>
    </ConfigProvider>
  )
})
export default UploadFile;
