import React from 'react';
import {Layout, Menu, Dropdown} from 'antd';

function init() {
    return {
        visible: false
    };
}

export default function HeaderBar() {
    const [state, setState] = React.useState(init());

    const {Header} = Layout;

    const menu = (
        <Menu onClick={onMenuClick}>
            <Menu.Item key="outLogin">退出登录</Menu.Item>
        </Menu>
    );

    const user = JSON.parse(localStorage.getItem('user'));

    function onMenuClick(e) {
        if (e.key === 'outLogin') {
            localStorage.removeItem('user');
            setState({
                ...state,
                visible: false
            });
            window.location.href = '/login';
        }
    }

    function handleVisibleChange(flag) {
        setState({
            ...state,
            visible: flag
        });
    }

    return (
        <Header>
            <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={state.visible}>
                <div className="ant-dropdown-link">
                    <img className="custom-img" src={user.image} alt=""/>
                    <span>{user.username}</span>
                </div>
            </Dropdown>
        </Header>
    );
}
