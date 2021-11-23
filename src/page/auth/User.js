import React from 'react';
import {Form, Row, Col, Input, Table, Button, message, Space} from 'antd';
import BatchOperation from "../../common/BatchOperation";
import UserDetail from "./UserDetail";

function init() {
    return {
        selectedRowKeys: [],
        loading: true,
        expand: false,
        visible: false,
        version: 0,
        id: 0,
        data: []
    };
}

export default function User() {
    const [state, setState] = React.useState(init());

    const [form] = Form.useForm();

    const rowSelection = {
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = state.selectedRowKeys.length > 0;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 50,
            render: (text, record) => (
                <a onClick={() => handleEdit(record)}>{record.id}</a>
            )
        },
        {
            title: '头像',
            dataIndex: 'image',
            width: 100,
            render: ((text, record) => {
                return <img src={text} alt="" width={50}/>
            })
        },
        {
            title: '昵称',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '角色',
            dataIndex: 'roleName',
            width: 100,
        },
        {
            title: '描述',
            dataIndex: 'desc',
            width: 100,
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: 50,
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => handleDelete(record)}>删除</a>
                </Space>
            )
        },
    ];

    React.useEffect(() => {
        const data = [];
        for (let i = 1; i < 5; i++) {
            data.push({
                id: i,
                name: `Edward King ${i}`,
                image: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                roleName: '管理员',
                desc: `拥有至高无上的权利`,
            });
        }
        setState(state => ({
            ...state,
            data: data,
            loading: false
        }));
    }, [state.version]);

    function onFinish(values) {
        message.success('Received values of form: ' + JSON.stringify(values));
    }

    function onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setState({
            ...state,
            selectedRowKeys
        });
    }

    function handleEdit(obj) {
        message.success(obj.id);
        setState({
            ...state,
            visible: true,
            id: obj.id
        })
    }

    function handleDelete(obj) {
        message.success(JSON.stringify(obj));
    }

    function handleChange(pagination, filters, sorter, extra) {
        console.log(pagination, filters, sorter, extra);
    }

    function handleBatchDelete() {
        console.log(state.selectedRowKeys);
        message.success('功能开发中');
    }

    function handleClosable() {
        setState({
            ...state,
            visible: false,
        })
    }

    return (
        <div>
            <div className="form-search" style={{padding: '10px 0'}}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={onFinish}
                    initialValues={{sex: ''}}
                >
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item
                                name="id"
                                label="ID"
                            >
                                <Input placeholder="输入ID"/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="name"
                                label="昵称"
                            >
                                <Input placeholder="输入昵称"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button
                                style={{margin: '0 8px'}}
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >清除</Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            {hasSelected && <BatchOperation length={state.selectedRowKeys.length} onClick={handleBatchDelete}/>}

            <Table
                loading={state.loading}
                bordered={true}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={state.data}
                onChange={handleChange}
                pagination={{pageSize: 10}}
                rowKey="id"
                title={() => (
                    <div>
                        <span>管理员列表</span>
                        <Space key="footer" style={{float: 'right'}}>
                            <Button key="submit" type="primary" onClick={handleEdit}>添加</Button>
                        </Space>
                    </div>
                )}
            />

            {state.visible && <UserDetail visible={state.visible} id={state.id} handleCancel={handleClosable}/>}
        </div>
    );
}
