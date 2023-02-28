
import { Layout, theme } from 'antd';

import Header from './Header';
import SideBar from './SideBar';
// import classNames from 'classnames/bind';
// import styles from './DefaultLayout.module.scss';
// const cx = classNames.bind(styles);



const { Content } = Layout;

const DefaultLayout = ({ children }) => {

    // const [top, setTop] = useState(10);
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
