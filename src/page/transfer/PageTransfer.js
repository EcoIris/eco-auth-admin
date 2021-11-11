import React from 'react';
import {Transfer} from 'antd';

export default function PageTransfer(){
    const [mockData, setMockData] = React.useState([]);
    const [targetKeys, setTargetKeys] = React.useState([]);

    React.useEffect(() => {
        const newTargetKeys = [];
        const newMockData = [];
        for (let i = 0; i < 2000; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                newTargetKeys.push(data.key);
            }
            newMockData.push(data);
        }

        setTargetKeys(newTargetKeys);
        setMockData(newMockData);
    }, []);

    const onChange = (newTargetKeys, direction, moveKeys) => {
        console.log(newTargetKeys, direction, moveKeys);
        setTargetKeys(newTargetKeys);
    };

    return (
        <>
            <Transfer
                dataSource={mockData}
                targetKeys={targetKeys}
                onChange={onChange}
                render={item => item.title}
                pagination
                showSearch={true}
                listStyle={{
                    width: 250,
                    height: 480,
                }}
                titles={['左标题', '右标题']}
            />
        </>
    );
};
