import { withRouter } from 'umi';

import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { Input, Button, Drawer, Dropdown, Avatar, Skeleton } from 'antd';
import { DatePicker, Form, Select, Space } from 'antd';
import axios from 'axios';
import styles from './index.less'

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
    const [data, setData] = useState([]);
    const [dataset, setDataset] = useState([]);
    const [modelParams, setModelParams] = useState([]);
    const [record, setRecord] = useState(null);
    const [type,setType] = useState(null);
    const [cpu,setCpu] = useState(null);
    const [memory,setMemory] = useState(null)
;    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response_1 = await axios.get('/api/model/model-list');
            setData(response_1.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const { Option } = Select;
    const showDrawer = async (record) => {
        console.log('record',record)
        setRecord(record.id);
        setCpu(record.cpu);
        setMemory(record.memory);
        setType(record.type);
        const response_1 = await axios.get('/api/model/param', {
            params: {
                model_id: record.id,
            },
        });
        const response_2 = await axios.get('/api/dataset');

        setModelParams(response_1.data.data.params);
        setDataset(response_2.data.data['datasets'])
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const onFinish = (values) => {
        const model_param_list = modelParams.map(param => ({
            param_name: param.param_name,
            param_value: values[`param_${param.id}`],
        }));
        const taskValues = {
            model_id: record,
            dataset_name: values.dataset,
            task_name: values.name,
            model_param_list,
        };
        axios.post('/api/task', taskValues) // 将数据提交到后端
        .then((response) => {
          onClose(); // 关闭抽屉
        })
        .catch((error) => {
          console.error(error);
        });
    };




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
                    
                        <Button style={{ float: 'right' }} type="text" ></Button>
                        数量：{data.length}
                    </Col>
                    {/* <Col>
                        <Button type="primary" icon={<PlusOutlined />}>
                            新建
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" danger>
                            删除
                        </Button>
                    </Col> */}
                </Row>



                <Row gutter={16}>
                    {data.map((item, index) => (
                        <Col key={index} span={8}>
                            <Card
                                title={item.chinese_name}
                                bordered={false}
                                extra={<a href="#">More</a>}
                                cover={
                                    <img
                                        alt="example"
                                        src={require('./image_' + (index + 1) + '.png')}
                                        width="auto"
                                        height="300px"
                                    />
                                }
                                actions={[
                                    <VerticalAlignBottomOutlined key="setting" onClick={() => showDrawer(item)} />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    description={item.description}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <Drawer
                title={<div style={{ fontSize: '24px' }}>模型下发</div>}
                width={720}
                onClose={onClose}
                visible={open}
                styles={{
                    body: {
                        paddingBottom: 50,
                    },
                    
                }}
                titleStyle={{ fontSize: '30px' }}
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label={<label style={{ fontSize: '20px' }}>任务名称</label>}

                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose the data',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                        fontSize: '15px',
                                    }}
                                    placeholder={`Please enter task name`}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="dataset"
                                label={<label style={{ fontSize: '20px' }}>数据集</label>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose the data',
                                    },
                                ]}
                            >
                                <Select placeholder="Please choose the dataset" style={{
                                        width: '100%',
                                        fontSize: '18px',
                                    }}>
                                    {dataset.map((dataset, index) => (
                                        <Option value={dataset.name}>{dataset.name}</Option>
                                    ))}

                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>


                    {/* {modelParams.length > 0 ? (
                        modelParams.map((param, index) => (
                            <Row key={index} gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name={`param_${param.id}`}
                                        label={param.param_name}
                                        rules={[
                                            {
                                                required: false,
                                                message: `Please enter ${param.param_name}`,
                                            },
                                        ]}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Input
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder={`Please enter ${param.param_name}`}
                                            />
                                            <div className={styles['item-hints']} style={{ position: 'relative' }}>
                                                <div className={styles.hint} data-position="4">
                                                    <span className={styles['hint-radius']}></span>
                                                    <span className={styles['hint-dot']}>Tip</span>
                                                    <div className={`${styles['hint-content']} ${styles['do--split-children']}`}>
                                                        <p>{param.param_notice}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Form.Item>
                                </Col>
                            </Row>
                        ))
                    ) : null} */}
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
    )
};
export default withRouter(ModelManage);