import { withRouter } from 'umi';
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { Badge, Dropdown, Space } from 'antd';

const columns = [
  {
    title: '任务id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '任务名称',
    dataIndex: 'task_name',
    key: 'task_name',
  },
  {
    title: '数据集名称',
    dataIndex: 'dataset_name',
    key: 'dataset_name',
  },
  {
    title: '模型名称',
    dataIndex: 'model_name',
    key: 'model_name',
  },
  {
    title: '任务类型',
    dataIndex: 'task_type',
    key: 'task_type',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>删除</a>,
  },
];

const ModelTrain = () => {
  const [taskdata, setTaskData] = useState([]);
  const [modeldata, setModelData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/task', {
        params: {
          page_num: 1,
          page_size: 100,
        },
      });
      const response_1 = await axios.get('/api/model/model-list');

      setModelData(response_1.data.data);
      const taskList = response.data.data['task_list'];
     
      const taskDataWithKeys = taskList.map((task, index) => {
        const modelName = response_1.data.data.find((model) => model.id === task.model_id)?.name;
        const taskType = response_1.data.data.find((model) => model.id === task.model_id)?.type;
        return {
          ...task,
          key: index + 1,
          model_name: modelName,
          task_type:taskType,
        };
      });
      setTaskData(taskDataWithKeys);
    } catch (error) {
      console.error(error);
    }
  };

  const expandedRowRender = () => {
    const columns = [
      {
        title: '参数名',
        dataIndex: 'param_name',
        key: 'param_name',
      },
      {
        title: '参数值',
        dataIndex: 'param_value',
        key: 'param_value',
      },
    ];
    if ( taskdata.length === 0) {
      return null;
    }
    const data = [];
    taskdata.forEach(task => {
      const modelParams = JSON.parse(task.model_param_list); // 将 JSON 字符串解析为对象
      console.log('cqm',task.model_param_list)
      modelParams.forEach((param, index) => {
        data.push({
          key: `${task.id}-${index}`, // 使用任务ID和索引作为唯一键
          param_name: param.param_name,
          param_value: param.param_value,
        });
      });
    });
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  console.log('model',modeldata[0])
  console.log('taskdata',taskdata)
  console.log('modeldata',modeldata)

  return (
    <>
      <Table
        columns={columns}
        // expandable={{
        //   expandedRowRender,
        //   defaultExpandedRowKeys: ['0'],
        // }}
        dataSource={taskdata}
      />
    </>
  );
};

export default withRouter(ModelTrain);