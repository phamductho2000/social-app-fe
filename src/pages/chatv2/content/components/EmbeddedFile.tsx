import { getFileCategory, getFileIcon } from '@/utils/FileUtil';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Space, Typography } from 'antd';
import { FC } from 'react';
import ReactPlayer from 'react-player';

type EmbeddedMessageProps = {
  files: any[];
  onClose?: () => void;
};

const { Text } = Typography;

const EmbeddedFile: FC<EmbeddedMessageProps> = ({ files, onClose }) => {
  if (!files || files?.length === 0) return null;

  const render = (file: any) => {
    const category = getFileCategory(file.file);
    const icon = getFileIcon(file.file);
    switch (category) {
      case 'image':
        // return (
        //   <Space direction="vertical" style={{ width: 100 }}>
        //     <img alt="" src={file.url} width={100} height={100} />
        //     <Text ellipsis={{ tooltip: file.file.name }} style={{ width: 100 }}>
        //       {file.file.name}
        //     </Text>
        //   </Space>
        // );

        return <img alt="" src={file.url} width={100} height={100} />;
      case 'video':
        // return <ReactPlayer src={file.url} height={100} width={100} controls />;
        // return (
        //   <Space direction="vertical" style={{ width: 100 }}>
        //     <ReactPlayer src={file.url} height={100} width={100} controls />
        //     <Text ellipsis={{ tooltip: file.file.name }} style={{ width: 100 }}>
        //       {file.file.name}
        //     </Text>
        //   </Space>
        // );

        return <ReactPlayer src={file.url} height={100} width={100} controls />;

      case 'audio':
        return <audio src={file.url} controls />;

      case 'pdf':
        return <iframe src={file.url} width={300} height={400} />;

      case 'document':
        // return (
        //   <Space direction="vertical" style={{ width: 100 }}>
        //     <img alt="" src={icon} width={100} height={100} />
        //     <div style={{padding: 5, textAlign: 'center'}}>
        //       <Text strong ellipsis={{ tooltip: file.file.name }} style={{ width: 100 }}>
        //         {file.file.name}
        //       </Text>
        //       <Text type="secondary" ellipsis={{ tooltip: file.file.size }} style={{ width: 100, fontSize: 12 }}>
        //         {file.file.size} MB
        //       </Text>
        //     </div>
        //
        //   </Space>
        // );

        return <img alt="" src={icon} width={100} height={100} />;

      default:
        return <div>📄 {file.file.name}</div>;
    }
  };

  return (
    <Flex align={'center'} gap={10} style={{ width: '100%', minWidth: 0, paddingTop: 10 }}>
      {files?.map((file, index) => {
        return (
          <Card
            key={index}
            hoverable
            style={{ width: 100, height: 150 }}
            cover={
              <Space direction="vertical" style={{ width: 100 }}>
                {render(file)}
                <div style={{ padding: 5, textAlign: 'center' }}>
                  <Text strong ellipsis={{ tooltip: file.file.name }} style={{ width: 100 }}>
                    {file.file.name}
                  </Text>
                  <Text
                    type="secondary"
                    ellipsis={{ tooltip: file.size }}
                    style={{ width: 100, fontSize: 12 }}
                  >
                    {file.size} MB
                  </Text>
                </div>
                <Button
                  type="primary"
                  size="small"
                  shape="circle"
                  icon={<CloseOutlined />}
                  style={{ position: 'absolute', top: '-9px', right: '-9px' }}
                >
                  {/*x*/}
                </Button>
              </Space>
            }
          ></Card>
        );
      })}
    </Flex>
  );
};
export default EmbeddedFile;
