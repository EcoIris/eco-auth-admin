import React, {useRef} from 'react';
import {PlusOutlined, EllipsisOutlined} from '@ant-design/icons';
import {Button, Tag, Space, Menu, Dropdown} from 'antd';
import ProTable, {TableDropdown} from '@ant-design/pro-table';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        valueType: 'indexBorder',
        width: 60,
    },
    {
        title: '标题',
        dataIndex: 'title',
        copyable: true,
        ellipsis: true,
        tip: '我是介绍',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
    },
    {
        title: '状态',
        dataIndex: 'state',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            all: {text: '全部', status: 'Default'},
            open: {
                text: '未解决',
                status: 'Error',
            },
            closed: {
                text: '已解决',
                status: 'Success',
                disabled: true,
            },
            processing: {
                text: '解决中',
                status: 'Processing',
            },
        },
    },
    {
        title: '标签',
        dataIndex: 'labels',
        search: false,
        render: (_, record) => (
            <Space>
                {record.labels.map(({name, color}) => (
                    <Tag color={color} key={name}>
                        {name}
                    </Tag>
                ))}
            </Space>
        ),
    },
    {
        title: '创建时间',
        key: 'showTime',
        dataIndex: 'created_at',
        valueType: 'dateTime',
        sorter: true,
        hideInSearch: true,
    },
    {
        title: '创建时间',
        dataIndex: 'end_at',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
            transform: (value) => {
                return {
                    startTime: value[0],
                    endTime: value[1],
                };
            },
        },
    },
    {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(record.id);
                }}
            >
                编辑
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                查看
            </a>,
            <TableDropdown
                key="actionGroup"
                onSelect={() => action?.reload()}
                menus={[
                    {key: 'copy', name: '复制'},
                    {key: 'delete', name: '删除'},
                ]}
            />,
        ],
    },
];

const menu = (
    <Menu>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
);

function init() {
    return {
        data: [],
        version: 0,
    }
}

export default function IProTable() {
    const [state, setState] = React.useState(init());

    const actionRef = useRef();

    React.useEffect(() => {
        const data = [];
        for (let i = 1; i < 46; i++) {
            data.push({
                id: i,
                title: `Edward King ${i}`,
                state: parseInt((Math.random() * 10).toString()),
                labels: [{name:'bob', color: 'red'}],
                created_at: `2021-11-09`,
                end_at: `2021-11-09 00:00:00`,
            });
        }
        setState(state=>({
            ...state,
            data: data,
            loading: false
        }));
    }, [state.version]);


    return (
        <ProTable
            columns={columns}
            actionRef={actionRef}
            dataSource={state.data}
            request={async (params = {}, sort, filter) => {
                console.log(params, sort, filter);
            }}
            editable={{
                type: 'multiple',
            }}
            columnsState={{
                persistenceKey: 'pro-user-singe-demos',
                persistenceType: 'localStorage',
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                syncToUrl: (values, type) => {
                    if (type === 'get') {
                        return {
                            ...values,
                            created_at: [values.startTime, values.endTime],
                        };
                    }
                    return values;
                },
            }}
            rowSelection={{

            }}
            pagination={{
                pageSize: 5,
            }}
            dateFormatter="string"
            headerTitle="高级表格"
            toolBarRender={() => [
                <Button key="button" icon={<PlusOutlined/>} type="primary">
                    新建
                </Button>,
                <Dropdown key="menu" overlay={menu}>
                    <Button>
                        <EllipsisOutlined/>
                    </Button>
                </Dropdown>,
            ]}
        />
    );
};