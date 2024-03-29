import { divide } from "lodash"
import { withRouter } from 'umi';
import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Button, Drawer } from 'antd';
import EquipmentList from "./equipmentList";
import EquipmentExample from "./equipmentExample";
const { Search } = Input;

const EquipmentModel = ()=>{
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    return(
        <div style={{marginTop:'10px',marginLeft:'200px'}}>
         <Row>
         <Col span={12}>
             
             <div>型号名称:</div>
           </Col>
           <Col span={12} style={{marginLeft:'70px',marginTop:'-29px'}}>
             
             <Search
               placeholder={'请输入'}
             
               style={{ width: 300 ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}
             />
           </Col>
        
         </Row>
         <div style={{marginTop:'10px'}}>         <Button type="primary" onClick={showDrawer}>
         新建
       </Button></div>

       <Drawer title="新建设备" placement="right" onClose={onClose} open={open}>
       <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' ,whiteSpace: 'nowrap'}}>
    <span style={{ marginRight: '20px', fontWeight: 'bold' }}>设备ID：</span>
    <Input placeholder="设备ID" variant="filled"  style={{ borderColor: 'black' }} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' ,whiteSpace: 'nowrap'}}>
    <span style={{ marginRight: '8px', fontWeight: 'bold' }}>设备名称：</span>
    <Input placeholder="设备名称" variant="filled"  style={{ borderColor: 'black' }} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' ,whiteSpace: 'nowrap'}}>
    <span style={{ marginRight: '8px', fontWeight: 'bold' }}>设备类型：</span>
    <Input placeholder="设备类型" variant="filled"  style={{ borderColor: 'black' }} />
  </div>

       </Drawer>
       <div style={{marginTop:'20px'}}><EquipmentList/></div>
               </div>
 
     )
    
}

export default withRouter(EquipmentModel);