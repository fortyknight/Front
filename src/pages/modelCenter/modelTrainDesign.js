import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'antd';
import { Empty, Typography } from 'antd';
import { withRouter } from 'umi';
import { Button, Input, Select, Dropdown, Space, message, Card } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { DatePicker, TimePicker } from 'antd';

const { Option } = Select;
const { Title, Text } = Typography;
const PickerWithType = ({ type, onChange }) => {
    if (type === 'time') return <TimePicker onChange={onChange} />;
    if (type === 'date') return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
};
const options1 = [
    {
        value: 'square',
        label: '面积',
    },
    {
        value: 'rooms',
        label: '房间数',
    },
    {
        value: 'price',
        label: '价格',
    }
];
const options2 = [
    {
        label: 'HyberGBM',
        value: '1',
    },
    {
        label: 'RL-HMAAC',
        value: '2'
    },
    {
        label: 'Gtr—TLX',
        value: '3'
    },
];
const options3 = [
    {
        label: 'mcts',
        value: '1',
    },
    {
        label: 'mips',
        value: '2'
    },
    {
        label: 'tsm',
        value: '3'
    },
];



const ModelTrainDesign = () => {
    const [value, setValue] = useState(1);
    const [type, setType] = useState('time');
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <>
            <Title level={4}>目标列</Title>

            <Select placeholder="选择一个目标列来进行训练" options={options1} style={{ width: 300 }} />
            <Button type="primary">训练</Button>

            <div style={{
                marginTop: '10px',
            }}>
                <Title level={4} >任务类型</Title>
            </div>
            <Text type="secondary">将创建多分类任务</Text>
            <Empty />
            <div className='container' style={{ marginLeft: '10px', marginTop: '20px' }}>
                <div className='modelWrapper' style={{ display: 'inline-block', marginRight: '100px'}}>
                    <dl className='model'>
                        <dt style={{ color: '#113D95', fontSize: '18px', }}>
                            模型
                        </dt>
                        <dd>
                            <Select placeholder="选择一个模型" options={options2} style={{ width: 300 }} />
                        </dd>
                    </dl>
                </div>
                <div className='modelWrapper' style={{ display: 'inline-block', marginRight: '100px'}}>
                    <dl className='model'>
                        <dt style={{ color: '#113D95', fontSize: '18px', }}>
                            分布式策略
                        </dt>
                        <dd>
                            <Select placeholder="选择一个策略" options={options3} style={{ width: 300 }} />
                        </dd>
                    </dl>
                </div>
                <div className='modelWrapper' style={{ display: 'inline-block', marginRight: '100px'}}>
                    <dl className='model'>
                        <dt style={{ color: '#113D95', fontSize: '18px', }}>
                            训练模式
                        </dt>
                        <dd>
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={1}>快速</Radio>
                                <Radio value={2}>性能</Radio>
                            </Radio.Group>
                        </dd>
                    </dl>
                </div>
            </div>

            <Title level={4}>数据拆分</Title>
            <Card title='验证集-训练集-测试集' style={{ width: '60%', marginLeft: '30px', paddingTop: '10px' }}>
                <div>
                    
                </div>
            </Card>

            <Title level={4}>日期列</Title>
            <Space>
                <Select value={type} onChange={setType}>
                    <Option value="time">Time</Option>
                    <Option value="date">Date</Option>
                    <Option value="week">Week</Option>
                    <Option value="month">Month</Option>
                    <Option value="quarter">Quarter</Option>
                    <Option value="year">Year</Option>
                </Select>
                <PickerWithType type={type} onChange={(value) => console.log(value)} />
            </Space>
        </>
    )
};
export default withRouter(ModelTrainDesign);