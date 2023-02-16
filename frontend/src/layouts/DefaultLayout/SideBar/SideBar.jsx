import { Layout, Menu } from 'antd';
import { HomeFilled, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';



const { Sider } = Layout;
const cx = classNames.bind(styles);
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
                className={cx('Menu-icon')}
                mode="vertical"
                defaultSelectedKeys={['1']}

                items={[
                    {
                        key: '1',
                        icon: <HomeFilled />,
                        label: 'Home',
                    },
                    {
                        key: '2',
                        icon: <UserOutlined />,
                        label: 'Login',
                    },
                ]}
            />
        </Sider >

    );
}

export default Sidebar;