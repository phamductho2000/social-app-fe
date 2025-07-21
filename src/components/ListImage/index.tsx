import {Space} from "antd";
import React from "react";
import './style.css';

type ListImageProps = {
  width: number | undefined;
  height: number | undefined;
  images: any[]
};
const ListImage: React.FC<ListImageProps> = ({width, height, images}) => {
  return (
    <Space style={{width: '100%'}}>
      {images?.map((image, i) => (
        <div className="thumbnail-container" key={image?.id}>
          <img style={{objectFit: 'cover'}}
               src={image?.url}
               height={width ?? 100} width={height ?? 100} alt={''}/>
          <div className="remove-btn"></div>
        </div>
      ))}
    </Space>
  );
};

export default ListImage;
