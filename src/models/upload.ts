import {useState} from "react";
import {UploadFile} from "antd";

export default () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreviewFile = (file: UploadFile) => {
    setFileList([...fileList, file]);
  }

  return {fileList, handlePreviewFile}
}
