import React, {FC} from "react";
import {Flex, Image, Tag, Typography, UploadFile} from "antd";
import './style.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FileOutlined} from "@ant-design/icons";

type ReplyPopupProps = {
  fileList: UploadFile[]
};
const {Text} = Typography;

const UploadPopup: FC<ReplyPopupProps> = ({fileList}) => {

  return (
    // <div className={'reply-popup'}>
    //   <Flex gap={10} justify={'space-between'} align={'flex-start'}>
    //     <Upload
    //       action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
    //       // listType="picture-card"
    //       fileList={fileList}
    //       showUploadList={true}
    //     >
    //       {fileList.length >= 8}
    //     </Upload>
    //   </Flex>
    // </div>
    <Flex gap={5} style={{marginTop: 10, marginLeft: 10, marginBottom: 10}}>
      <Tag
        closable
        closeIcon={
          <FontAwesomeIcon style={{
            fontSize: 5,
            position: 'absolute',
            top: -8,
            right: -5,
            width: 10,
            height: 10,
            background: 'white',
            borderRadius: '50%',
            padding: 5
          }} icon={faXmark}/>

        }
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          borderRadius: 16,
          background: '#d9d9d9',
        }}
      >
        <FileOutlined style={{marginRight: 6}}/>
        Dump20220821.sql
      </Tag>
      <Tag
        closable
        closeIcon={
          <FontAwesomeIcon style={{
            fontSize: 5,
            position: 'absolute',
            top: -8,
            right: -5,
            width: 10,
            height: 10,
            background: 'white',
            borderRadius: '50%',
            padding: 5
          }} icon={faXmark}/>
        }
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px 8px',
          borderRadius: 16,
          background: '#d9d9d9',
        }}
      >
        <FileOutlined style={{marginRight: 6}}/>
        Dump20220821.sql
      </Tag>
      <Tag
        closable
        closeIcon={
          <FontAwesomeIcon style={{
            fontSize: 5,
            position: 'absolute',
            top: -8,
            right: -5,
            width: 10,
            height: 10,
            background: 'white',
            borderRadius: '50%',
            padding: 5
          }} icon={faXmark}/>
        }
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          padding: '4px 8px',
          borderRadius: 16,
          background: '#d9d9d9',
        }}
      >
        <Image
          width={50}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Tag>
    </Flex>

  )
}
export default UploadPopup;
