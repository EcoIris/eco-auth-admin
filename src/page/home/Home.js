import {Statistic, Row, Col, Button} from 'antd';

export default function Home() {
    return (
        <Row align="middle" style={{margin: '20px 50px'}}>
            <Col span={4}>
                <Statistic title="Active Users" value={112893}/>
            </Col>
            <Col span={4}>
                <Statistic title="Account Balance (CNY)" value={112893} precision={2}/>
                <Button style={{marginTop: 16}} type="primary">
                    Recharge
                </Button>
            </Col>
            <Col span={4}>
                <Statistic title="Active Users" value={112893} loading/>
            </Col>
        </Row>
    );
}