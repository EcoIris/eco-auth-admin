import React from 'react';
import {Form, Row, Col, Input, Table, Button, message, Space, DatePicker} from 'antd';
import BatchOperation from "../../components/BatchOperation";
import RoleDetail from "./RoleDetail";

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

export default function UserTable() {
    const [state, setState] = React.useState(init());

    const [form] = Form.useForm();

    const { RangePicker } = DatePicker;

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
            title: '角色名',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '描述',
            dataIndex: 'desc',
            width: 150,
        },
        {
            title: '添加时间',
            dataIndex: 'add_time',
            width: 100,
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
        const data = [
            {
                id: 1,
                name: '超级管理员',
                add_time: '2021-11-11 00:00:00',
                desc: '我是一段描述文字'
            },
            {
                id: 2,
                name: '开发人员',
                add_time: '2021-11-11 00:00:00',
                desc: '我是一段描述文字'
            },
            {
                id: 3,
                name: '运营',
                add_time: '2021-11-11 00:00:00',
                desc: '我是一段描述文字'
            }
        ];
        setState(state => ({
            ...state,
            data: data,
            loading: false
        }));
    }, [state.version]);

    function onFinish(values) {
        /*
            用form表单提交的时间组件值是两个moment对象,需要格式化: moment.format('YYYY-MM-DD')
            回显的时候需要引入moment格式化保存的字符串: moment('2021-11-11', 'YYYY-MM-DD')
        */
        if (values.add_time) {
            values.add_time = [values.add_time[0].format('YYYY-MM-DD'), values.add_time[1].format('YYYY-MM-DD')];
        }
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
            <div className="form-search">
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={onFinish}
                >
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                name="id"
                                label="ID"
                            >
                                <Input placeholder="输入ID"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="name"
                                label="角色名"
                            >
                                <Input placeholder="输入角色名"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="add_time"
                                label="添加时间"
                            >
                                <RangePicker/>
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
                        <Space key="footer" style={{float: 'right'}}>
                            <Button key="submit" type="primary" onClick={handleEdit}>添加</Button>
                        </Space>
                    </div>
                )}
            />

            {state.visible && <RoleDetail visible={state.visible} id={state.id} handleCancel={handleClosable}/>}
        </div>
    );
}
