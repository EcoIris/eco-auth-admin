import React from 'react';
import {Button, Space} from "antd";
import './BatchOperation.less';

export default function BatchOperation({length, onClick}) {

    return (
        <div className="ant-pro-footer-bar">
            <span className="ant-pro-footer-bar-left">已选择 <b>{length}</b> 项</span>
            <Space size={16} style={{float: 'right', marginRight: '20px'}}>
                <Button onClick={onClick}>批量删除</Button>
            </Space>
        </div>
    );
}