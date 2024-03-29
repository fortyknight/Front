import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva'
import { withRouter } from 'umi';
import { Input, Row, Col, Button, Tooltip, Popover, Menu, Dropdown, Modal, List, message, Spin } from 'antd';
import Ellipsis from 'components/Ellipsis';

import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CaretDownOutlined
} from '@ant-design/icons';
import moment from 'moment';
import router from 'umi/router'
import { convertByteUnits, useWindowSize } from '@/utils/util';
import styles from './index.less'
import InfiniteScroll from 'react-infinite-scroller';
import { formatMessage } from 'umi-plugin-locale';
import { startCase } from 'lodash';
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
import { Layout } from 'antd';
import EquipmentModel from '../equipment/equipmentModel';
import EquipmentExample from '../equipment/equipmentExample';
import EquipmentGateway from '../equipment/equipmentGateway';

import ModelManage from '../modelCenter/modelManage.js';
import ModelTrain from '../modelCenter/modelTrain';

const { Header, Sider, Content, Footer, } = Layout;



const { Search } = Input;
const { confirm } = Modal;
const reg2 = /(?!^)(?=(\d{3})+$)/g;

const DatasetList = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector(state => state.datasetlist.data)
  const pagination = useSelector(state => state.datasetlist.pagination);
  const uniqueData = Array.from(new Set(data.map(JSON.stringify))).map(JSON.parse);

  useEffect(() => {
    dispatch({
      type: 'datasetlist/queryTableFirstPage',
      payload: {}
    })
  }, [dispatch]);
  const contentConfig = {
    c: (<EquipmentModel />),
    e: (<EquipmentExample />),
    f: (<EquipmentGateway />),
    d: (<ModelManage />),
    g: (<ModelTrain />),
  }
  const getNamePopoverContent = (record) => {
    const source_type_content = record.source_type === 'upload' ? `${formatMessage({ id: 'datasetlist.uploadFile' })}` : `${formatMessage({ id: 'datasetlist.systemImport' })}`
    return (
      <div>
        <p>
          <label style={{ fontWeight: 'bold' }}>{`${formatMessage({ id: 'datasetlist.name' })}`}：</label>
          <span>{record.name}</span>
        </p>
        <p>
          <label style={{ fontWeight: 'bold' }}>{`${formatMessage({ id: 'datasetlist.address' })}`}：</label>
          <span>{record.file_path}</span>
        </p>
        <p>
          <label style={{ fontWeight: 'bold' }}>{`${formatMessage({ id: 'datasetlist.date' })}`}：</label>
          <span>{moment(record.create_datetime).format('MMMM Do YYYY, h:mm:ss a')}</span>
        </p>
        <p>
          <label style={{ fontWeight: 'bold' }}>{`${formatMessage({ id: 'datasetlist.source' })}`}：</label>
          <span>{source_type_content}</span>
        </p>
      </div>
    )
  }

  const confirmDelete = (record) => {
    confirm({
      title: formatMessage({ id: 'datasetlist.confirm' }),
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: formatMessage({ id: 'datasetlist.ok' }),
      okType: 'danger',
      cancelText: formatMessage({ id: 'datasetlist.cancel' }),
      onOk() {
        dispatch({
          type: 'datasetlist/deleteRows',
          payload: {
            name: record.name
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleSearch = (e) => {
    dispatch({
      type: 'datasetlist/changeFilter',
      payload: {
        type: 'keyWords',
        value: e.target.value,
      },
    })
  }

  const handleExperimentsClick = (record) => {
    localStorage.setItem('tab', 'd');
    dispatch({
      type: 'train/save',
      payload: {
        defaultTab: 'd'
      }
    })
    router.push(`/lab?datasetName=${record.name}`)
  }

  const getOptionMenu = (record) => {
    return (
      <Menu>
        <Menu.Item>
          <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => confirmDelete(record)}>{formatMessage({ id: 'datasetlist.del' })}</span>
        </Menu.Item>
      </Menu>
    )
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a href='###' onClick={() => router.push('/uploadFile?sourceType=upload')}>
          {formatMessage({ id: 'datasetlist.upload' })}
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href='###' onClick={() => router.push('/importFile?sourceType=import')}>
          {formatMessage({ id: 'datasetlist.import' })}
        </a>
      </Menu.Item>
    </Menu>
  )

  const tableHeader = [
    {
      status: '',
      name: formatMessage({ id: 'datasetlist.name' }),
      rows: formatMessage({ id: 'datasetlist.rows' }),
      cols: formatMessage({ id: 'datasetlist.cols' }),
      size: formatMessage({ id: 'datasetlist.size' }),
      experimentTime: formatMessage({ id: 'datasetlist.time' }),
      date: formatMessage({ id: 'datasetlist.date' }),
      option: formatMessage({ id: 'datasetlist.option' })
    }
  ];
  const handleInfiniteOnLoad = () => {
    // setLoading(true);
    if (data.length >= pagination.total) {
      message.warning(formatMessage({ id: 'datasetlist.nomore' }));
      setHasMore(false);
      setLoading(false);
      return;
    }
    dispatch({
      type: 'datasetlist/queryTable',
      payload: {
        pagination: {
          current: pagination.current + 1
        }
      }
    })
  }

  const renderTableHeader = (item) => {
    return (
      <List.Item key={item.name} style={{ backgroundColor: 'rgb(249, 249, 249)', color: 'rgba(0,0,0,0.85)', fontWeight: 500 }}>
        <div className={styles.status}>{item.status}</div>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.rows}>{item.rows}</div>
        <div className={styles.cols}>{item.cols}</div>
        <div className={styles.fileSize}>{item.size}</div>
        <div className={styles.experimentTime}>{item.experimentTime}</div>
        <div className={styles.createTime}>{item.date}</div>
        <div className={styles.option}>{item.option}</div>
      </List.Item>
    )
  }
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('a');

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };
  const renderTableContent = (item) => {
    let status = null; // 状态
    const name = (
      <Popover content={getNamePopoverContent(item)} trigger='hover' placement='bottom'>
        <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => router.push(`/lab?datasetName=${item.name}`)}>
          <Ellipsis length={20}>
            {item.name}
          </Ellipsis>
        </span>
      </Popover>
    ); //
    const experimentTime = (
      <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => handleExperimentsClick(item)}>{item.n_experiments}</span>
    )

    const option = (
      <Dropdown overlay={getOptionMenu(item)} placement='bottomCenter'>
        <a>...</a>
      </Dropdown>
    )
    if (item.hints.length !== 0) {
      if (item.hints[0].type === 'Warning' || item.hints[0].type === 'Error') {
        if (item.hints.length === 0) {
          status = (
            <Tooltip title={item.hints[0].message} placement='bottom'>
              <ExclamationCircleOutlined style={{ fontSize: 20, color: 'rgb(255, 174, 43)' }} />
            </Tooltip>
          )
        } else {
          let messageArr = [];
          item.hints.forEach(hint => {
            messageArr.push(hint.message);
          })
          const message = messageArr.join(', ');
          status = (
            <Tooltip title={message} placement='bottom'>
              <ExclamationCircleOutlined style={{ fontSize: 20, color: 'rgb(255, 174, 43)' }} />
            </Tooltip>
          )
        }
      }
    } else {
      status = (
        <span><CheckCircleOutlined style={{ fontSize: 20, color: 'green' }} /></span>
      )
    }
    return (
      <List.Item>
        <div className={styles.status}>{status}</div>
        <div className={styles.name}>{name}</div>
        <div className={styles.rows}>{String(item.n_rows).replace(reg2, ',')}</div>
        <div className={styles.cols}>{item.n_cols}</div>
        <div className={styles.fileSize}>{convertByteUnits(item.file_size)}</div>
        <div className={styles.experimentTime}>{experimentTime}</div>
        <div className={styles.createTime}>{moment(item.create_datetime).fromNow()}</div>
        <div className={styles.option}>{option}</div>
      </List.Item>
    )
  }
  const { SubMenu } = Menu;
  return (
    // <>
    //   <div>
    //   <Row>
    //     <Col span={12}>
    //       <Search
    //         placeholder={formatMessage({ id: 'datasetlist.placeholder'})}
    //         onChange={(e) => handleSearch(e)}
    //         style={{ width: 300 }}
    //       />
    //     </Col>
    //     <Col span={12}>
    //       <Dropdown overlay={menu} placement='bottomRight' arrow>
    //         <Button style={{ float: 'right' }} type="primary">{formatMessage({id: 'datasetlist.new'})}<CaretDownOutlined /></Button>
    //       </Dropdown>
    //     </Col>
    //   </Row>
    //   <Row style={{ marginTop: 16 }}>
    //     <Col span={24}>
    //       <List
    //         dataSource={tableHeader}
    //         renderItem={(item) => renderTableHeader(item)}
    //       />
    //       <div className={styles.infiniteContainer} style={{ height: useWindowSize().innerHeight - 220 }}>
    //         <InfiniteScroll
    //           initialLoad={false}
    //           pageStart={0}
    //           loadMore={handleInfiniteOnLoad}
    //           hasMore={!loading && hasMore}
    //           useWindow={false}
    //         >
    //           <List
    //             dataSource={uniqueData}
    //             renderItem={(item) => renderTableContent(item)}
    //           />
    //           {/* {
    //             loading && hasMore && (
    //             <div className={styles.loadingContainer}>
    //               <Spin />
    //             </div>
    //           )} */}
    //         </InfiniteScroll>
    //       </div>
    //     </Col>
    //   </Row>
    //   </div>
    // </>
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} style={{ marginLeft: '-30px', marginTop: '-30px', backgroundColor: '#EFF4F8', color: '#000000' }}>
        <div className="logo" />
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
          style={{ backgroundColor: '#EFF4F8' }}
        >
          <Menu.Item key="a" icon={<FolderOutlined />} label="nav 1">
            数据集管理
          </Menu.Item>

          <SubMenu key="b" icon={<BarChartOutlined />} title="边缘设备" style={{ backgroundColor: '#EFF4F8' }}>
            <Menu.Item key="c" style={{ backgroundColor: '#EFF4F8', }}>设备型号</Menu.Item>
            <Menu.Item key="e" style={{ backgroundColor: '#EFF4F8' }}>设备实例</Menu.Item>
          </SubMenu>

          <SubMenu key="h" icon={<DotChartOutlined />} title="模型中心  " style={{ backgroundColor: '#EFF4F8' }}>
            <Menu.Item key="d" style={{ backgroundColor: '#EFF4F8', }}>模型管理</Menu.Item>
            <Menu.Item key="g" style={{ backgroundColor: '#EFF4F8' }}>模型训练</Menu.Item>
          </SubMenu>

          <Menu.Item key="f" icon={<RadarChartOutlined />} label="nav 1" onClick={() => window.location.href = 'http://119.3.238.154:3000/'}>
            云-边-端数据治理引擎
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ backgroundColor: '#EFF4F8', marginTop: '-25px', width: '100vh', height: '100vh' }}>


        <Content
          className="site-layout-background"
          style={{
            marginTop: '30px',
            marginLeft: '-150px',
            minHeight: 980,
          }}
        >
          {selectedKey === 'a' ?
            <>
              <div style={{ marginLeft: '170px' }}>
                <Row>
                  <Col span={12}>
                    <Search
                      placeholder={formatMessage({ id: 'datasetlist.placeholder' })}
                      onChange={(e) => handleSearch(e)}
                      style={{ width: 300, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                    />
                  </Col>
                  <Col span={12}>
                    <Dropdown overlay={menu} placement='bottomRight' arrow>
                      <Button style={{ float: 'right' }} type="primary">{formatMessage({ id: 'datasetlist.new' })}<CaretDownOutlined /></Button>
                    </Dropdown>
                  </Col>
                </Row>
                <Row style={{ marginTop: 16 }}>
                  <Col span={24}>
                    <List
                      dataSource={tableHeader}
                      renderItem={(item) => renderTableHeader(item)}
                      style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                    />
                    <div className={styles.infiniteContainer} style={{ height: '200px' }}>
                      <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={handleInfiniteOnLoad}
                        hasMore={!loading && hasMore}
                        useWindow={false}
                      >
                        <List
                          dataSource={uniqueData}
                          renderItem={(item) => renderTableContent(item)}
                          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                        />
                        {/* {
                  loading && hasMore && (
                  <div className={styles.loadingContainer}>
                    <Spin />
                  </div>
                )} */}
                      </InfiniteScroll>
                    </div>
                  </Col>
                </Row>
              </div>
            </> : <></>
          }
          {contentConfig[selectedKey]}

        </Content>
      </Layout>
    </Layout>
  )
}

export default withRouter(DatasetList);
