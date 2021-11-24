import React from "react";
import {Button, Row, Col, Input, Drawer, message, Space, Form, Tree} from 'antd';
import moment from 'moment';

function init() {
    return {
        loading: false,
        version: 0,
        disable: true,
        // expandedKeys: [],
        checkedKeys: [],
        selectedKeys: [],
        // autoExpandParent: true
    };
}

const treeData = [
    {
        title: '用户管理',
        key: '1',
        children: [
            {
                title: '用户列表',
                key: '10',
            },
        ],
    },
    {
        title: '权限管理',
        key: '2',
        children: [
            {
                title: '管理员列表',
                key: '20'
            },
            {
                title: '角色列表',
                key: '21'
            },
        ],
    },
    {
        title: '个人中心',
        key: '3',
        children: [
            {
                title: '个人设置',
                key: '30'
            },
        ]
    },
];

export default function RoleDetail({id, visible, handleCancel}) {
    const [state, setState] = React.useState(init());

    const [form] = Form.useForm();

    React.useEffect(() => {
        if (!id) {
            return;
        }
        form.setFieldsValue({
            name: '超级管理员',
            desc: '我是一段描述',
            add_time: moment('2021-11-11 00:00:00', 'YYYY-MM-DD')
        });

    }, [id, visible, form]);

    function handleOk() {
        const arr = form.getFieldsValue();
        if (!arr.name || !arr.desc || !state.checkedKeys) {
            return message.warning('请填写表单内容');
        }
        const params = {
            id,
            name: arr.name,
            desc: arr.desc,
            auth: state.checkedKeys
        };
        message.success(JSON.stringify(params));
    }

    function onCheck(checkedKeysValue) {
        console.log(checkedKeysValue);
        setState(state => ({
            ...state,
            checkedKeys: checkedKeysValue,
        }));
    }

    return (
        <Drawer
            title={id ? "角色详情(" + id + ")" : '添加角色'}
            width={500}
            placement="right"
            closable={false}
            onClose={handleCancel}
            visible={visible}
            footer={[
                <Space key="footer" style={{float: 'right'}}>
                    <Button key="back" onClick={handleCancel}>取消</Button>
                    <Button key="submit" type="primary" onClick={handleOk}>确定</Button>
                </Space>
            ]}
        >
            <Form layout="vertical" form={form}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="角色名"
                        >
                            <Input placeholder="输入角色名"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="desc"
                            label="描述"
                        >
                            <Input.TextArea rows={4} placeholder="输入角色描述"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="auth"
                            label="权限"
                        >
                            <Tree
                                checkable
                                // onExpand={onExpand}
                                // expandedKeys={state.expandedKeys}
                                // autoExpandParent={state.autoExpandParent}
                                // onSelect={onSelect}
                                onCheck={onCheck}
                                checkedKeys={state.checkedKeys}
                                selectedKeys={state.selectedKeys}
                                treeData={treeData}
                                defaultExpandAll={true}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
}