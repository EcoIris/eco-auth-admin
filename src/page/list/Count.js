import React from 'react';
import {Form, Row, Col, Input, Table, Button, Select , message} from 'antd';
import './Count.less';
import BatchOperation from "../../common/BatchOperation";

function init() {
    return {
        selectedRowKeys: [],
        loading: false,
        expand: false,
        data: [],
        version: 0
    };
}

export default function Count() {
    const [state, setState] = React.useState(init());

    const [form] = Form.useForm();

    const { Option } = Select;

    const rowSelection = {
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = state.selectedRowKeys.length > 0;

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            width: 100,
            editable: true,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            width: 100,
            sorter: (a, b) => a.age - b.age,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: '地址',
            dataIndex: 'address',
            width: 30,
            ellipsis: true,
        },
    ];

    React.useEffect(() => {
        const data = [];
        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                name: `Edward King ${i}`,
                age: parseInt((Math.random() * 1000).toString()),
                address: `London, Park Lane no. ${i}`,
            });
        }
        setState(state=>({
            ...state,
            data: data
        }));
    }, [state.version]);

    function onFinish(values) {
        console.log('Received values of form: ', values);
    }

    function onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setState({
            ...state,
            selectedRowKeys
        });
    }

    function handleChange(pagination, filters, sorter, extra) {
        console.log(pagination, filters, sorter, extra);
    }

    function handleSelectChange(value) {
        console.log(value);
    }

    function handleBatchDelete() {
        console.log(state.selectedRowKeys);
        message.warning('功能开发中');
    }

    return (
        <div>
            <div className="form-search">
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={onFinish}
                    initialValues={{age: ''}}
                >
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item
                                name="name"
                                label="姓名"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ]}
                            >
                                <Input placeholder="placeholder"/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="age"
                                label="年龄"
                            >
                                <Select onChange={handleSelectChange}>
                                    <Option value="">选择年龄</Option>
                                    <Option value="1">10</Option>
                                    <Option value="2">20</Option>
                                    <Option value="3" disabled>30</Option>
                                    <Option value="4">40</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="address"
                                label="地址"
                            >
                                <Input placeholder="placeholder"/>
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

            <Table bordered={true} rowSelection={rowSelection} columns={columns} dataSource={state.data}
                   onChange={handleChange} pagination={{pageSize: 20}}/>
        </div>
    );
}
