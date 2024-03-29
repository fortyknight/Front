import { Layout, ConfigProvider } from 'antd';
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

import { ServiceException, TYPE_DEFAULT_ERROR }  from '@/exception';

const { Header, Content, Footer } = Layout;

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
  return (
    <ConfigProvider locale={currentLocal}>
      <Layout className={styles.wrapper} >
        <Header className={styles.header}style={{backgroundColor: '#EFF4F8'}} >
        <link rel="icon" type="image/png" href="src/assets/ices.png" />
          <div className={styles.logo} style={{
    cursor: 'pointer',
    fontSize: '25px', 
    color: '#242E42', 
    fontWeight: 'bold', 
    marginLeft:'720px',
    display: 'flex',
  alignItems: 'center',
  marginLeft:'620px'
  }} >
            <p onClick={ () => window.location.href = '/' }>集团企业数字化与智能化协同管控平台</p>

    {/* <Button type="primary" ghost style={{ marginLeft: '10px',marginTop:'-20px' }}
    onClick={() => window.location.href = 'http://192.168.1.104:14445'}>
      资源监控
    </Button> */}
    

          </div>
          {<div className={styles.doc}>{formatMessage({id: 'extra.doc'})}</div>}
        </Header>
        <hr style={{ width: '100%', height: '1px', backgroundColor: '#ccc', margin: '10px 0' }} />
        <Content className={styles.content}>{props.children}</Content>
      </Layout>
    </ConfigProvider>
  );
}

export default BasicLayout;
