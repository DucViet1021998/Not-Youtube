
// import classNames from 'classnames/bind';
// import styles from './Sidebar.module.scss';
// const cx = classNames.bind(styles);

import { UserOutlined, HomeOutlined, FormOutlined, FireOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '~/store/store';



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
    getItem(<Link to={'/'}>Home</Link>, '1', <HomeOutlined />),
    getItem(<Link to={'/login'}>Log in</Link>, '2', <UserOutlined />),
    getItem(<Link to={'/register'}>Sign up</Link>, '3', <FormOutlined />),
    getItem(<Link to={'/trending'}>Trending</Link>, '4', <FireOutlined />),

];
function Sidebar() {
    const store = useContext(Store);
    const theme = store.currentTheme


    return (
        <Sider
            breakpoint='md'
            collapsible
            theme={theme}

        >
            <Menu
                defaultSelectedKeys={['1']}
                items={items}
            // theme={theme}
            />

        </Sider >

    );
}

export default Sidebar;