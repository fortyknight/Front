import { Card, List } from 'antd';
import React from 'react';
const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
];
const DistributeTable = () => (
  <List
    grid={{
      gutter: 16,
      column: 4,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card title={item.title} style={{fontSize: '56px'}}>Card content</Card>
      </List.Item>
    )}
  />
);
export default DistributeTable;