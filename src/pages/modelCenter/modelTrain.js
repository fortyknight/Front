import { withRouter } from 'umi';
import {
    RadarChartOutlined, 
    AlignLeftOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import Train from '../lab/_components/train'
import lab from '../lab';

const items = [
    {
        label: '实验设计',
        key: 'mail',
        icon: <RadarChartOutlined />,
// 添加组件属性来关联对应的组件
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
    const getCurrentComponent = () => {
        const menuItem = items.find(item => item.key === current);
        return menuItem ? menuItem.component : null;
    };
    return (
        <>
            <div style={{ marginLeft: '170px' }}>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </div>
            <Content>
                {getCurrentComponent()}  
            </Content>
        </>
    );
};
export default withRouter(ModelTrain);