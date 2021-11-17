import {Statistic, Row, Col} from 'antd';

export default function Home() {
    return (
        <div>
            <Row span={24}>
                <div>欢迎来到首页</div>
            </Row>
            <Row align="middle" style={{margin: '20px 50px'}}>
                <Col span={4}>
                    <Statistic title="Active Users" value={112893}/>
                </Col>
                <Col span={4}>
                    <Statistic title="Account Balance (CNY)" value={112893} precision={2}/>
                </Col>
                <Col span={4}>
                    <Statistic title="Active Users" value={112893} loading/>
                </Col>
            </Row>
        </div>
    );
}