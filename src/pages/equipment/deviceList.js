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
    title: '设备名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '产品名称',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '注册时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '状态',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag === '未启用' ? 'geekblue' : 'green';
          if (tag === '离线') {
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
        <a>编辑</a>
        <a>禁用</a>

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
    tags: ['在线'],
  },
  {
    key: '2',
    id: '1240193514658086912',
    name: 'tcp-test',
    type: '设备',
    time:'2020-03-1916:18:03',
    tags: ['离线'],
  },
  {
    key: '3',
    id: 'smoke001',
    name: '烟感001',
    type: '设备',
    time:'2020-03-0916:05:51',
    tags: ['未启用'],
  },
];
const DeviceList = () => <Table  style={{minWidth:'300px',minHeight:'300px'}} columns={columns} dataSource={data} />;

export default  withRouter(DeviceList);