import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    UserOutlined,
    HomeOutlined,
    FormOutlined,
    FireOutlined,
    FireFilled,
    CustomerServiceFilled,
    RocketFilled,
    VideoCameraFilled
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
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
    getItem("Home", '/', <HomeOutlined />),
    getItem("Login", '/login', <UserOutlined />),
    getItem("Sign up", '/register', <FormOutlined />),
    getItem("Trending", '4', <FireOutlined />, [
        getItem('NOW', '/trending/now', <FireFilled />),
        getItem('MUSIC', '/trending/music', <CustomerServiceFilled />),
        getItem('GAMING', '/trending/gaming', <RocketFilled />),
        getItem('FILMS', '/trending/movies', <VideoCameraFilled />),
    ]),
];
function Sidebar() {

    const navigate = useNavigate()
    const handleClick = (e) => {
        navigate(e.key)
    }

    const store = useContext(Store);
    const theme = store.currentTheme


    return (
        <Sider
            breakpoint='md'
            collapsible
            theme={theme}
        >
            <Menu
                onClick={handleClick}
                defaultSelectedKeys={['1']}
                items={items}
                mode='inline'
            />

        </Sider >

    );
}

export default Sidebar;