import Header from './Header';


// import classNames from 'classnames/bind';
// import styles from './DefaultLayout.module.scss';
// import Sidebar from './SideBar';

// const cx = classNames.bind(styles);

// function DefaultLayout({ children }) {
//     return (

//         <div className={cx('wrapper')}>

//             <div className={cx('container')}>
//                 <Sidebar />
//                 <div className={cx('content')}>{children}</div>
//             </div>
//         </div>
//     );
// }
// export default DefaultLayout;


import { Layout, theme } from 'antd';
import SideBar from './SideBar';
const { Content } = Layout;


const DefaultLayout = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            {/* <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider> */}
            <SideBar />
            <Layout className="site-layout">
                {/* <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                /> */}
                <Header />

                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >

                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        Bill is a cat.
                    </div>
                </Content>

            </Layout>
        </Layout>
    );
};


export default DefaultLayout;
