import React, {Component} from 'react';
import {Button, Space} from "antd";
import './BatchOperation.less';
import { connect } from 'react-redux'

class BatchOperation extends Component {

    render() {
        const footerCollapsed = this.props.footerCollapsed;
        return (
            <div className="ant-pro-footer-bar" style={footerCollapsed ? {width: 'calc(100% - 65px)'} : {width: 'calc(100% - 200px)'}}>
                <span className="ant-pro-footer-bar-left">已选择 <b>{this.props.length}</b> 项</span>
                <Space size={16} style={{float: 'right', paddingRight: '20px'}}>
                    <Button onClick={this.props.onClick}>批量删除</Button>
                </Space>
            </div>
        );
    }
}

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state) => {
    return {
        footerCollapsed: state.footerCollapsed,
    }
}

export default connect(mapStateToProps)(BatchOperation);