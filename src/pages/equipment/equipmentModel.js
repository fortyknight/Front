import { divide } from "lodash"
import { withRouter } from 'umi';
import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Button, Drawer } from 'antd';
import EquipmentList from "./equipmentList";
import AddEquipment from "./addEquipment";
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

       <AddEquipment></AddEquipment>
       <div style={{marginTop:'20px'}}><EquipmentList/></div>
               </div>
 
     )
    
}

export default withRouter(EquipmentModel);