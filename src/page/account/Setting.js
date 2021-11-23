import React from 'react';
import {Tabs, Form, Input, Button, Select, Upload, message, List, Modal} from 'antd';
import Icon, {LoadingOutlined, PlusOutlined} from "@ant-design/icons";

const {TabPane} = Tabs;

const {Option} = Select;

function init() {
    return {
        loading: true,
        version: 0,
        visible: false,
        type: '',
    };
}

const alipay = () => (
    <svg t="1637302628890" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12490" width="50" height="50">
        <path d="M230.4 576.512c-12.288 9.728-25.088 24.064-28.672 41.984-5.12 24.576-1.024 55.296 22.528 79.872 28.672 29.184 72.704 37.376 91.648 38.912 51.2 3.584 105.984-22.016 147.456-50.688 16.384-11.264 44.032-34.304 70.144-69.632-59.392-30.72-133.632-64.512-212.48-61.44-40.448 1.536-69.632 9.728-90.624 20.992z m752.64 135.68c26.112-61.44 40.96-129.024 40.96-200.192C1024 229.888 794.112 0 512 0S0 229.888 0 512s229.888 512 512 512c170.496 0 321.536-83.968 414.72-211.968-88.064-43.52-232.96-115.712-322.56-159.232-42.496 48.64-105.472 97.28-176.64 118.272-44.544 13.312-84.992 18.432-126.976 9.728-41.984-8.704-72.704-28.16-90.624-47.616-9.216-10.24-19.456-22.528-27.136-37.888 0.512 1.024 1.024 2.048 1.024 3.072 0 0-4.608-7.68-7.68-19.456-1.536-6.144-3.072-11.776-3.584-17.92-0.512-4.096-0.512-8.704 0-12.8-0.512-7.68 0-15.872 1.536-24.064 4.096-20.48 12.8-44.032 35.328-65.536 49.152-48.128 114.688-50.688 148.992-50.176 50.176 0.512 138.24 22.528 211.968 48.64 20.48-43.52 33.792-90.112 41.984-121.344h-307.2v-33.28h157.696v-66.56H272.384V302.08h190.464V235.52c0-9.216 2.048-16.384 16.384-16.384h74.752V302.08h207.36v33.28h-207.36v66.56h165.888s-16.896 92.672-68.608 184.32c115.2 40.96 278.016 104.448 331.776 125.952z" fill="#06B4FD" p-id="12491"></path>
    </svg>
);

const wechat = () => (
    <svg t="1637302659100" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14357" width="50" height="50">
        <path d="M512 1024C229.230021 1024 0 794.769979 0 512S229.230021 0 512 0s512 229.230021 512 512-229.230021 512-512 512z m304.000268-438.26556c0-84.342608-84.233124-153.023597-178.992838-153.023597-100.396008 0-179.233275 68.68099-179.233275 153.023597 0 84.558356 78.837266 152.99891 179.232201 152.99891 21.002734 0 42.24483-5.363656 63.232537-10.486876l57.861367 31.75366-15.832285-52.778935c42.216922-31.766541 73.732294-74.045719 73.732293-121.486759z m-237.133283-26.401811c-10.475069 0-20.975899-10.499757-20.975899-21.038155 0-10.475069 10.50083-21.000587 20.975899-21.000587 15.884881 0 26.397518 10.525518 26.397518 21.000587 0 10.538398-10.512637 21.038155-26.397518 21.038155z m116.014692 0c-10.48795 0-20.963019-10.499757-20.963019-21.038155 0-10.475069 10.475069-21.000587 20.963019-21.000587 15.858046 0 26.371757 10.525518 26.371757 21.000587 0 10.538398-10.765954 21.038155-26.37283 21.038155z m-75.265073-145.263094c6.901803 0 13.831514 0.481945 20.722583 1.191446-18.569392-86.866113-111.265006-151.260042-217.120202-151.260042-118.217258 0-215.219254 80.63839-215.219253 183.229451 0 59.183765 32.186231 107.842013 86.044981 145.555052l-21.444965 64.876948 75.303715-37.916981c26.928839 5.238071 48.614239 10.741266 75.315522 10.741266 6.663514 0 13.363522-0.240436 20.039916-0.925249-4.294574-14.34244-6.676394-29.572562-6.676394-45.107522-0.012881-94.030893 80.80047-170.384369 183.033023-170.384369zM503.767212 355.609224c16.200453 0 26.915958 10.741266 26.915958 26.972847 0 16.206893-10.728386 26.947086-26.917032 26.947086-16.213333 0-32.400906-10.740193-32.400905-26.947086 0.240436-16.244461 16.416201-26.97392 32.400905-26.97392z m-150.620311 53.894172c-16.213333 0-32.400906-10.727312-32.400905-26.947086 0-16.231581 16.200453-26.959966 32.400905-26.959966 16.226214 0 26.9546 10.741266 26.9546 26.959966-0.011807 15.991145-10.728386 26.948159-26.9546 26.94816z" fill="#07C160" p-id="14358"></path>
    </svg>
);


function Setting() {
    const [state, setState] = React.useState(init());

    const [basicForm] = Form.useForm();

    const uploadButton = (
        <div>
            {state.loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    const CollectionCreateForm = ({type, visible, onCreate, onCancel}) => {
        const [form] = Form.useForm();
        return (
            <Modal
                visible={visible}
                title={getType(type)}
                okText="确定"
                cancelText="取消"
                onCancel={onCancel}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                >
                    {(type === 1 || type === 2) && <Form.Item
                        name="account"
                        label="账号"
                        rules={[
                            {
                                required: true,
                                message: '账号必填!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>}
                    {type === 3 && <Form.Item
                        name="oldPassword"
                        label="旧密码"
                        rules={[
                            {
                                required: true,
                                message: '旧密码必填!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>}
                    {type === 3 && <Form.Item
                        name="newPassword"
                        label="新密码"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '新密码必填!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>}
                    {type === 3 && <Form.Item
                        name="confirmPassword"
                        label="确认密码"
                        hasFeedback
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: '确认密码必填!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    console.log(value, getFieldValue('newPassword'))
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('你输入的两个密码不匹配!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>}
                    {type === 4 && <Form.Item
                        name="phone"
                        label="手机号"
                        hasFeedback
                    >
                        <div>开发中...</div>
                    </Form.Item>}
                    {type === 5 && <Form.Item
                        name="problem"
                        label="密保问题"
                        hasFeedback
                    >
                        <div>开发中...</div>
                    </Form.Item>}
                </Form>
            </Modal>
        );
    };

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 8,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 8,
        },
    };

    const bData = [
        {
            title: '支付宝',
            svg: alipay,
            desc: '当前未绑定支付宝账号',
            type: 1
        },
        {
            title: '微信',
            svg: wechat,
            desc: '当前未绑定微信账号',
            type: 2
        },
    ];

    const sData = [
        {
            title: '账号密码',
            desc: '当前密码强度：强',
            type: 3
        },
        {
            title: '密保手机',
            desc: '当前未绑定密保手机',
            type: 4
        },
        {
            title: '密保问题',
            desc: '未设置密保问题，密保问题可有效保护账户安全',
            type: 5
        },
    ];

    React.useEffect(() => {
        basicForm.setFieldsValue({
            username: 'account',
            image: ['https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'],
            email: '88888@qq.com',
            sex: '1'
        });
        setState(state => ({
            ...state,
            loading: false,
        }));
    }, [state.version, basicForm]);

    function onFinish(values) {
        message.success(JSON.stringify(values));
    }

    function getType(type) {
        switch (type) {
            case 1:
                return '绑定支付宝账号';
            case 2:
                return '绑定微信账号';
            case 3:
                return '修改账号密码';
            case 4:
                return '修改密保手机';
            case 5:
                return '修改密保问题';
            default:
                return '未知操作';

        }
    }

    function handleChange(info) {
        if (info.file.status === 'uploading') {
            message.success('上传中');
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                basicForm.setFieldsValue({
                    image: [imageUrl]
                });
                setState({
                    ...state,
                    loading: false,
                })
            });
        }
    }

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    function normFile(e) {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    function handleTabsChange(key) {
        console.log(key);
    }

    function handleBind(type) {
        console.log(type);
        setState({
            ...state,
            visible: true,
            type: type
        })
    }

    function handleOnCancel(value) {
        setState({
            ...state,
            visible: false,
        });
    }

    function handleOnCreate(values) {
        values['type'] = state.type;
        message.success(JSON.stringify(values));
        setState({
            ...state,
            visible: false,
        });
    }

    return (
        <Tabs defaultActiveKey="1" centered onChange={handleTabsChange}>
            <TabPane tab="基本设置" key="1">
                <Form {...layout} form={basicForm} name="basic-control" onFinish={onFinish}>
                    <Form.Item
                        label="头像"
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="image"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {basicForm.getFieldValue('image') ?
                                <img src={basicForm.getFieldValue('image')[0]} alt="avatar"
                                     style={{width: '100%'}}/> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="昵称"
                        name="username"
                        rules={[{required: true, message: '请输入昵称!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[{required: true, message: '请输入邮箱!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="sex"
                        rules={[{required: true, message: '请选择性别!'}]}
                    >
                        <Select>
                            <Option value="">选择性别</Option>
                            <Option value="1">男</Option>
                            <Option value="2">女</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </TabPane>
            <TabPane tab="安全设置" key="2">
                <List
                    itemLayout="horizontal"
                    dataSource={sData}
                    renderItem={item => (
                        <List.Item actions={[<a key="list-loadmore-edit" onClick={() => handleBind(item.type)}>绑定</a>]}>
                            <List.Item.Meta
                                title={item.title}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                    style={{left: '20%', width: '60%'}}
                />
            </TabPane>
            <TabPane tab="账号绑定" key="3">
                <List
                    itemLayout="horizontal"
                    dataSource={bData}
                    renderItem={item => (
                        <List.Item actions={[<a key="list-loadmore-edit" onClick={() => handleBind(item.type)}>绑定</a>]}>
                            <List.Item.Meta
                                avatar={<Icon component={item.svg}/>}
                                title={item.title}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                    style={{left: '20%', width: '60%'}}
                />
            </TabPane>
            <CollectionCreateForm type={state.type} visible={state.visible} onCancel={handleOnCancel} onCreate={handleOnCreate}/>
        </Tabs>
    );
}

export default Setting;