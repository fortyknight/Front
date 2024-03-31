import { Space, Table, Tag } from 'antd';
import { withRouter } from 'umi';
import React from 'react';
import  { useEffect, useState } from 'react';
import axios from 'axios'

const ExperimentList = () => {
  const [data, setData] = useState([]);
  const handleAction = async (record) => {
  
    try {
      // 向后端发送请求以更改设备状态
      const response = await axios.post('api/device/updateDeviceState', {
        id: record.id,
      });

      if (response.status === 200) {
        const updatedData = data.map(item => {
          if (item.id === record.id&&item.tags[0]==='已发布') {
            return {
              ...item,
              tags: ['未发布'] // 更新设备状态S
            };
          }else if(item.id === record.id&&item.tags[0]==='未发布'){
            return {
              ...item,
              tags: ['已发布'] // 更新设备状态S
            };
          }
          return item;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }

};
const handleDelete = async (record) => {
  
  try {
    // 向后端发送请求以更改设备状态
    const response = await axios.post('api/device/deleteDeviceState', {
      id: record.id,
    });
    const updatedData = data.filter((item) => item.id !== record.id); // 根据删除的设备ID过滤数据
    setData(updatedData);
  } catch (error) {
    console.error(error);
  }

};
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '型号名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '创建时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '发布状态',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === '未发布') {
            color = 'red';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>查看</a>
        <a onClick={() => handleDelete(record)}>删除</a>
        <a onClick={() => handleAction(record, record.tags[0])}>{record.tags[0]==='已发布'?'停用':'发布'}</a>

      </Space>
    ),
  },
];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/device'); // 根据你的后端 API 路由进行相应的修改
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return <Table  style={{minWidth:'300px',minHeight:'300px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}} columns={columns} dataSource={data} />;
}


export default  withRouter(ExperimentList);