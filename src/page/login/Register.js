import React from "react";
import {useHistory} from 'react-router-dom';
import {LoginForm, ProFormText, ProFormCaptcha} from '@ant-design/pro-form';
import {UserOutlined, MobileOutlined, LockOutlined} from '@ant-design/icons';
import {message, Tabs} from 'antd';
import './login.less';
import {Link} from 'react-router-dom';
// import axios from "axios";

function init() {
    return {
        registerType: 'account',
    };
}

export default function Login() {

    const [state, setState] = React.useState(init());

    const history = useHistory();

    function handleRegister(e) {
        // let data = {};
        // if (state.registerType === 'account') {
        //     data['account'] = e.username;
        //     data['password'] = e.password;
        //     data['type'] = 1;
        // } else if (state.registerType === 'phone') {
        //     data['mobile'] = e.mobile;
        //     data['code'] = e.captcha;
        //     data['type'] = 2;
        // }
        // axios.post('/api/register',
        //     data
        // ).then(res => {
        //     console.log(res);
        // }).catch(error => {
        //     console.log(error);
        // });
        message.success(JSON.stringify(e));
        //模拟注册成功跳转登录页
        history.replace('/login');
    }

    function handleChangeregisterType(value) {
        setState(state => ({
            ...state,
            registerType: value
        }));
    }

    return (
        <div className="login-form">
            <LoginForm onFinish={handleRegister}>
                <Tabs activeKey={state.registerType} onChange={handleChangeregisterType}>
                    <Tabs.TabPane key={'account'} tab={'账号密码注册'}/>
                    <Tabs.TabPane key={'phone'} tab={'手机号注册'}/>
                </Tabs>
                {state.registerType === 'account' && (
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'}/>,
                            }}
                            placeholder={'用户名'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'}/>,
                            }}
                            placeholder={'密码'}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="confirm"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'}/>,
                            }}
                            placeholder={'确认密码'}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请确认密码！',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次输入的密码不一致'));
                                    },
                                }),
                            ]}
                        />
                    </>
                )}
                {state.registerType === 'phone' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileOutlined className={'prefixIcon'}/>,
                            }}
                            name="mobile"
                            placeholder={'手机号'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号！',
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '手机号格式错误！',
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'}/>,
                            }}
                            captchaProps={{
                                size: 'large',
                            }}
                            placeholder={'请输入验证码'}
                            captchaTextRender={(timing, count) => {
                                if (timing) {
                                    return `${count} ${'获取验证码'}`;
                                }
                                return '获取验证码';
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码！',
                                },
                            ]}
                            onGetCaptcha={async () => {
                                message.success('获取验证码成功！验证码为：1234');
                            }}
                        />
                    </>
                )}
                <div style={{marginBottom: 24}}>
                    <Link to="/login">去登录</Link>
                </div>
            </LoginForm>
        </div>
    );
};