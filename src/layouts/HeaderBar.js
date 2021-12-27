import React from 'react';
import {Layout, Menu, Dropdown, Badge, Tabs, Button, List, Avatar, message, Tag} from 'antd';
import {useHistory} from 'react-router-dom';
import {
    BellOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import './HeaderBar.less';

function init() {
    return {
        visible: false,
        visibleMsg: false,
        notificationNum: '',
        messageNum: '',
        backlogNum: '',
        tagKey: '1',
        notificationList: [],
        messageList: [],
        backlogList: [],
    };
}

export default function HeaderBar() {
    const [state, setState] = React.useState(init());

    const {Header} = Layout;

    const history = useHistory();

    const {TabPane} = Tabs;

    const user = JSON.parse(localStorage.getItem('user'));

    React.useEffect(() => {
        const data = {
            notification: [
                {
                    id: 1,
                    title: '你这周迟到 3 次',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
                    description: '2021-12-24 14:00:00',
                    is_read: false
                },
                {
                    id: 2,
                    title: '你这周总计加班 55 小时',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
                    description: '2021-12-24 08:00:00',
                    is_read: false
                },
                {
                    id: 3,
                    title: '你有五项待办工作未处理',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
                    description: '2021-12-23 08:00:00',
                    is_read: false
                },
                {
                    id: 4,
                    title: '左侧图标用于区分不同的类型',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
                    description: '2021-12-22 18:00:00',
                    is_read: false
                },
                {
                    id: 5,
                    title: '内容最多一行，超出部分自动截断是滴啊上降低及阿斯顿就爱搜',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    description: '2021-12-22 13:00:00',
                    is_read: false
                },
            ],
            message: [
                {
                    id: 1,
                    title: '红红火火 回复了你',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    description: '吃了拉，拉了吃，吃了还得拉；拉了吃，吃了拉，拉了还得吃。',
                    is_read: false
                },
                {
                    id: 2,
                    title: '恍恍惚惚 回复了你',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    description: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                    is_read: false
                },
                {
                    id: 3,
                    title: 'Eco 回复了你',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    description: 'Python是著名的“龟叔”Guido van Rossum在1989年圣诞节期间，为了打发无聊的圣诞节而编写的一个编程语言。',
                    is_read: false
                }
            ],
            backlog: [
                {
                    id: 1,
                    title: '本月人员考勤情况',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    description: '本月人员考勤情况已生成，请做成65页PPT。',
                    is_read: false,
                    status: 1
                },
                {
                    id: 2,
                    title: '本月月报汇总',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    description: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                    is_read: false,
                    status: 2
                },
                {
                    id: 3,
                    title: '紧急BUG修改',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    description: 'Python是著名的“龟叔”Guido van Rossum在1989年圣诞节期间，为了打发无聊的圣诞节而编写的一个编程语言。',
                    is_read: false,
                    status: 3
                },
                {
                    id: 4,
                    title: '版本发布',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
                    description: 'PHP8 alpha2发布了，最近引入了一个新的关键字：match, 这个关键字的作用跟switch有点类似。',
                    is_read: false,
                    status: 4
                },
            ]
        };

        setState(state => ({
            ...state,
            notificationList: data.notification,
            messageList: data.message,
            backlogList: data.backlog,
            notificationNum: data.notification.length,
            messageNum: data.message.length,
            backlogNum: data.backlog.length,
        }))
    }, [])

    const handleStyle = (readonly) => {
        if (readonly) {
            return {opacity: '.4'};
        }
        return {};
    };

    function handleBacklogItem(title, status) {
        let tag = '';
        if (status === 1) {
            tag = <Tag color="magenta">未开始</Tag>;
        } else if (status === 2) {
            tag = <Tag color="orange">进行中</Tag>;
        } else if (status === 3) {
            tag = <Tag color="red">即将过期</Tag>
        } else {
            tag = <Tag color="green">已完成</Tag>
        }
        return <div>
            <span>{title}</span>
            {tag}
        </div>;
    }

    const menu = (
        <Menu onClick={onMenuClick}>
            <Menu.Item key="userInfo">个人设置</Menu.Item>
            <Menu.Item key="outLogin">退出登录</Menu.Item>
        </Menu>
    );

    const menuMsg = (
        <Menu selectable={false}>
            <Menu.Item key="message">
                <Tabs className="message-tab" defaultActiveKey="1" onChange={callback} centered>
                    <TabPane tab={state.notificationNum > 0 ? "通知 (" + state.notificationNum + ")" : "通知"} key="1">
                        <List
                            itemLayout="horizontal"
                            dataSource={state.notificationList}
                            split={false}
                            renderItem={item => (
                                <List.Item className="item-info" onClick={() => handleMessageItem(item.id)} style={handleStyle(item.is_read)}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={item.title}
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane tab={state.messageNum > 0 ? "消息 (" + state.messageNum + ")" : "消息"} key="2">
                        <List
                            className="comment-list"
                            itemLayout="horizontal"
                            dataSource={state.messageList}
                            renderItem={item => (
                                <List.Item className="item-info" onClick={() => handleMessageItem(item.id)} style={handleStyle(item.is_read)}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={item.title}
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane tab={state.backlogNum > 0 ? "待办 (" + state.backlogNum + ")" : "待办"} key="3">
                        <List
                            className="comment-list"
                            itemLayout="horizontal"
                            dataSource={state.backlogList}
                            renderItem={item => (
                                <List.Item className="item-detail" onClick={() => handleMessageItem(item.id)} style={handleStyle(item.is_read)}>
                                    <List.Item.Meta
                                        title={handleBacklogItem(item.title, item.status)}
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                </Tabs>
                <div>
                    <Button className="clear" onClick={handleClear} >清除未读</Button>
                    <Button className="more" type="primary" onClick={handleMore}>查看更多</Button>
                </div>
            </Menu.Item>
        </Menu>
    );

    function onMenuClick(e) {
        if (e.key === 'outLogin') {
            localStorage.removeItem('user');
            history.push('/login');
        } else if (e.key === 'userInfo') {
            history.push('/account/setting');
            setState({
                ...state,
                visible: false
            });
        }
    }

    function handleVisibleChange(flag) {
        setState({
            ...state,
            visible: flag
        });
    }

    function handleMessageChange() {
        setState({
            ...state,
            visibleMsg: !state.visibleMsg
        });
    }

    function callback(key) {
        setState({
            ...state,
            tagKey: key
        });
    }

    function handleMessageItem(id) {
        let arr;
        if (state.tagKey === '2') {
            let num = state.messageNum;
            arr = state.messageList.map(value => {
                if (value.id === id && value.is_read === false) {
                    value.is_read = true
                    num -= 1;
                }
                return value;
            })
            setState(state => ({
                ...state,
                messageList: arr,
                messageNum: num,
            }));
        } else if(state.tagKey === '3') {
            let num = state.backlogNum;
            arr = state.backlogList.map(value => {
                if (value.id === id && value.is_read === false) {
                    value.is_read = true
                    num -= 1;
                }
                return value;
            })
            setState(state => ({
                ...state,
                backlogList: arr,
                backlogNum: num,
            }));
        } else {
            let num = state.notificationNum;
            arr = state.notificationList.map(value => {
                if (value.id === id && value.is_read === false) {
                    value.is_read = true;
                    num -= 1;
                }
                return value;
            })
            setState(state => ({
                ...state,
                notificationList: arr,
                notificationNum: num,
            }));
        }

    }

    function handleClear() {
        if (state.tagKey === '2') {
            setState({
                ...state,
                messageList: state.messageList.map(value => {
                    if (value.is_read === false) {
                        value.is_read = true;
                    }
                    return value;
                }),
                messageNum: 0
            });
        } else if(state.tagKey === '3') {
            setState({
                ...state,
                backlogList: state.backlogList.map(value => {
                    if (value.is_read === false) {
                        value.is_read = true;
                    }
                    return value;
                }),
                backlogNum: 0
            });
        } else {
            setState({
                ...state,
                notificationList: state.notificationList.map(value => {
                    if (value.is_read === false) {
                        value.is_read = true;
                    }
                    return value;
                }),
                notificationNum: 0
            });
        }
        message.success('清除未读');
    }

    function handleMore() {
        message.success('点击查看更多');
    }

    return (
        <Header>
            <div className="github">
                <a href="https://github.com/EcoIris/eco-auth-admin" title="疑难杂症" rel="noreferrer" target="_blank">
                    <QuestionCircleOutlined />
                </a>
            </div>
            <Dropdown overlay={menuMsg} trigger={['click']} visible={state.visibleMsg} placemen="bottomRight" onVisibleChange={handleMessageChange}>
                <a className="message-count" onClick={handleMessageChange}>
                    <Badge count={state.notificationNum + state.messageNum + state.backlogNum} offset={[10, -6]}>
                        <BellOutlined/>
                    </Badge>
                </a>
            </Dropdown>
            <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={state.visible}>
                <div className="ant-dropdown-link">
                    <img className="custom-img" src={user ? user.image : ''} alt=""/>
                    <span>{user ? user.username : ''}</span>
                </div>
            </Dropdown>
        </Header>
    );
}