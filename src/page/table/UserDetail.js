import React from "react";
import {Modal, Button, Row, Col, Input, Select} from 'antd';

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

function Lable(props) {
    return <div>{props.children}</div>;
}

export default function UserDetail({id, visible, handleCancel}) {

    const [state, setState] = React.useState(init());

    const {Option} = Select;

    React.useEffect(()=> {
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
        //             age: res.data.age,
        //             address: res.data.address,
        //         }
        //     })
        // }).catch(error => {
        //     console.log(error);
        // });
            setState(state => ({
                ...state,
                from: {
                    ...state.from,
                    name: 'wowowo',
                    sex: 1,
                    address: 'London, Park Lane no. 2',
                }
            }));
    }, [id]);

    function handleOk(e) {
        console.log(e);
    }

    function handleSelectChange(value) {
        console.log(value);
    }

    return (
        <>
            <Modal
                visible={visible}
                title="用户详情"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" loading={state.loading} onClick={handleOk}>
                        确定
                    </Button>,
                ]}
            >
                <Row gutter={[24, 24]}>
                    <Col span={12}>
                        <Lable>ID</Lable>
                        <Input placeholder="用户ID" value={id}/>
                    </Col>
                    <Col span={12}>
                        <Lable>姓名</Lable>
                        <Input placeholder="用户ID" value={state.from.name}/>
                    </Col>
                    <Col span={12}>
                        <Lable>年龄</Lable>
                        <Select value={state.from.sex.toString()} onChange={handleSelectChange} style={{width: '100%'}}>
                            <Option value="">选择性别</Option>
                            <Option value="1">男</Option>
                            <Option value="2">女</Option>
                        </Select>
                    </Col>
                    <Col span={12}>
                        <Lable>地址</Lable>
                        <div>{state.from.address}</div>
                    </Col>
                </Row>
            </Modal>
        </>
    );
}
