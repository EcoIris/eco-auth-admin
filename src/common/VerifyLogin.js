import React from "react";
import {useHistory} from 'react-router-dom';
import {Layout, Spin, BackTop} from "antd";
import SideBar from "../layouts/SideBar";
import Header from "../layouts/HeaderBar";
import {Content} from "antd/lib/layout/layout";
import Footer from "../layouts/FooterBar";
import {
    VerticalAlignTopOutlined
} from '@ant-design/icons';

const style = {
    width: '40px',
    height: '40px',
    overflow: 'hidden',
    color: '#fff',
    backgroundColor: '#00000073',
    borderRadius: '20px',
    fontSize: '24px',
    paddingTop: '10px',
};


export default function VerifyLogin({children}) {

    const history = useHistory();

    let [logged, setLogged] = React.useState(false);

    //验证是否登录
    React.useEffect(() => {
        let user = localStorage.getItem('user');
        if (!user) {
            history.push('/login');
            return;
        }
        if (user) {
            setLogged(true);
        }
    }, [history]);

    return (logged ? <Layout style={{minHeight: '100vh'}}>
            <SideBar/>
            <Layout className="site-layout">
                <Header/>
                <Content style={{margin: '50px 50px'}}>{children}</Content>
                <BackTop>
                    <VerticalAlignTopOutlined style={style}/>
                </BackTop>
                <Footer/>
            </Layout>
        </Layout> : <Spin size="large" style={{position: 'absolute', left: '50%', top: '50%'}}/>);
}