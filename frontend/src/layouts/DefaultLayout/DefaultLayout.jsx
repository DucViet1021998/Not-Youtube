import { Layout, theme } from 'antd';

import Header from './Header';
import SideBar from './SideBar';

// import classNames from 'classnames/bind';
// import styles from './DefaultLayout.module.scss';
// const cx = classNames.bind(styles);



const { Content } = Layout;

const DefaultLayout = ({ children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();



    return (

        <Layout>

            <SideBar style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }} />

            <Layout className="site-layout"
                style={{
                    position: 'relative'
                }}>
                <Header
                    style={{
                        position: 'fixed',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >

                    <div
                        style={{
                            padding: 24,
                            minHeight: 1000,
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </div>
                </Content>

            </Layout>

        </Layout >

    );
};


export default DefaultLayout;
