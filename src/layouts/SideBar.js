import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import {setFooterCollapsed} from '../redux/action';
import {connect} from 'react-redux'
import {
    TeamOutlined,
    UserOutlined,
    UnlockOutlined,
    ExceptionOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import config from '../page/config/Config.json';
import {withRouter} from 'react-router-dom';

const {Sider} = Layout;

const {SubMenu} = Menu;

const menuList = [
    {
        key: 'user',
        name: '用户管理',
        icon: <TeamOutlined/>,
        authority: true,
        children: [
            {
                key: '/user/user-table',
                name: '用户列表',
                authority: true,
            },
        ]
    },
    {
        key: 'auth',
        name: '权限管理',
        icon: <UnlockOutlined/>,
        authority: true,
        children: [
            {
                key: '/auth/user-list',
                name: '管理员列表',
                authority: true,
            },
            {
                key: '/auth/role-list',
                name: '角色列表',
                authority: true,
            },
        ]
    },
    {
        key: 'account',
        name: '个人中心',
        icon: <UserOutlined/>,
        authority: true,
        children: [
            {
                key: '/account/setting',
                name: '个人设置',
                authority: true,
            },
        ]
    },
    {
        key: 'abnormal',
        name: '异常页',
        icon: <ExceptionOutlined />,
        authority: true,
        children: [
            {
                key: '/403',
                name: '403',
            },
            {
                key: '/404',
                name: '404',
                authority: true,
            },
        ]
    },
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
            if (v.children) {
                v.children.forEach(vv => {
                    if (vv.key === pathname && !vv.authority) {
                        this.props.history.push('/403')
                    }
                })
            }
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
        // react-redux 触发setFooterCollapsed
        let {setFooterCollapsed} = this.props
        setFooterCollapsed(collapsed);

        this.setState({
            collapsed,
        });
    };

    handleMenuClick = item => {
        menuList.forEach(v => {
            if (v.children) {
                v.children.forEach(vv => {
                    if (vv.key === item.key && !vv.authority) {
                        this.props.history.push('/403')
                    }
                })
            }
        });
    }

    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} collapsedWidth={65}
                   breakpoint="lg">
                <div className="ant-pro-sider-logo" id="logo">
                    <a href="/">
                        <img src={config.logo} alt="logo"/>
                        <h1>{config.title}</h1>
                    </a>
                </div>
                <Menu theme="dark"
                      defaultOpenKeys={this.state.defaultOpenKeys}
                      defaultSelectedKeys={this.state.defaultSelectedKeys}
                      mode="inline"
                      onClick={this.handleMenuClick}
                >
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

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state) => {
    return {
        footerCollapsed: state.footerCollapsed,
    }
}

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setFooterCollapsed(data) {
            dispatch(setFooterCollapsed(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideBar));