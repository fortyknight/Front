import { divide } from "lodash"
import { withRouter } from 'umi';
import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Button, Drawer,Statistic,Tag } from 'antd';
import DeviceList from "./deviceList";
import { CheckCircleTwoTone, CloseCircleTwoTone, QuestionCircleTwoTone } from '@ant-design/icons'

const { Search } = Input;

const EquipmentExample = ()=>{
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    return(
        <div style={{marginTop:'10px',marginLeft:'200px'}}>
          <div style={{marginBottom:'30px'}}>
          <Row gutter={16}>
    <Col span={6}>
      <Statistic title="全部设备" value={0} />
    </Col>
    <Col span={6}>
    <div style={{ display: 'flex', }}>
    <CheckCircleTwoTone twoToneColor="green" style={{marginTop:'-40px',marginRight:'10px'}}/>
          <Statistic title="在线" value={0} />
        </div>
    </Col>
    <Col span={6}>
    <div style={{ display: 'flex', }}>
    <CloseCircleTwoTone twoToneColor="red" style={{marginTop:'-40px',marginRight:'10px'}}/>
      <Statistic title="离线" value={0}  />
      </div>
    </Col>
    <Col span={6}>
    <div style={{ display: 'flex', }}>
    <QuestionCircleTwoTone  style={{marginTop:'-40px',marginRight:'10px'}}/>
      <Statistic title="未启用" value={0}  />
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
         <div style={{marginTop:'30px'}}>         <Button type="primary" onClick={showDrawer}>
         添加设备
       </Button></div>

       <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
         <p>Some contents...</p>
         <p>Some contents...</p>
         <p>Some contents...</p>
       </Drawer>
       <div style={{marginTop:'20px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}><DeviceList/></div>
               </div>
 
     )
    
}

export default withRouter(EquipmentExample);