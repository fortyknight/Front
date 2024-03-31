import React, { useState,useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import axios from 'axios';
const { Option } = Select;

const AddData = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm(); 
  const [data, setData] = useState([]);
  
  const { Option } = Select;
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

    axios.post('/api/internet', updatedValues) // 将数据提交到后端
      .then((response) => {
        console.log(response.data);
        form.resetFields(); // 提交成功后重置表单
        onClose(); // 关闭抽屉
        window.location.reload(); 
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} style={{marginTop:'10px'}}>
        数据接入
      </Button>
      <Drawer
        title="数据接入"
        width={720}
        onClose={onClose}
        open={open}
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
                label="网关名称"
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
                label="数据来源"
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
                label="服务器地址"
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
                label="服务器端口"
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
            <Col span={24}>
              <Form.Item
                name="description"
                label="描述"
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