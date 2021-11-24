import React from "react";
import {Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

const MessageTooltip = (props) => (
    <Tooltip title={props.title}>
        <InfoCircleOutlined style={{color: 'rgba(0,0,0,.55)', position: 'absolute',right: '15px', top: '5px',}}/>
    </Tooltip>
);

export default MessageTooltip;