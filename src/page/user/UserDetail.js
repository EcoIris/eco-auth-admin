import React from "react";
import {Button, Row, Col, Input, Select, Drawer, message, Space, Upload} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function init() {
    return {
        loading: false,
        visible: true,
        version: 0,
        disable: true,
        from: {
            name: '',
            image: '',
            sex: 0,
            age: 0,
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
        //     setState({
        //         ...state,
        //         from: {
        //             ...state.from,
        //             name: res.data.name,
        //             sex: res.data.sex,
        //             desc: res.data.address,
        //         }
        //     })
        // }).catch(error => {
        //     console.log(error);
        // });
        setState(state => ({
            ...state,
            visible: visible,
            disable: true,
            from: {
                ...state.from,
                name: 'wowowo',
                image: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                sex: 1,
                age: parseInt(Math.random() * 100),
                desc: 'London, Park Lane no. ' + id,
            }
        }));
    }, [id, visible]);

    function handleOk(e) {
        message.success(JSON.stringify(state.from));
    }

    function handleSelectChange(name, value) {
        console.log(name,value);

        setState(state => ({
            ...state,
            from: {
                ...state.from,
                sex: value,
            }
        }));
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

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            return false;
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

    function handleEdit() {
        setState(state => ({
            ...state,
            disable: false
        }));
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
                    {state.disable ?
                        <Button key="submit" type="primary" onClick={handleEdit}>编辑</Button> :
                        <Button key="submit" type="primary" onClick={handleOk}>确定</Button>
                    }
                </Space>
            ]}
        >
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
                        disabled={state.disable}
                    >
                        {state.from.image ? <img src={state.from.image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Col>
                <Col span={12}>
                    <Label>姓名</Label>
                    <Input disabled={state.disable} name="name" placeholder="用户ID" value={state.from.name} onChange={handleInputChange}/>
                </Col>
                <Col span={12}>
                    <Label>性别</Label>
                    <Select disabled={state.disable} name="sex" value={state.from.sex.toString()} onChange={handleSelectChange} style={{width: '100%'}}>
                        <Option value="">选择性别</Option>
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                    </Select>
                </Col>
                <Col span={12}>
                    <Label>年龄</Label>
                    <Input disabled={state.disable} name="age" placeholder="用户ID" value={state.from.age} onChange={handleInputChange}/>
                </Col>
                <Col span={24}>
                    <Label>描述</Label>
                    <TextArea disabled={state.disable} name="desc" placeholder="描述" onChange={handleInputChange} value={state.from.desc}/>
                </Col>
            </Row>
        </Drawer>
    );
}