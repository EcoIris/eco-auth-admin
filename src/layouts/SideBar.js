import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import {
    // DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import config from '../page/config/Config.json';

const {Sider} = Layout;

const {SubMenu} = Menu;

const menuList = [
    {
        key: 'components',
        name: '组件',
        icon: <PieChartOutlined/>,
        children: [
            {
                key: '/components/user-table',
                name: '普通表格',
            },
            {
                key: '/components/pro-table',
                name: '高级表格',
            },
            {
                key: '/components/user-from',
                name: '分步表单',
            },
            {
                key: '/components/pro-from',
                name: '高级表单',
            },
            {
                key: '/components/page-transfer',
                name: '穿梭框',
            },
        ]
    },
    // {
    //     key: 'user',
    //     name: '用户',
    //     icon: <DesktopOutlined/>,
    //     children: [
    //         {
    //             key: '/user/info',
    //             name: '个人中心',
    //         },
    //     ]
    // },
];

class SideBar extends Component {
    state = {
        collapsed: false,
        defaultOpenKeys: [],
        defaultSelectedKeys: [],
        style: {}
    };

    UNSAFE_componentWillMount() {
        this.handleMatchSideBar();
    }

    //匹配导航栏
    handleMatchSideBar = () => {
        let defaultOpenKeys = [];
        let defaultSelectedKeys = [];
        const pathname = window.location.pathname;
        const currentKey = pathname.split('/')[1];
        menuList.forEach(v => {
            if (currentKey === v.key) {
                defaultOpenKeys.push(v.key);
                defaultSelectedKeys.push(pathname);
            }
        });
        this.setState({
            defaultOpenKeys,
            defaultSelectedKeys
        });
    }

    //展开/收缩侧边栏
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({
            collapsed,
        });
    };

    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} collapsedWidth={65}  breakpoint="lg">
                <div className="ant-pro-sider-logo" id="logo">
                    <a href="/">
                        <img src={config.logo} alt="logo"/>
                        <h1>{config.title}</h1>
                    </a>
                </div>
                <Menu theme="dark" defaultOpenKeys={this.state.defaultOpenKeys} defaultSelectedKeys={this.state.defaultSelectedKeys} mode="inline">
                    {menuList.map(v => <SubMenu key={v.key} icon={v.icon} title={v.name}>
                        {v.children && v.children.map(vv => <Menu.Item key={vv.key}>
                            <Link to={vv.key}>{vv.name}</Link>
                        </Menu.Item>)}
                    </SubMenu>)}
                </Menu>
            </Sider>
        );
    }
}

export default SideBar;