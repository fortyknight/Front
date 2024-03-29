import { withRouter } from 'umi';
import {
    RadarChartOutlined, 
    AlignLeftOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';

const items = [
    {
        label: '实验设计',
        key: 'mail',
        icon: <RadarChartOutlined />,
    },
    {
        label: '实验列表',
        key: 'app',
        icon: <AlignLeftOutlined />,
    },
];

const { Header, Sider, Content } = Layout;
const ModelTrain = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <>
            <div style={{ marginLeft: '170px' }}>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </div>
        </>
    );
};
export default withRouter(ModelTrain);