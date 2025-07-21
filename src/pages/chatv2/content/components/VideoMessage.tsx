import {PlayIcon} from "@/components/Icon";

const VideoMessage = ({src, poster, onClick}) => {
  return (
    <div
      style={{
        position: 'relative',
        maxWidth: '250px',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#000'
      }}
      onClick={onClick}
    >
      <video
        poster={poster}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '200px',
          objectFit: 'cover'
        }}
        preload="metadata"
      >
        <source src={src} type="video/mp4"/>
        Trình duyệt không hỗ trợ video.
      </video>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <PlayIcon/>
      </div>
    </div>
  );
};

export default VideoMessage;
