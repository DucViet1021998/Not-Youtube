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

        // GỌI USER LẦN ĐẦU KHI LOGIN THÀNH CÔNG
        async function getUsers() {
            const accessToken = localStorage.getItem('accessToken')
            const refreshToken = localStorage.getItem('refreshToken')
            try {
                const users = await request.get('current-user', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })

                return setUser(users.data)
            }

            // KHI ACCESS TOKEN HẾT HẠN THÌ CALL API REFRESH TOKEN
            catch (error) {
                // Refresh Token 
                if (error.response.status === 401) {
                    const response = await request.post('refresh-token',
                        {
                            refreshToken: refreshToken
                        })
                    localStorage.setItem("accessToken", response.data.accessToken);

                    // Return Function
                    return getUsers()
                }
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
