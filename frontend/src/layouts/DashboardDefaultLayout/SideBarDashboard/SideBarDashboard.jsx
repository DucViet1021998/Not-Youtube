import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import {
    HomeOutlined,
    FireOutlined,
    FireFilled,
    CustomerServiceFilled,
    RocketFilled,
    VideoCameraFilled,
    FolderAddOutlined,
} from '@ant-design/icons';
import { Store } from '~/store/store';
const { Sider } = Layout;


// import classNames from 'classnames/bind';
// import styles from './SidebarDashboard.module.scss';
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
    getItem("Home", '/dashboard', <HomeOutlined />),
    getItem("Trending", '4', <FireOutlined />, [
        getItem('NOW', '/trending/dashboard/default', <FireFilled />),
        getItem('MUSIC', '/trending/dashboard/music', <CustomerServiceFilled />),
        getItem('GAMING', '/trending/dashboard/gaming', <RocketFilled />),
        getItem('FILMS', '/trending/dashboard/movies', <VideoCameraFilled />),
    ]),
    getItem('Create Albums', '/album', <FolderAddOutlined />),
];
function Sidebar() {
    const navigate = useNavigate()
    const handleClick = (e) => {
        navigate(e.key)
    }

    const store = useContext(Store);
    const theme = store.currentTheme



    return (
        <Sider style={
            {
                overflow: 'auto',
                height: '100vh'
            }}
            theme={theme}
            breakpoint='md'
            collapsible
        >


            <Menu
                onClick={handleClick}
                mode='inline'
                defaultSelectedKeys={['1']}
                items={items}
            />

        </Sider >

    );
}

export default Sidebar;