import React from "react";
import {useHistory} from 'react-router-dom';
import {LoginForm, ProFormText, ProFormCaptcha} from '@ant-design/pro-form';
import {UserOutlined, MobileOutlined, LockOutlined, WechatOutlined} from '@ant-design/icons';
import {message, Tabs, Space, Button} from 'antd';
import './login.less';
// import axios from "axios";

function init() {
    return {
        loginType: 'account',
    };
}

export default function Login() {

    const [state, setState] = React.useState(init());

    const history = useHistory();

    function handleLogin(e) {
        // let data = {};
        // if (state.loginType === 'account') {
        //     data['account'] = e.username;
        //     data['password'] = e.password;
        //     data['type'] = 1;
        // } else if (state.loginType === 'phone') {
        //     data['mobile'] = e.mobile;
        //     data['code'] = e.captcha;
        //     data['type'] = 2;
        // }
        // axios.post('/api/login',
        //     data
        // ).then(res => {
        //     console.log(res);
        // }).catch(error => {
        //     console.log(error);
        // });
        message.success(JSON.stringify(e));
        //模拟登录成功保存返回的用户信息
        let arr = {
            username: e.username ? e.username : e.mobile,
            image: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        };
        localStorage.setItem("user", JSON.stringify(arr));
        history.replace('/');
    }

    function handleChangeLoginType(value) {
        setState(state => ({
            ...state,
            loginType: value
        }));
    }

    function handleThirdLogin(e) {
        message.warning('功能开发中');
    }

    return (
        <div className="login-form">
            <LoginForm
                logo="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                title="Auth Admin"
                subTitle="基于react + ant design实现的权限管理后台"
                actions={
                    <Space>
                        其他登录方式
                        <Button icon={<WechatOutlined />} type="text" shape="circle" size="large" onClick={handleThirdLogin}/>
                    </Space>
                }
                onFinish={handleLogin}
            >
                <Tabs activeKey={state.loginType} onChange={handleChangeLoginType}>
                    <Tabs.TabPane key={'account'} tab={'账号密码登录'}/>
                    <Tabs.TabPane key={'phone'} tab={'手机号登录'}/>
                </Tabs>
                {state.loginType === 'account' && (
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
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                    </>
                )}
                {state.loginType === 'phone' && (
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
                    <a href="/register">
                        注册新用户
                    </a>
                    {/*<a style={{float: 'right'}} href="/#">*/}
                    {/*    忘记密码*/}
                    {/*</a>*/}
                </div>
            </LoginForm>
        </div>
    );
};