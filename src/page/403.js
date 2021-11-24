import {Result} from 'antd';

export default function NotFound() {
    return <Result
        status="403"
        title="403"
        subTitle="对不起，您没有权限访问此页面。"
    />;
}