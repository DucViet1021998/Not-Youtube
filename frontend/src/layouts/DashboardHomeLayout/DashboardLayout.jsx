

import { Layout, theme } from 'antd';
import axios from 'axios';


import { useEffect } from 'react';
import HeaderDashboard from './HeaderDashboard';
import SideBarDashboard from './SideBarDashboard';


const { Content } = Layout;
function DashboardLayout({ children }) {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {

        // GỌI USER LẦN ĐẦU KHI LOGIN THÀNH CÔNG
        async function getUsers() {
            const accessToken = localStorage.getItem('accessToken')
            const refreshToken = localStorage.getItem('refreshToken')
            try {
                const users = await axios.get('http://localhost:3023/', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })
                return users
            }


            // KHI ACCESS TOKEN HẾT HẠN THÌ CALL API REFRESH TOKEN
            catch (error) {

                // Refresh Token 
                const response = await axios.post('http://localhost:3023/refresh-token',
                    {
                        refreshToken: refreshToken
                    })
                localStorage.setItem("accessToken", response.data.accessToken);
                // Return Function
                return getUsers()
            }
        }
        getUsers()

    }, []);





    return (
        <Layout  >

            <SideBarDashboard />

            <Layout className="site-layout"
                style={{
                    position: 'relative'
                }}>

                <HeaderDashboard />

                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >

                    <div
                        style={{
                            padding: 24,
                            minHeight: 2000,
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

export default DashboardLayout;