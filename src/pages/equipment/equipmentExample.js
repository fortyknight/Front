import { divide } from "lodash"
import { withRouter } from 'umi';
import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Button, Drawer,Statistic,Tag } from 'antd';
import DeviceList from "./deviceList";
import { CheckCircleTwoTone, CloseCircleTwoTone, QuestionCircleTwoTone } from '@ant-design/icons';
import AddData from "./addData";
import axios from 'axios';

const { Search } = Input;

const EquipmentExample = ()=>{
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    }; 
    const [data, setData] = useState([]);
     useEffect(() => {
      fetchData();
    }, []);
    
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/internet'); // 根据你的后端 API 路由进行相应的修改
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    const tagCounts = {
      '未启用': 0,
      '在线': 0,
      '离线': 0
    };
    
    data.forEach(item => {
      const tags = item.tags;
      
      tags.forEach(tag => {
        if (tag === '未启用') {
          tagCounts['未启用']++;
        } else if (tag === '在线') {
          tagCounts['在线']++;
        } else if (tag === '离线') {
          tagCounts['离线']++;
        }
      });
    });
    console.log('cx',tagCounts)

    return(
        <div style={{marginTop:'10px',marginLeft:'200px'}}>
          <div style={{marginBottom:'30px'}}>
          <Row gutter={16}>
    <Col span={6}>
      <Statistic title="全部设备" value={data.length} />
    </Col>
    <Col span={6}>
    <div style={{ display: 'flex', }}>
    <CheckCircleTwoTone twoToneColor="green" style={{marginTop:'-40px',marginRight:'10px'}}/>
          <Statistic title="在线" value={tagCounts['在线']} />
        </div>
    </Col>
    <Col span={6}>
    <div style={{ display: 'flex', }}>
    <CloseCircleTwoTone twoToneColor="red" style={{marginTop:'-40px',marginRight:'10px'}}/>
      <Statistic title="离线" value={tagCounts['离线']}  />
      </div>
    </Col>
    <Col span={6}>
    <div style={{ display: 'flex', }}>
    <QuestionCircleTwoTone  style={{marginTop:'-40px',marginRight:'10px'}}/>
      <Statistic title="未启用" value={tagCounts['未启用']}  />
      </div>
    </Col>

  </Row>
          </div>

         <Row>
         <Col span={12}>
             
             <div>设备ID:</div>
           </Col>
           <Col span={12} style={{marginLeft:'70px',marginTop:'-29px'}}>
             
             <Search
               placeholder={'请输入'}
             
               style={{ width: 300 ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}
             />
           </Col>
        
         </Row>
      
      <AddData ></AddData>

       {/* <Drawer title="数据接入" placement="right" onClose={onClose} open={open}>
       <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' ,whiteSpace: 'nowrap'}}>
    <span style={{ marginRight: '20px', fontWeight: 'bold' }}>接入网关名称：</span>
    <Input placeholder="接入网关名称" variant="filled"  style={{ borderColor: 'black' }} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' ,whiteSpace: 'nowrap'}}>
    <span style={{ marginRight: '8px', fontWeight: 'bold' }}>数据来源：</span>
    <Input placeholder="数据来源" variant="filled"  style={{ borderColor: 'black' }} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' ,whiteSpace: 'nowrap'}}>
    <span style={{ marginRight: '8px', fontWeight: 'bold' }}>服务器地址：</span>
    <Input placeholder="服务器地址" variant="filled"  style={{ borderColor: 'black' }} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' ,whiteSpace: 'nowrap'}}>
    <span style={{ marginRight: '8px', fontWeight: 'bold' }}>服务器端口：</span>
    <Input placeholder="服务器端口" variant="filled"  style={{ borderColor: 'black' }} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' ,whiteSpace: 'nowrap'}}>
    <span style={{ marginRight: '8px', fontWeight: 'bold' }}>描述：</span>
    <Input placeholder="描述" variant="filled"  style={{ borderColor: 'black' }} />
  </div>
  <div style={{ display: 'flex',marginTop:'50px' }}>
  <Button  style={{ marginLeft: '20px', borderRadius: '5px' }}
   onClick={onClose}>取消</Button>
  <Button type="primary" style={{ marginLeft: '160px', borderRadius: '5px' }}>提交</Button>
</div>
       </Drawer> */}
       <div style={{marginTop:'20px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}><DeviceList/></div>
               </div>
 
     )
    
}

export default withRouter(EquipmentExample);