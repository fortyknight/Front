import { divide } from "lodash"
import { withRouter } from 'umi';
import React, { useState, useEffect } from 'react';
import { Input, Collapse, Space, Empty, Drawer, Statistic, Tag, Divider, Card, Progress, Row, Col } from 'antd';
import TrainDesign from "./trainDesign";
import ModelDistribute from "./modelDistribute";
import DistributeTable from "./distributeTable";
import axios from 'axios'
import styles from './index.less';
import {ArrowDownOutlined} from '@ant-design/icons';
import { Table,notification, } from 'antd';


const { Search } = Input;
const { Panel } = Collapse;

const columns = [
  {
    title: '任务id',
    dataIndex: 'task_id',
  },
  {
    title: '任务名称',
    dataIndex: 'task_name',
  },
  {
    title: '设备id',
    dataIndex: 'device_id',
  },
  {
    title: '设备名称',
    dataIndex: 'device_name',
  },
];
const DistributedTraining = () => {

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const [taskdata, settaskData] = useState([]);
  const[bestAllocation,setBestAllocation] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
const [selectedDevices, setSelectedDevices] = useState([]);

  const [showButton, setShowButton] = useState(true); // 初始化状态，用于控制按钮和div的显示与隐藏
  const [showStrategy, setShowStrategy] = useState(false);
  const [internetData, setInternetData] = useState({});

  useEffect(() => {
    const onlineDevices = data.filter(item => item.tags[0] === '在线');
    const sockets = onlineDevices.map(device => {
      const socket = new WebSocket(`ws://localhost:8000/api/internet/status?internet_id=${device.id}`);

      socket.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        setInternetData(prevData => ({ ...prevData, [device.id]: newData }));
      };

      return socket;
    });

    return () => {
      sockets.forEach(socket => socket.close());
    };
  }, [data]);
 




  // useEffect(() => {
  //   // 在组件挂载时创建 WebSocket 连接

  //   // 监听 WebSocket 消息事件
  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     setServerStatus(data);
  //     console.log('Received data:', data);
  //   };

  //   // 返回一个清理函数，在组件卸载时关闭 WebSocket 连接
  //   return () => {
  //     console.log('Component will unmount, closing WebSocket...');
  //     if (socket) {
  //       socket.close();
  //     }
  //   };
  // }, []); // 仅在组件挂载和卸载时执行一次



  const openNotification = (placement) => {
    notification.info({
      message: '请选择任务',
      placement,
    });
  };
  const openNotification_2 = (placement) => {
    notification.info({
      message: '请选择设备',
      placement,
    });
  };
  const submitData = async () => {
    const payload = {
      tasks: selectedTasks,
      devices: selectedDevices,
    };
  
    try {
      const response = await axios.post('/api/distribute', payload);
      setBestAllocation(response.data.best_allocation);
      console.log('提交成功:', response.data);
    } catch (error) {
      console.error('提交失败:', error);
    }
  };
  const handleButtonClick = () => {
    if(selectedTasks.length===0) openNotification('topRight')
    if(selectedDevices.length===0) openNotification_2('topRight')
    if(selectedDevices.length===0||selectedTasks.length===0) return
    submitData();
    setShowButton(false); // 点击按钮后隐藏按钮
    setTimeout(() => {
      setShowStrategy(true); // 一秒钟后将 showStrategy 设置为 false
    }, 1000);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/internet'); // 根据你的后端 API 路由进行相应的修改
      const response_1 = await axios.get('/api/task', {
        params: {
          page_num: 1,
          page_size: 100,
        },
      });
      settaskData(response_1.data.data['task_list']);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Space direction="vertical">
      <Collapse collapsible="header" defaultActiveKey={['1']} ghost>
        <Panel
          header={
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
              设备监控
            </div>
          }
          key="1"
        >
          <Row gutter={[16, 16]}>
            {data.map((item, index) => (
              (item.tags[0] === '在线' && 
              <div style={{justifyContent: 'center',}}>
              <Col key={index} span={10}>
                <div className={styles.card}>
                  <Card
                    size="small"
                    title={<span style={{ fontSize: '20px' }}>{item.name}</span>}
                    extra={<a href="#">More</a>}
                    style={{
                      width: '350px',
                    }}
                  >
                   <div>
                          <div>
                            <span style={{fontSize:'20px'}}>CPU 利用率</span>
                            <Progress percent={internetData[item.id]?.cup_used } size="big" status="active" />
                          </div>
                          <div>
                            <span style={{fontSize:'20px'}}>内存使用率</span>
                            <Progress percent={internetData[item.id]?.memory_percent || item.memory_usage} size="big" status="active" />
                          </div>
                          <div>
                            <span style={{fontSize:'20px'}}>内存使用情况:     </span>
                            <span style={{fontSize:'20px'}}>
                              {internetData[item.id]?.used_memory} MB / {(internetData[item.id]?.total_memory / 1024).toFixed(2)} GB
                            </span>
                          </div>
                        </div>
                  </Card>
                </div>

              </Col>
              </div>)
            ))}
            {data.filter(item => item.tags[0] === '在线').length === 0 && (
        <Col span={24}>
          <Empty />
        </Col>
      )}
          </Row>
        </Panel>
      </Collapse>
      <Collapse collapsible="icon" defaultActiveKey={['1']} ghost>
        <Panel header={
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            分布式策略生成
          </div>
        } key="1">
          <div style={{ marginTop: '10px',  display: 'flex', justifyContent: 'center', marginLeft: '10px', paddingLeft: "60px" }}>
            <div style={{ marginRight: '100px', boxShadow: '5px 5px 10px rgba(0.1, 0.1, 0.1, 0.1)' ,padding:'20px'}}>
            <ModelDistribute setSelectedTasks={setSelectedTasks} />
            </div>
            <div style={{ boxShadow: '5px 5px 10px rgba(0.1, 0.1, 0.1, 0.1)',padding:'20px' }}>
            <TrainDesign setSelectedDevices={setSelectedDevices} />
            </div>

          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {showButton && (
              <button className={styles.button} onClick={handleButtonClick}>
                生成策略
              </button>
            )}
            {
              !showButton && !showStrategy && (<div className={styles.boxes} style={{ marginTop: '20px' }}>
                <div class="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className={styles.box}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className={styles.box}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className={styles.box}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>)
            }
            {!showButton && showStrategy && (
              <div>
                <div className={styles.singleArrow} style={{marginLeft:'160px'}}>
                  </div>
            
              <div style={{marginTop:"30px"}}>
              <Table columns={columns} dataSource={bestAllocation}  style={{ fontSize: "26px" }}/>
              </div>
              </div>
            )}

          </div>



        </Panel>
      </Collapse>
    </Space>
  );
};

export default withRouter(DistributedTraining);