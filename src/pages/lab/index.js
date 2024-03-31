import React, { useState, useEffect } from 'react';
import { Breadcrumb, Form, Input, Card, Button, Radio } from 'antd';
import { connect } from 'dva';
import { withRouter } from 'umi';
import Preview from '@/pages/common/previewDataset';
import Explore from '@/pages/common/exploreDataset';
import Train from './_components/train';
import Center from './_components/center';
import styles from './index.less';
import { formatMessage } from 'umi-plugin-locale';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarChartOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarsOutlined,
  ControlOutlined,
  FolderOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Header, Sider, Content,Footer, } = Layout;

const Lab = ({ dispatch, location: { query: { datasetName } }, train: { defaultTab } }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('b');

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const contentConfig = {
    a: (<Preview datasetName={datasetName}/>),
    b: (<Explore datasetNameFromParam={datasetName} isTemporary={false}/>),
    c: (<Train />),
    d: (<Center />),
  }

  const [form] = Form.useForm();
  useEffect(() => {
    const tab = localStorage.getItem('tab') || defaultTab
    dispatch({
      type:'train/save',
      payload:{
        defaultTab:tab
      }
    })
  }, [])
  const datasetNameHtml = (
    <>
      <Form.Item style={{ float: 'left', marginRight: 10, marginTop: 20, visibility: 'hidden'}} name="datasetName" label="数据集名称">
        <Input />
      </Form.Item>
      <Button style={{float: 'right', marginTop: 20, visibility: 'hidden' }} type="primary">创建</Button>
    </>
  );
  const handleTitleChange = (e) => {
    localStorage.setItem('tab', e.target.value)
    dispatch({
      type:'train/save',
      payload:{
        defaultTab:e.target.value
      }
    })
  }
  const { SubMenu } = Menu;

  return (
    // <Form
    //   form={form}
    //   initialValues={
    //     {
    //       n_rows: 1000
    //     }
    //   }
    // >
    //   <div className={styles.breadcrumb}>
    //     <Breadcrumb>
    //       <Breadcrumb.Item>
    //         <a href="/">{formatMessage({id: 'extra.dataset'})}</a>
    //       </Breadcrumb.Item>
    //       <Breadcrumb.Item>{formatMessage({id: 'extra.explore'})}</Breadcrumb.Item>
    //       <Breadcrumb.Item>{datasetName}</Breadcrumb.Item>
    //     </Breadcrumb>

    //   </div>
    //   <Card title={title} extra={datasetNameHtml}>
    //     {contentConfig[defaultTab]}
    //   </Card>
    // </Form>
    <Layout>
    <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value) } 
    style={{marginLeft:'-30px',marginTop:'-30px',backgroundColor: '#EFF4F8'}}>
      <div className="logo" />
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => handleMenuClick(key)}
        style={{ backgroundColor: '#EFF4F8' }}
      >
        <Menu.Item key="a" icon={<FolderOutlined />} label="nav 1">
        {formatMessage({id: 'extra.preview'})}
        </Menu.Item>

        <Menu.Item key="b" icon={<BarChartOutlined />} label="nav 2">
        {formatMessage({id: 'extra.dataExplore'})}
        </Menu.Item>
        <Menu.Item key="c" icon={<ControlOutlined />} label="nav 3">
        {formatMessage({id: 'extra.train'})}
        </Menu.Item>
        <Menu.Item key="d" icon={<BarsOutlined />} label="nav 4">
          {formatMessage({id: 'extra.center'})}
        </Menu.Item>
      </Menu>
    </Sider>
    <div className={styles.breadcrumb} style={{marginTop:'-20px',marginLeft:'20px'}}>
      <Breadcrumb>
         <Breadcrumb.Item>
          <a href="/">{formatMessage({id: 'extra.dataset'})}</a>
        </Breadcrumb.Item>
          <Breadcrumb.Item>{formatMessage({id: 'extra.explore'})}</Breadcrumb.Item>
         <Breadcrumb.Item>{datasetName}</Breadcrumb.Item>
        </Breadcrumb>

      </div>
    <Layout className="site-layout">


      <Content
        className="site-layout-background"
        style={{
          marginTop:'30px',
          marginLeft:'-150px',
          minHeight: 980,
        }}
      >
        {contentConfig[selectedKey]}
      </Content>
    </Layout>
  </Layout>
  );
}
export default withRouter(connect(({ dataset, train }) => (
  { dataset, train }
))(Lab));
