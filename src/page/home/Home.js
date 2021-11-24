import React from 'react';
import {Statistic, Col, Row} from 'antd';
import {Line, Column, Pie, G2} from '@ant-design/charts';
import {
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';
import MessageTooltip from "../../components/MessageTooltip";


const CityFoodColumn = () => {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        xField: 'city',
        yField: 'value',
        seriesField: 'type',
        isGroup: 'true',
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
    };

    return <Column {...config} />;
};

const Country = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        xField: 'year',
        yField: 'gdp',
        seriesField: 'name',
        yAxis: {
            label: {
                formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
            },
        },
        legend: {
            position: 'top',
        },
        smooth: true,
        // @TODO 后续会换一种动画方式
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
    };

    return <Line {...config} />;
}

const CatePie = () => {
    const G = G2.getEngine('canvas');
    const data = [
        {
            type: '分类一',
            value: 100,
        },
        {
            type: '分类二',
            value: 200,
        },
        {
            type: '分类三',
            value: 300,
        },
        {
            type: '分类四',
            value: 100,
        },
        {
            type: '分类五',
            value: 100,
        },
        {
            type: '其他',
            value: 200,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        legend: false,
        label: {
            type: 'spider',
            labelHeight: 40,
            formatter: (data, mappingData) => {
                const group = new G.Group({});
                group.addShape({
                    type: 'circle',
                    attrs: {
                        x: 0,
                        y: 0,
                        width: 40,
                        height: 50,
                        r: 5,
                        fill: mappingData.color,
                    },
                });
                group.addShape({
                    type: 'text',
                    attrs: {
                        x: 10,
                        y: 8,
                        text: `${data.type}`,
                        fill: mappingData.color,
                    },
                });
                group.addShape({
                    type: 'text',
                    attrs: {
                        x: 0,
                        y: 25,
                        text: `${data.value}个 ${data.percent * 100}%`,
                        fill: 'rgba(0, 0, 0, 0.65)',
                        fontWeight: 700,
                    },
                });
                return group;
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };
    // const config = cfg;
    return <Pie {...config} />;
};

export default function Home() {
    return (
        <div className="site-card-wrapper">
            <Row gutter={[24, 24]}>
                <Col span={6}>
                    <Statistic
                        title={'总销售额'}
                        value={112893}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                    />
                    <MessageTooltip title="我是提示信息"/>
                </Col>
                <Col span={6}>
                    <Statistic
                        title="访问量"
                        value={5646}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined  />}
                        suffix="%"
                    />
                </Col>
                <Col span={6}>
                    <Statistic title="订单量" value={1128}/>

                </Col>
                <Col span={6}>
                    <Statistic title="退款比例" value={93} suffix="/ 1128" />
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{padding: '20px 0'}}>
                    <Country />
                </Col>
            </Row>
            <Row>
                <Col span={12} style={{padding: '20px 0'}}>
                    <CityFoodColumn />
                </Col>
                <Col span={11}>
                    <CatePie />
                </Col>
            </Row>
        </div>
    );
}