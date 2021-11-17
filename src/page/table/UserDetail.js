import React from "react";
import {Button, Row, Col, Input, Select, Drawer, message, Space} from 'antd';

function init() {
    return {
        loading: false,
        visible: true,
        version: 0,
        from: {
            name: '',
            sex: 0,
            address: '',
        }
    };
}

function Label(props) {
    return <div style={{color: '#aaa', fontSize: '13px', lineHeight: '13px', marginBottom: '5px'}}>{props.children}</div>;
}

export default function UserDetail({id, visible, handleCancel}) {
    const [state, setState] = React.useState(init());

    const {Option} = Select;

    React.useEffect(() => {
        //根据ID请求接口获取用户信息
        // axios.get('/api/user/detail', {
        //     params: {
        //         id: id
        //     }
        // }).then(res => {
        //     console.log(res);
        //     setState({
        //         ...state,
        //         from: {
        //             ...state.from,
        //             name: res.data.name,
        //             sex: res.data.sex,
        //             address: res.data.address,
        //         }
        //     })
        // }).catch(error => {
        //     console.log(error);
        // });
        setState(state => ({
            ...state,
            visible: visible,
            from: {
                ...state.from,
                name: 'wowowo',
                sex: 1,
                address: 'London, Park Lane no. 2',
            }
        }));
    }, [id, visible]);

    function handleOk(e) {
        message.success('提交成功')
    }

    function handleSelectChange(value) {
        console.log(value);

        setState(state => ({
            ...state,
            from: {
                ...state.from,
                sex: value,
            }
        }));
    }
    
    function handleInputChange(e) {
        console.log(e);
    }

    return (
        <Drawer
            title={"用户详情(" + id + ")"}
            width={500}
            placement="right"
            closable={false}
            onClose={handleCancel}
            visible={state.visible}
            footer={[
                <Space key="footer" style={{float: 'right'}}>
                    <Button key="back" onClick={handleCancel}>
                        取消
                    </Button>
                    <Button key="submit" type="primary" onClick={handleOk}>
                        确定
                    </Button>
                </Space>
            ]}
        >
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Label>姓名</Label>
                    <Input placeholder="用户ID" value={state.from.name} onChange={handleInputChange}/>
                </Col>
                <Col span={12}>
                    <Label>性别</Label>
                    <Select value={state.from.sex.toString()} onChange={handleSelectChange} style={{width: '100%'}}>
                        <Option value="">选择性别</Option>
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                    </Select>
                </Col>
                <Col span={12}>
                    <Label>地址</Label>
                    <div>{state.from.address}</div>
                </Col>
            </Row>
        </Drawer>
    );
}