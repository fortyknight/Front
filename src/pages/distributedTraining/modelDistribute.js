import React, { useState ,useEffect} from 'react';
import { Divider, Radio, Table,ConfigProvider } from 'antd';
import styled from 'styled-components';
import request from '../../config/request';


const columns = [
  {
    title: <span style={{ fontSize: '20px' }}>任务id</span>,
    dataIndex: 'id',
    render: (text) => <a style={{fontSize:'20px'}}>{text}</a>,
    
  },
  {
    title: <span style={{ fontSize: '20px' }}>任务名称</span>,
    dataIndex: 'task_name',
    render: (text) => <a style={{fontSize:'20px'}}>{text}</a>,
  },
  {
    title: <span style={{ fontSize: '20px' }}>模型</span>,
    dataIndex: 'model_name',
    render: (text) => <a style={{fontSize:'20px'}}>{text}</a>,
  },
  {
    title: <span style={{ fontSize: '20px' }}>数据集</span>,
    dataIndex: 'dataset_name',
    render: (text) => <a style={{fontSize:'20px'}}>{text}</a>,
  },
  // {
  //   title: <span style={{ fontSize: '20px' }}>任务类型</span>,
  //   dataIndex: 'task_type',
  //   render: (text) => <a style={{fontSize:'20px'}}>{text}</a>,
  // },
];



// rowSelection object indicates the need for row selection


const ModelDistribute = ({ setSelectedTasks }) => {
  const [taskdata, setTaskData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await request.get('/api/task', {
        params: {
          page_num: 1,
          page_size: 100,
        },
      });
      const response_1 = await request.get('/api/model/model-list');
      const taskList = response.data.data['task_list'];
      const taskDataWithKeys = taskList.map((task, index) => {
        const modelName = response_1.data.data.find((model) => model.id === task.model_id)?.name;
        const taskType = response_1.data.data.find((model) => model.id === task.model_id)?.type;
        const cpu = response_1.data.data.find((model) => model.id === task.model_id)?.cpu;
        const memory = response_1.data.data.find((model) => model.id === task.model_id)?.memory;
        return {
          ...task,
          key: index + 1,
          model_name: modelName,
          task_type:taskType,
          cpu:cpu,
          memory:memory
        };
      });
      setTaskData(taskDataWithKeys);
      setTaskData(taskDataWithKeys);
    } catch (error) {
      console.error(error);
    }
  };
  const [selectionType, setSelectionType] = useState('checkbox');
  const [selectedRowCount, setSelectedRowCount] = useState(0);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowCount(selectedRows.length);
      setSelectedTasks(selectedRows);
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
  return (
    <div>
      

      <Divider />
      <p style={{fontSize:'20px'}}>已选择的任务: {selectedRowCount}/{taskdata.length}</p>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={taskdata}
        style={{width:'700px',fontSize:'40px'}}
      />

    </div>
  );
};

export default ModelDistribute;