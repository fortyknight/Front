import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import axios from 'axios';
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
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} style={{marginTop:'10px'}}>
        新建设备
      </Button>
      <Drawer
        title="新建设备"
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
                name="id"
                label="设备ID"
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
                label="设备名称"
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
                label="设备类型"
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
export default AddEquipment;