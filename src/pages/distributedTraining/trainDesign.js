import React, { useState,useEffect } from 'react';
import { Divider, Radio, Table,ConfigProvider,Pagination } from 'antd';
import styled from 'styled-components';
import request from "@/config/request";


const columns = [
  {
    title: <span style={{ fontSize: '20px' }}>设备id</span>,
    dataIndex: 'id',
    render: (text) => <a style={{fontSize:'20px'}}>{text}</a>,
    style:{fontSize: '26px'},
  },
  {
    title: <span style={{ fontSize: '20px' }}>设备名称</span>,
    dataIndex: 'name',
    render: (text) => <a style={{fontSize:'20px'}}>{text}</a>,
    style:{fontSize: '26px'},
  },
  {
    title: <span style={{ fontSize: '20px' }}>设备类型</span>,
    dataIndex: 'type',
    render: (text) => <a style={{fontSize:'20px'}}>{text}</a>,
  },
];



// rowSelection object indicates the need for row selection


const TrainDesign = ({ setSelectedDevices }) => {

  const [selectionType, setSelectionType] = useState('checkbox');
  const [selectedRowCount, setSelectedRowCount] = useState(0);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowCount(selectedRows.length);
      setSelectedDevices(selectedRows);
    },
    getCheckboxProps: (record) => ({
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const StyledTableWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    .ant-table {
      width: 48%;
    }
  `;
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await request.get('/api/internet'); // 根据你的后端 API 路由进行相应的修改
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const equipmentData = data.filter(item => item.tags[0] === '在线').map(item => ({
    key:item.id.toString(),
    id: item.id,
    name: item.name,
    type: item.instance_type,
    cpu:'1000',
    memory:'1000'
  }));
  
  return (
    <div>
      

      <Divider />
      <p style={{fontSize:'20px'}}>已选择的设备: {selectedRowCount}/{equipmentData.length}</p>
      <ConfigProvider
      theme={{
        components: {
          Table: {
fontSize:'20px'
          },
        },
      }}
    >
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={equipmentData}
        style={{width:'500px',fontSize: '206px'}}
        pagination={{
          pageSize: 4, // 每页显示四行数据
        }}
      /></ConfigProvider>

    </div>
  );
};

export default TrainDesign;