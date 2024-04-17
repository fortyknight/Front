import { Layout, ConfigProvider } from 'antd';
import React, { useState, useEffect } from 'react';
import request from '@/utils/request';
import { setLocale } from 'umi-plugin-react/locale';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import { getLocale } from 'umi-plugin-react/locale';
import router from 'umi/router'
import styles from './index.less';
import moment from 'moment';
import logo from '../assets/logo.png'
import { formatMessage } from 'umi-plugin-locale';
import { getSystemConfig } from '@/services/systemConfig';
import { showNotification } from '@/utils/notice';
import { Button, Flex } from 'antd';
import { Input, Row, Col,  Tooltip, Popover, Menu, Dropdown, Modal, List, message, Spin } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarChartOutlined,
  RadarChartOutlined,
  DotChartOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarsOutlined,
  ControlOutlined,
  FolderOutlined
} from '@ant-design/icons';

import { ServiceException, TYPE_DEFAULT_ERROR }  from '@/exception';
import { Link } from 'react-router-dom';

const { Header, Content, Footer,Sider } = Layout;

let currentLocal = zhCN;

request.get('/api/sysconfig').then((originRes) => {

  if (originRes == null){
    throw ServiceException(TYPE_DEFAULT_ERROR, "Read system config error, response is null ")
  }

  const res = originRes.data;

  if (res.LANG === 'use_client') {
    localStorage.setItem('intlLang', navigator.language)
    if (navigator.language === 'zh-CN') {
      currentLocal = zhCN;
      setLocale('zh-CN');
      moment.locale('zh-cn');
    } else {
      console.warn("Not zh_CN language ,use english. ");
      currentLocal = enUS;
      setLocale('en-US');
      moment.locale('en-us');
    }
  } else if (res?.LANG === 'zh_CN') {
    localStorage.setItem('intlLang','zh');
    currentLocal = zhCN;
    setLocale('zh-CN');
    moment.locale('zh-cn');
  } else if (res?.LANG === 'en_US') {
    localStorage.setItem('intlLang','en');
    currentLocal = enUS;
    setLocale('en-US');
    moment.locale('en');
  }
});

function BasicLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
const { SubMenu } = Menu;
const [selectedKey, setSelectedKey] = useState('a');
const handleMenuClick = (key) => {
  setSelectedKey(key);
};
return (
  <ConfigProvider locale={currentLocal}>
    <Layout className={styles.wrapper} style={{ backgroundColor: '#EFF4F8',height:'100%'}}>
      <Header className={styles.header} style={{ backgroundColor: '#EFF4F8' }}>
        <link rel="icon" type="image/png" href="src/assets/ices.png" />
        <div className={styles.logo} style={{ cursor: 'pointer', fontSize: '25px', color: '#242E42', fontWeight: 'bold', display: 'flex', alignItems: 'center',marginLeft:'700px' }}>
          <p onClick={() => window.location.href = '/'}>集团企业数字化与智能化协同管控平台</p>
        </div>
        {<div className={styles.doc}>{formatMessage({ id: 'extra.doc' })}</div>}
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} style={{ backgroundColor: '#EFF4F8', color: '#000000' }}>
          <div className="logo" />
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => handleMenuClick(key)}
            style={{ backgroundColor: '#EFF4F8' }}
          >
            <Menu.Item key="a" icon={<FolderOutlined />} label="nav 1">
            <Link to="/datasetList">数据集管理</Link>
            </Menu.Item>

            <SubMenu key="b" icon={<BarChartOutlined />} title="边缘设备" style={{ backgroundColor: '#EFF4F8' }}>
              <Menu.Item key="c" style={{ backgroundColor: '#EFF4F8' }}><Link to="/equipment/equipmentModel">设备型号</Link></Menu.Item>
              
              <Menu.Item key="e" style={{ backgroundColor: '#EFF4F8' }}><Link to="/equipment/equipmentExample">设备实例</Link></Menu.Item>
            </SubMenu>

            <SubMenu key="h" icon={<DotChartOutlined />} title="模型中心" style={{ backgroundColor: '#EFF4F8' }}>
              <Menu.Item key="d" style={{ backgroundColor: '#EFF4F8' }}><Link to="/modelCenter/modelManage">模型管理</Link></Menu.Item>
              <Menu.Item key="g" style={{ backgroundColor: '#EFF4F8' }}><Link to="/modelCenter/modelTrain">模型训练</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="i" icon={<BarChartOutlined />} title="数字孪生" style={{ backgroundColor: '#EFF4F8' }}>
            数字孪生
            </Menu.Item>

            <Menu.Item key="f" icon={<RadarChartOutlined />} label="nav 1" onClick={() => window.location.href = 'http://119.3.238.154:3000/'}>
              云-边-端数据治理引擎
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content className={styles.content } style={{marginTop:'0px',backgroundColor: '#EFF4F8',height: '100%'}}>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  </ConfigProvider>
);
}

export default BasicLayout;
