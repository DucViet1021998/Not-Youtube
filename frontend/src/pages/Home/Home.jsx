import { useEffect, useState } from 'react';
import { Layout, theme, Col, Row, Spin } from "antd";

import VideoCard from "~/components/VideoCards/VideoCard";
import { v4 as id } from 'uuid';

import { LoadingOutlined } from '@ant-design/icons';
import request from '~/utils/request'
const { Content } = Layout;

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
            color: 'blue'
        }}
        spin
    />
);

function Home() {
    const [video, setVideo] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getSongs() {
            try {
                setLoading(true);
                const response = await request.get('get-songs')
                setVideo(response.data)
                setLoading(false)

            } catch (error) {
                setLoading(false)
                console.log("error Data!");
            }
        }
        getSongs()
        document.title = 'Not Youtube';
    }, [])



    const {
        token: { colorBgContainer, colorText },
    } = theme.useToken();


    return (
        <>
            {loading ?
                <div
                    style={{
                        height: "100vh",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Spin size="large" indicator={antIcon} />
                </div>
                :
                <Content style={{
                    minHeight: "100vh",
                    background: colorBgContainer,
                    color: colorText,
                }}>

                    <Row gutter={[16, 16]}>
                        {video.map((vid) => (
                            <Col key={vid._id}
                                lg={8}
                                sm={12}
                                xs={24}
                            >
                                <VideoCard key={id()} data={vid} />
                            </Col>
                        ))}
                    </Row>

                </Content >
            }
        </>
    )
}

export default Home;