import React from "react";
import {Modal, message, Row, Col, Upload, Input, Select} from "antd";
import Label from "../../components/Label";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
function init() {
    return {
        loading: false,
        version: 0,
        disable: true,
        from: {
            name: '',
            account: '',
            password: '',
            image: '',
            role: '',
            desc: '',
        }
    };
}

export default function UserDetail({id, visible, handleCancel}) {
    const [state, setState] = React.useState(init());

    const {Option} = Select;

    const { TextArea } = Input;

    const uploadButton = (
        <div>
            {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    React.useEffect(() => {
        //根据ID请求接口获取用户信息
        // axios.get('/api/user/detail', {
        //     params: {
        //         id: id
        //     }
        // }).then(res => {
        //     console.log(res);
        // }).catch(error => {
        //     console.log(error);
        // });
        if (!id) {
            return;
        }
        setState(state => ({
            ...state,
            from: {
                ...state.from,
                name: 'wowowo',
                account: '123456',
                password: '123456',
                image: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                role: '1',
                desc: '拥有至高无上的权利',
            }
        }));
    }, [id, visible, state.version]);

    const handleOk = () => {
        message.success(JSON.stringify(state.from));
    };

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

    function handleChange(info) {
        if (info.file.status === 'uploading') {
            message.success('上传中');
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setState({
                    ...state,
                    from: {
                        ...state.from,
                        image: imageUrl
                    },
                    loading: false,
                })
            });
        }
    }

    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setState(state => ({
            ...state,
            from: {
                ...state.from,
                [name]: value
            }
        }))
    }

    function handleSelectChange(value) {
        console.log(value);

        setState(state => ({
            ...state,
            from: {
                ...state.from,
                role: value,
            }
        }));
    }

    return (
        <>
            <Modal title={id ? '编辑管理员' : '添加管理员'} visible={visible} onOk={handleOk} onCancel={handleCancel} cancelText="取消" okText="确认">
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Label>头像</Label>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {state.from.image ? <img src={state.from.image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Col>
                    <Col span={12}>
                        <Label>账号</Label>
                        <Input name="account" placeholder="账号" value={state.from.account} onChange={handleInputChange}/>
                    </Col>
                    <Col span={12}>
                        <Label>密码</Label>
                        <Input.Password name="password" placeholder="密码" value={state.from.password} onChange={handleInputChange}/>
                    </Col>
                    <Col span={12}>
                        <Label>姓名</Label>
                        <Input name="name" placeholder="用户ID" value={state.from.name} onChange={handleInputChange}/>
                    </Col>
                    <Col span={12}>
                        <Label>角色</Label>
                        <Select name="sex" value={state.from.role} onChange={handleSelectChange} style={{width: '100%'}}>
                            <Option value="">选择角色</Option>
                            <Option value="1">超级管理员</Option>
                            <Option value="2">开发人员</Option>
                            <Option value="3">运营</Option>
                        </Select>
                    </Col>
                    <Col span={24}>
                        <Label>描述</Label>
                        <TextArea name="desc" placeholder="描述" onChange={handleInputChange} value={state.from.desc}/>
                    </Col>
                </Row>
            </Modal>
        </>
    );
}
