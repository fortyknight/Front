import { withRouter } from 'umi';
import {
    RadarChartOutlined,
    AlignLeftOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';

import ModelTrainList from '../modelCenter/modelTrainList.js';
import ModelTrainDesign from '../modelCenter/modelTrainDesign.js';

const items = [
    {
        label: '实验设计',
        key: 'design',
        icon: <RadarChartOutlined />,
// 添加组件属性来关联对应的组件
    },
    {
        label: '实验列表',
        key: 'list',
        icon: <AlignLeftOutlined />,
    },
];

const { Header, Sider, Content } = Layout;
const contentConfig = {
    design: (<ModelTrainDesign />),
    list: (<ModelTrainList />),
}
const ModelTrain = () => {
    const [current, setCurrent] = useState('design');
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
                <Content
                    style={{
                        marginTop: '10px',
                        marginLeft: '10px',
                    }}
                >
                    {contentConfig[current]}
                </Content>
            </div>
            <Content>
                {getCurrentComponent()}  
            </Content>
        </>
    );
};
export default withRouter(ModelTrain);