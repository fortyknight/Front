import { withRouter } from 'umi';

import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { Input, Button, Drawer, Dropdown, Avatar, Skeleton } from 'antd';

import {
    PlusOutlined,
    RedoOutlined,
    EllipsisOutlined,
    SettingOutlined,
    EditOutlined
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
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
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
                        <Button style={{ float: 'right' }} type="text" icon={<RedoOutlined />}></Button>
                        数量：2
                    </Col>
                    <Col>
                        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
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
                        <Card title="mlpclassifier" bordered={false} extra={<a href="#">More</a>}
                            cover={
                                <img
                                  alt="example"
                                  src="https://ipfs.pixura.io/ipfs/QmfTpSaMLYCVZxE4ve7FSANT3qX6P3h1H8SEnEq7ZH6LWa/gps-thumb.jpg"
                                  width= "auto" /* 设置宽度为200像素 */
                                  height= "300px" /* 让高度按比例自动调整 */
                                />
                            }    
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}>
                            <Meta
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="KNN" bordered={false} extra={<a href="#">More</a>}
                            cover={
                                <img
                                  alt="example"
                                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                  width= "auto" /* 设置宽度为200像素 */
                                  height= "300px" /* 让高度按比例自动调整 */
                                />
                              }    
                            actions={[
                                <SettingOutlined key="setting" />,
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
        </>


    )
};
export default withRouter(ModelManage);