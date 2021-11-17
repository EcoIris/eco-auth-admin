import React, {useRef} from 'react';
import {message} from 'antd';
import {ProFormCascader} from '@ant-design/pro-form';
import ProForm, {
    ProFormText,
    ProFormDateRangePicker,
    ProFormMoney,
    ProFormDigit,
} from '@ant-design/pro-form';

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export default function IProFrom() {
    const formRef = useRef();
    return (
        <ProForm
            onFinish={async (values) => {
                await waitTime(2000);
                console.log(values);
                const val1 = await formRef.current?.validateFields();
                console.log('validateFields:', val1);
                const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
                console.log('validateFieldsReturnFormatValue:', val2);
                message.success('提交成功');
            }}
            formRef={formRef}
            params={{id: '100'}}
            formKey="base-form-use-demo"
            request={async () => {
                await waitTime(100);
                return {
                    name: '设计有限公司',
                    useMode: 'chapter',
                };
            }}
            autoFocusFirstInput
        >
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="name"
                    required
                    addonBefore={<a>客户名称应该怎么获得？</a>}
                    addonAfter={<a>点击查看更多</a>}
                    label="签约客户名称"
                    tooltip="最长为 24 位"
                    placeholder="请输入名称"
                    rules={[{required: true, message: '这是必填项'}]}
                />
                <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称"/>
            </ProForm.Group>
            <ProForm.Group>
                <ProFormDigit name="count" label="人数" width="lg"/>
            </ProForm.Group>
            <ProForm.Group>
                <ProFormMoney
                    label="限制金额最小为0"
                    name="amount1"
                    locale="en-US"
                    initialValue={22.22}
                    min={0}
                />
                <ProFormMoney label="不限制金额大小" name="amount2" locale="en-GB" initialValue={22.22}/>

            </ProForm.Group>
            <ProForm.Group>
                <ProFormText
                    name={['contract', 'name']}
                    width="md"
                    label="合同名称"
                    placeholder="请输入名称"
                />
                <ProFormDateRangePicker width="md" name={['contract', 'createTime']} label="合同生效时间"/>
            </ProForm.Group>
            <ProFormCascader
                width="md"
                request={async () => [
                    {
                        value: 'zhejiang',
                        label: 'Zhejiang',
                        children: [
                            {
                                value: 'hangzhou',
                                label: 'Hangzhou',
                                children: [
                                    {
                                        value: 'xihu',
                                        label: 'West Lake',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        value: 'jiangsu',
                        label: 'Jiangsu',
                        children: [
                            {
                                value: 'nanjing',
                                label: 'Nanjing',
                                children: [
                                    {
                                        value: 'zhonghuamen',
                                        label: 'Zhong Hua Men',
                                    },
                                ],
                            },
                        ],
                    },
                ]}
                name="area"
                label="区域"
                initialValue={['zhejiang', 'hangzhou', 'xihu']}
            />
        </ProForm>
    );
};