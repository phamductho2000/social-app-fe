import {DownloadIcon, FileIcon} from "@/components/Icon";
import {FC} from "react";
import {Button} from "antd";

type FileMessageProps = {
  file: any;
  onDownload?: (file: any) => void;
}

const FileMessage: FC<FileMessageProps> = ({file, onDownload}) => {

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: '8px',
      minWidth: '200px',
      maxWidth: '300px',
      border: '1px solid rgba(255,255,255,0.2)'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        backgroundColor: '#1890ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        marginRight: '12px'
      }}>
        <FileIcon/>
      </div>

      <div style={{flex: 1, minWidth: 0}}>
        <div style={{
          fontSize: '14px',
          fontWeight: 500,
          color: 'inherit',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginBottom: '2px'
        }}>
          {file.name}
        </div>
        <div style={{
          fontSize: '12px',
          opacity: 0.8,
          color: 'inherit'
        }}>
          {formatFileSize(file.size)}
        </div>
      </div>

      <Button
        size={"small"}
        onClick={onDownload}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '6px',
          padding: '8px',
          color: 'inherit',
          cursor: 'pointer',
          marginLeft: '8px'
        }}
      >
        <DownloadIcon/>
      </Button>
    </div>
  );
};

export default FileMessage;
