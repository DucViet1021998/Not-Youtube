import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
const { Sider } = Layout;

// import classNames from 'classnames/bind';
// import styles from './Sidebar.module.scss';
// const cx = classNames.bind(styles);

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Files', '9', <FileOutlined />),
];


function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            {/* <div
                style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                }}
            /> */}
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>

    );
}

export default Sidebar;