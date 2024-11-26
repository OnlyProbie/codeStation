import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useDispatch } from 'react-redux'
import { formatPerformanceList, setTableLoading } from '../redux/uploadJsonSlice';

const App = () => {
  const dispatch = useDispatch();
  const props = {
    name: 'file',
    accept: '.json',  // 只接受 JSON 文件
    beforeUpload: (file) => {
      // 检查文件类型
      const isJSON = file.type === 'application/json' || file.name.endsWith('.json');
      if (!isJSON) {
        message.error('只能上传 JSON 文件!');
        return Upload.LIST_IGNORE;
      }
      dispatch(setTableLoading(true));// 打开表格加载动画
      // 检查文件大小（限制为5MB）
      // const isLt5M = file.size / 1024 / 1024 < 5;
      // if (!isLt5M) {
      //   message.error('文件必须小于5MB!');
      //   return Upload.LIST_IGNORE;
      // }

      // 读取并解析 JSON 文件
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result);
          console.log('解析后的JSON数据:', jsonData);
          dispatch(formatPerformanceList(jsonData));
          message.success(`${file.name} 解析成功`);
          dispatch(setTableLoading(false));  // 关闭表格加载动画
          // 这里可以处理 JSON 数据，例如更新状态或传递给父组件
        } catch (error) {
          message.error('JSON 格式无效!');
          console.error('JSON 解析错误:', error);
        }
      };

      return false;  // 阻止自动上传
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log('文件信息:', info.file, info.fileList);
      }
    },
  };
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>上传文件</Button>
    </Upload>
  )

}
export default App;