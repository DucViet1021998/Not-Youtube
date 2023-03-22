import { useState, useEffect } from 'react';

import { Layout, theme } from 'antd';

import HeaderDashboard from './HeaderDashboard';
import request from "~/utils/request";
const { Content } = Layout;

const AdminLayout = ({ children }) => {
    const [user, setUser] = useState([])

    const {
        token: { colorBgContainer, colorText },
    } = theme.useToken();

    useEffect(() => {
        async function getUsers() {
            try {
                const users = await request.get('current-user')
                return setUser(users.data)
            }
            catch (error) {
                console.log(error);
            }
        }
        getUsers()
    }, []);

    return (
        <Layout hasSider style={{ height: '100vh' }}   >
            <Layout className="site-layout" >
                <div
                    style={{
                        top: 0,
                        position: 'sticky'
                    }}
                >
                    {user.map((u, i) => (
                        <HeaderDashboard key={i} data={u} />
                    ))}

                </div>

                <Content
                    style={{
                        overflow: 'auto',
                        padding: '10px'
                    }}
                >
                    <div
                        style={{
                            color: colorText,
                            minHeight: "100vh",
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </div>
                </Content>
            </Layout>

        </Layout >
    )
}

export default AdminLayout;
