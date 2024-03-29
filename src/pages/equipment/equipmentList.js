import { Space, Table, Tag } from 'antd';
import { withRouter } from 'umi';
import React from 'react';
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
        <a>删除</a>
        <a>{record.tags[0]==='已发布'?'停用':'发布'}</a>

      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    id: 'smoke001',
    name: '烟感001',
    type: '设备',
    time:'2020-03-0916:05:51',
    tags: ['已发布'],
  },
  {
    key: '2',
    id: '1240193514658086912',
    name: 'tcp-test',
    type: '设备',
    time:'2020-03-1916:18:03',
    tags: ['未发布'],
  },
  {
    key: '3',
    id: 'smoke001',
    name: '烟感001',
    type: '设备',
    time:'2020-03-0916:05:51',
    tags: ['已发布'],
  },
];
const ExperimentList = () => <Table  style={{minWidth:'300px',minHeight:'300px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}} columns={columns} dataSource={data} />;

export default  withRouter(ExperimentList);