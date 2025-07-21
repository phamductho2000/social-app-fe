import React from 'react';
import {Descriptions, DescriptionsProps, Space} from "antd";

const Info: React.FC = () => {

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'UserName',
      children: 'Zhou Maomao',
    },
    {
      key: '2',
      label: 'Telephone',
      children: '1810000000',
    },
    {
      key: '3',
      label: 'Live',
      children: 'Hangzhou',
    },
    {
      key: '4',
      label: 'Remark',
      children: 'empty',
    },
    {
      key: '5',
      label: 'Address',
      children: 'No. 18,',
    },
  ];

  return (
    <>
      <Space style={{width: "100%"}} wrap direction={"vertical"}>
        <div>
          <img style={{maxWidth: "100%"}} src={"http://localhost:8080/api/storage/get/1%20-%20Copy.PNG"}/>
        </div>
          <table style={{width: "100%"}}>
            <tbody>
            <tr>
              <td>Loại</td>
               <td align={"right"}>jpg</td>
            </tr>
            <tr>
              <td>Kích thước</td>
               <td align={"right"}>jpg</td>
            </tr>
            <tr>
              <td>Độ phân giải</td>
              <td align={"right"}>jpg</td>
            </tr>
            <tr>
              <td>URL</td>
               <td align={"right"}>jpg</td>
            </tr>
            <tr>
              <td>Ngày thêm</td>
               <td align={"right"}>jpg</td>
            </tr>
            <tr>
              <td>Thêm bởi</td>
              <td align={"right"}>jpg</td>
            </tr>
            </tbody>
          </table>
      </Space>
    </>
  );
};

export default Info;
