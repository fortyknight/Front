import React, { useState,useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import request from "@/config/request";
const { Option } = Select;

const AddData = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm(); 
  const [data, setData] = useState([]);
  const [instanceType, setInstanceType] = useState('');
  
  
  const { Option } = Select;
  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {
    try {
      const response = await request.get('/api/device'); // 根据你的后端 API 路由进行相应的修改
      console.log(response);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    const updatedValues = {
      ...values,
      state: 0
    };
    console.log('value',values)

    request.post('/api/internet', updatedValues) // 将数据提交到后端
      .then((response) => {
        console.log(response.data);
        form.resetFields(); // 提交成功后重置表单
        onClose(); // 关闭抽屉
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleChange = (value) => {
     setInstanceType(value);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} style={{marginTop:'10px'}}>
        数据接入
      </Button>
      <Drawer
      title={<div style={{ fontSize: '24px' }}>数据接入</div>}
        width={720}
        onClose={onClose}
        visible={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}

      >
        <Form  form={form} onFinish={onFinish} layout="vertical" >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label={<label style={{ fontSize: '20px' }}>网关名称</label>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter Gateway name',
                  },
                ]}
              >
                <Input placeholder="Please enter Gateway name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label={<label style={{ fontSize: '20px' }}>数据来源</label>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter Data source',
                  },
                ]}
              >
                <Select placeholder="Please enter Data source">
                {data.map((item) => {
      if (item.tags[0]==='已发布') {
        return (
          <Option key={item.id} value={item.id}>
            {item.id}
          </Option>
        );
      }
      return null;
    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="address"
                label={<label style={{ fontSize: '20px' }}>服务器地址</label>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter Server address',
                  },
                ]}
              >
              <Input
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please enter Server address"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="port"
                label={<label style={{ fontSize: '20px' }}>端口</label>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter Server port',
                  },
                ]}
              >
              <Input
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please enter Server port"
                />
              </Form.Item>
            </Col>
            
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="instance_type"
                label={<label style={{ fontSize: '20px' }}>实例类型</label>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter Server Instance Type',
                  },
                ]}
              >
              <Select
      style={{
        width: 330,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'cpu',
          label: 'CPU',
        },
        {
          value: 'gpu',
          label: 'GPU',
        },
        {
          value: 'npu',
          label: 'NPU',
        },
        {
          value: '嵌入式设备',
          label: '嵌入式设备',
        },
        {
          value: '其它',
          label: '其它（无计算能力）',
        },
      ]}
    />
              </Form.Item>
            </Col>

            
          </Row>
          {/* {(instanceType === 'cpu'||instanceType === 'gpu'||instanceType === 'npu'||instanceType === '嵌入式设备') && (
                        <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="username"
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
                            name="password"
                            label="密码"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter password',
                              },
                            ]}
                          >
                          <Input
                              style={{
                                width: '100%',
                              }}
                              placeholder="Please enter password"
                            />
                          </Form.Item>
                        </Col>
                        
                      </Row>
            )} */}

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label={<label style={{ fontSize: '20px' }}>描述</label>}
                rules={[
                  {
                    required: true,
                    message: 'please enter description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter description" />
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
    </>
  );
};
export default AddData;