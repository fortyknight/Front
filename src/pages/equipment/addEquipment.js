import React, { useState,useNavigate } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { Option } = Select;
const AddEquipment = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm(); 
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    const updatedValues = {
      ...values,
      state: true
    };
    axios.post('/api/device', updatedValues) // 将数据提交到后端
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
  console.log('cx2',open)
  return (
    <>

      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} style={{marginTop:'10px'}}>
        新建设备
      </Button>
      <div>
      <Drawer
      title={<div style={{ fontSize: '24px' }}>新建设备</div>}
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
                name="id"
                label={<label style={{ fontSize: '20px' }}>设备ID</label>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter device ID',
                  },
                ]}
              >
                <Input placeholder="Please enter device ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label={<label style={{ fontSize: '20px' }}>设备名称</label>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter device name',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please enter device name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label={<label style={{ fontSize: '20px' }}>设备类型</label>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter device type',
                  },
                ]}
              >
              <Input
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please enter device type"
                />
              </Form.Item>
            </Col>
            
          </Row>

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
      </div>
    </>
  );
};
export default AddEquipment;