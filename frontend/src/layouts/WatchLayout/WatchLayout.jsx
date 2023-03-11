import { Layout, theme } from 'antd';
import Header from './Header';
const { Content } = Layout;

const WatchLayout = ({ children }) => {
    const {
        token: { colorBgContainer, colorText },
    } = theme.useToken();

    return (

        <Layout style={{ minHeight: '100vh' }}  >

            <Layout className="site-layout">
                <div
                    style={{
                        zIndex: 99,
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


export default WatchLayout;
