import { withRouter } from 'umi';

import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { Input, Button, Drawer, Dropdown, Avatar, Skeleton } from 'antd';
import {  DatePicker,  Form,Select, Space} from 'antd';
import axios from 'axios';

import {
    PlusOutlined,
    RedoOutlined,
    EllipsisOutlined,
    SettingOutlined,
    EditOutlined,
    VerticalAlignBottomOutlined,
} from '@ant-design/icons';

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                模型编号
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                模型名称
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                标签
            </a>
        ),
    },
];

const { Meta } = Card;
const { Search } = Input;

const ModelManage = () => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm(); 
    const { Option } = Select;
    const showDrawer = (record) => {
        sessionStorage.setItem('record', JSON.stringify(record));
        setOpen(true);
    };
    const storedRecord = JSON.parse(sessionStorage.getItem('record'));
    console.log('cxs',storedRecord)
    const onClose = () => {
        setOpen(false);
    };
    const onSubmit = async (values) => {

            const response = await axios.get('/api/internet/download',{
                params: {
                    ...values,
                    owner: storedRecord,
                  },
            });
  const { file_path } = response.data;
  const a = document.createElement('a');
  a.href = file_path;
  a.download = `search_${storedRecord}_${values.type}.jinja2`;  // 设置下载的文件名
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);}

    
      
    return (
        <>
        
            <div style={{ marginLeft: '170px' }}>
                <Row>
                    <Col span={20}>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomLeft"
                            arrow
                        >
                            <Button>模型编号</Button>
                        </Dropdown>
                        <Search
                            placeholder={'请输入搜索内容'}
                            style={{ width: 300, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                        />
                    </Col>
                    <Col>
                        <Button style={{ float: 'right' }} type="text" icon={<RedoOutlined />}></Button>
                        数量：5
                    </Col>
                    <Col>
                        <Button type="primary" icon={<PlusOutlined />}>
                            新建
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" danger>
                            删除
                        </Button>
                    </Col>
                </Row>


                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="knn" bordered={false} extra={<a href="#">More</a>}
                            cover={
                              
 <img 
 className={"logoStyle"} 
 src={require('./R.png')} 
 alt=""
/>
                            }    
                            actions={[
                                <VerticalAlignBottomOutlined key="setting" onClick={() => showDrawer("knn")}/>,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}>
                            <Meta
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="mlp" bordered={false} extra={<a href="#">More</a>}
                            cover={
                                <img
                                  alt="example"
                                  src={require('./image_1.png')} 
                                  width= "auto" /* 设置宽度为200像素 */
                                  height= "300px" /* 让高度按比例自动调整 */
                                />
                              }    
                            actions={[
                                <VerticalAlignBottomOutlined key="setting" onClick={() => showDrawer("knn")}/>,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}>
                            <Meta
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="dtr" bordered={false} extra={<a href="#">More</a>}
                            cover={
                                <img
                                  alt="example"
                                  src={require('./image_2.png')} 
                                  width= "auto" /* 设置宽度为200像素 */
                                  height= "300px" /* 让高度按比例自动调整 */
                                />
                              }    
                            actions={[
                                <VerticalAlignBottomOutlined key="setting" onClick={() => showDrawer("knn")}/>,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}>
                            <Meta
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="rn" bordered={false} extra={<a href="#">More</a>}
                            cover={
                                <img
                                  alt="example"
                                  src={require('./image_3.png')} 
                                  width= "auto" /* 设置宽度为200像素 */
                                  height= "300px" /* 让高度按比例自动调整 */
                                />
                              }    
                            actions={[
                                <VerticalAlignBottomOutlined key="setting" onClick={() => showDrawer("knn")}/>,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}>
                            <Meta
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="lr" bordered={false} extra={<a href="#">More</a>}
                            cover={
                                <img
                                  alt="example"
                                  src={require('./image_4.png')} 
                                  width= "auto" /* 设置宽度为200像素 */
                                  height= "300px" /* 让高度按比例自动调整 */
                                />
                              }    
                            actions={[
                                <VerticalAlignBottomOutlined key="setting" onClick={() => showDrawer("knn")}/>,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}>
                            <Meta
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
            <Drawer
        title="模型下发"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => form.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" onFinish={onSubmit} form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="分布式策略"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the type',
                  },
                ]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="MTCS">MTCS</Option>
                  <Option value="MOEA">MOEA</Option>
                  <Option value="NSGAII">NSGAII</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="建模目标"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the approver',
                  },
                ]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="performance">性能有限</Option>
                  <Option value="speed">速度有限</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
        </>


    )
};
export default withRouter(ModelManage);