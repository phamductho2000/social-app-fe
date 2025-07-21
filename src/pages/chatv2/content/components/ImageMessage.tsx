import {ImageIcon} from "@/components/Icon";
import React, {FC, useState} from "react";

type ImageMessageProps = {
  src: string;
  alt: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ImageMessage: FC<ImageMessageProps> = ({ src, alt, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        maxWidth: '250px',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0'
      }}
      onClick={onClick}
    >
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#999'
        }}>
          Đang tải...
        </div>
      )}

      {hasError ? (
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          color: '#999',
          fontSize: '14px'
        }}>
          <ImageIcon />
          <div style={{ marginTop: '8px' }}>Không thể tải ảnh</div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '200px',
            objectFit: 'cover',
            display: isLoading ? 'none' : 'block'
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
};

export default ImageMessage;
