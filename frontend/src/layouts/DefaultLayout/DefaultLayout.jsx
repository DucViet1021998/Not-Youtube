import { Layout, theme } from 'antd';
import Header from './Header';
import SideBar from './SideBar';

const { Content } = Layout;

const DefaultLayout = ({ children }) => {

    const {
        token: { colorBgContainer, colorText },
    } = theme.useToken();

    return (

        <Layout hasSider style={{ height: '100vh' }} >

            <SideBar
                style={{
                    overflow: 'auto',
                    height: '100vh',
                }}
            />

            <Layout className="site-layout">
                <div
                    style={{
                        padding: 0,
                        top: 0,
                        position: 'sticky',
                    }}
                >
                    <Header />
                </div>

                <Content
                    style={{
                        margin: '0 16px',
                        overflow: 'auto',
                    }}
                >

                    <div
                        style={{
                            color: colorText,
                            minHeight: "100vh",
                            padding: 24,
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
