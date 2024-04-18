import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'antd';
import { Empty, Typography } from 'antd';
import { withRouter } from 'umi';
import { Button, Select,  Space, Card } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { DatePicker, TimePicker } from 'antd';
import { makeToolTipFromMsgId } from '@/utils/util';
import LabelChart from '@/pages/lab/_components/LabelChart/index.js';
import {  Col, Form, InputNumber,  Row, Slider } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import styles from '@/pages/lab/index.less';
import { CookaSlider } from 'components';
import { PartitionStrategy, PartitionClass, FeatureType } from '@/pages/common/appConst';


const { Title, Text } = Typography;
const { Option } = Select;
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
const data = [
  {
    action: '浏览网站',
    pv: 50000,
  },
  {
    action: '放入购物车',
    pv: 35000,
  },
  {
    action: '生成订单',
    pv: 25000,
  },
  {
    action: '支付订单',
    pv: 15000,
  },
  {
    action: '完成交易',
    pv: 8500,
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
<div style={{ backgroundColor: '#ffffff',maxWidth:'900px' ,marginLeft:'50px',marginTop:'50px'}}>
<div style={{ marginLeft:'30px',paddingTop:'20px' }}>
  <Title level={4}>目标列</Title>
  

  <Select placeholder="选择一个目标列来进行训练" options={options1} style={{ width: 300 }} />
  <Button  style={{marginLeft:'10px'}}type="primary">训练</Button>
  </div>
  

  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px', paddingTop: '20px' }}>
  <Title level={4} style={{ marginRight: '5px' }}>任务类型</Title>
  {makeToolTipFromMsgId('将创建多分类任务')}
</div>
<LabelChart labelType={'labelType'} labelData={data} style={ {width: 3500 }} />
  <div className='container' style={{ marginLeft: '30px', paddingTop: '20px'}}>
    <div className='modelWrapper' style={{ display: 'inline-block', marginRight: '100px'}}>
      <dl className='model'>
        <dt style={{ color: '#113D95', fontSize: '18px' }}>
          模型
        </dt>
        <dd>
          <Select placeholder="选择一个模型" options={options2} style={{ width: 200 }} />
        </dd>
      </dl>
    </div>
    <div className='modelWrapper' style={{ display: 'inline-block', marginRight: '60px'}}>
      <dl className='model'>
        <dt style={{ color: '#113D95', fontSize: '18px' }}>
          分布式策略
        </dt>
        <dd>
          <Select placeholder="选择一个策略" options={options3} style={{ width: 200 }} />
        </dd>
      </dl>
    </div>
    <div className='modelWrapper' style={{ display: 'inline-block', marginRight: '60px'}}>
      <dl className='model'>
        <dt style={{ color: '#113D95', fontSize: '18px' }}>
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
<div style={{ marginLeft: '30px', paddingTop: '20px'}}>
<Title level={4}>数据拆分</Title>
  <Card title='验证集-训练集-测试集' style={{ width: '60%', marginLeft: '30px', paddingTop: '10px' }}>
    <div>
    </div>
  </Card>
</div>

  <div style={{ marginLeft: '30px', paddingTop: '20px'}}>

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
    
  </div>
</div>
    )
};
export default withRouter(ModelTrainDesign);