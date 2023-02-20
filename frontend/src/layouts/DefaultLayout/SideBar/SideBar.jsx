// import { Layout, Menu } from 'antd';
// import { HomeFilled, UserOutlined } from '@ant-design/icons';
// import classNames from 'classnames/bind';
// import styles from './Sidebar.module.scss';
// const cx = classNames.bind(styles);

import { UserOutlined, HomeFilled, FormOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem(<Link to={'/'}>Home</Link>, '1', <HomeFilled />),

    getItem(<Link to={'/login'}>Log in</Link>, '2', <UserOutlined />,
    ),

    getItem(<Link to={'/register'}>Sign up</Link>, '3', <FormOutlined />,
    ),
];
function Sidebar() {


    return (
        <Sider style={
            {
                overflow: 'auto',
                height: '100vh'
            }}
            theme='light'
            breakpoint='md'
            collapsible
        >


            <Menu

                defaultSelectedKeys={['1']}
                items={items}
            />

        </Sider >

    );
}

export default Sidebar;