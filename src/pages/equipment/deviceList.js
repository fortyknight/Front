import { Space, Table, Tag } from 'antd';
import { withRouter } from 'umi';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, notification} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const DeviceList = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const onClose = () => {
    setOpen(false);

  };
  const[internetData,setInternetData] = useState([])
  console.log('data',data)
  
  // const onSubmit = async (values) => {
  //   // try {
  //   //   axios.post('http://localhost:8001/postTrain');

  //   //   const response = await axios.get('/api/internet/connect', {
  //   //     params: {
  //   //       ...values,
  //   //       host: storedRecord.address,
  //   //     },
  //   //   });

  //   //   if (response.status === 200) {
  //   //     setOpen(false);
  //   //     setTimeout(() => {
  //   //       alert('上传成功');
  //   //     }, 1000);
  //   //   } else {
  //   //     alert('上传失败');
  //   //   }
  //   // } catch (error) {
  //   //   console.error('上传失败:', error);
  //   //   alert('上传失败');
  //   // }
  //   const response = await axios.post('http://localhost:8001/api/internet/changestate', {
  //     id: record.id,
  //     type: true,
  //   });
  //         const updatedData = data.map(item => {
  //           if (item.id === record.id && (item.tags[0] === '离线' || item.tags[0] === '未启用')) {
  //             return {
  //               ...item,
  //               tags: ['在线'] // 更新设备状态S
  //             };
  //           }
  //           return item;
  //         });
  //         setData(updatedData);
  //         alert('连接成功！');
  //       }
  // };
  const openNotification = (placement) => {
    notification.info({
      message: `连接失败`,
      description:
        '请检查IP，用户名或密码',
      placement,
    });
  };
  const onFinish = (values) => {
    const updatedValues = {
      ...values,
      id:internetData.id,
      type: true,
      internet_ip:internetData.address
    };
    axios.post('/api/internet/changestate', updatedValues) // 将数据提交到后端
    .then((response) => {
      console.log(response.data);
      onClose(); // 关闭抽屉
      console.log(response.data.code);
      if (response.data.code !== 0) {
        openNotification('topLeft');
      } else {
        const updatedData = data.map((item) => {
          if (item.id === updatedValues.id) {
            return { ...item, tags: ['在线'] }; // 更新设备状态
          }
          return item;
        });
        setData(updatedData);
        onClose(); // 关闭抽屉
      }
    })
    .catch((error) => {
      console.error(error);
      
        
    });
  };
  const showDrawer = async (record) => {
    setInternetData(record);
    setOpen(true);

  };
  const deleteInternet = async (record) => {
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
  }
  const handleConnect = async (record) => {
    try {
      // 向后端发送请求以更改设备状态
      const response = axios.post('http://39.105.125.118:8000/postModel');
      const response2 = await axios.get('/api/internet/connect', {
        params: {
          host: record.address
        }
      });
      if (response2.data.data.message !== 11001) {
        const response3 = await axios.post('http://39.105.125.118:8000/api/internet/changestate', {
          id: record.id,
          type: true
        });
        if (response3.status === 200) {
          const updatedData = data.map(item => {
            if (item.id === record.id && (item.tags[0] === '离线' || item.tags[0] === '未启用')) {
              return {
                ...item,
                tags: ['在线'] // 更新设备状态S
              };
            }
            return item;
          });
          setData(updatedData);
          alert('连接成功！');
        }

      } else {
        alert('连接失败！');
      }

    } catch (error) {
      console.error(error);

    }

  };
  const { Option } = Select;
  const handleDisConnect = async (record) => {
    const response4 = await axios.post('http://39.105.125.118:8000/api/internet/changestate', {
      id: record.id,
      type: false
    });
    if (response4.status === 200) {
      const updatedData = data.map(item => {
        if (item.id === record.id && item.tags[0] === '在线') {
          return {
            ...item,
            tags: ['离线'] // 更新设备状态S
          };
        }
        return item;
      });
      setData(updatedData);
    }
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '网关名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据来源',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '服务器地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '服务器端口',
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: '实例类型',
      dataIndex: 'instance_type',
      key: 'instance_type',
    },
    {
      title: '最近连接时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '网关状态',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color;
            if (tag === '未启用') {
              color = 'geekblue';
            } else if (tag === '离线') {
              color = 'red';
            } else {
              color = 'green';
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
          <a onClick={() => {
            if (record.tags[0] === '离线' || record.tags[0] === '未启用') {
              showDrawer(record);
            }
          }}>连接</a>
          <a onClick={() => {
            if (record.tags[0] === '在线') {
              handleDisConnect(record);
            }
          }}>断连</a>
          {/* <a onClick={() => { if (record.tags[0] === '在线') { showDrawer(record) } else { alert('请先连接') } }} >模型下发</a> */}
          <a onClick={() => { deleteInternet(record) }} > 删除</a>

        </Space>
      ),
    },
  ];
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/internet'); // 根据你的后端 API 路由进行相应的修改
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return <div>
    <Table style={{ minWidth: '300px', minHeight: '300px' }} columns={columns} dataSource={data} />
    <Drawer
      title="模型下发"
      width={720}
      onClose={onClose}
      visible={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="internet_username"
                            label="用户名"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter username',
                              },
                            ]}
                          >
                          <Input
                              style={{
                                width: '100%',
                              }}
                              placeholder="Please enter username"
                            />
                          </Form.Item>
                        </Col>
            
                        <Col span={12}>
                          <Form.Item
                            name="internet_password"
                            label="密码"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter password',
                              },
                            ]}
                          >
                                  <Input.Password
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
                          </Form.Item>
                        </Col>
                        
                      </Row>
                      <Row justify="end">
            <Col>
              <Space>
                <Button onClick={onClose}>取消</Button>
                <Button htmlType="submit" type="primary">
                  提交
                </Button>
              </Space>
            </Col>
          </Row>
      </Form>
    </Drawer>

  </div>
    ;
}

export default withRouter(DeviceList);