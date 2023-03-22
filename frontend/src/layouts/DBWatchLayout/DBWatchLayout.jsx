import { useEffect, useState, useContext } from 'react';
import { Layout, theme } from 'antd';
import HeaderDashboard from './HeaderDashboard';

import { Store } from '~/store/store';

import request from "~/utils/request";

const { Content } = Layout;
function DBWatchLayout({ children }) {
    const [user, setUser] = useState([])

    const {
        token: { colorBgContainer, colorText },
    } = theme.useToken();
    const store = useContext(Store)



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

            <Layout >

                <div
                    style={{
                        paddingRight: "10px",
                        top: 0,
                        position: 'sticky',
                        zIndex: 999,
                    }}
                >

                    {user.map((u, i) => (
                        <HeaderDashboard key={i} data={u} />
                    ))}

                </div>

                <Content
                    style={{
                        margin: '0 16px',
                        // overflow: 'auto',
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
                        {user.map((u, i) => (
                            <Store.Provider key={i} value={{ user, store }}>
                                {children}
                            </Store.Provider>
                        ))}
                    </div>
                </Content>

            </Layout>

        </Layout >
    )
}

export default DBWatchLayout;