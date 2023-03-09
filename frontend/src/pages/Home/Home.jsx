
import { Layout, theme, Col, Row } from "antd";
import VideoCard from "~/components/VideoCards/VideoCard";
import { useEffect, useState } from 'react';
import { v4 as id } from 'uuid';

import request from '~/utils/request'
const { Content } = Layout;

function Home() {
    const [video, setVideo] = useState([])

    useEffect(() => {
        async function getSongs() {
            try {
                const response = await request.get('get-songs')
                setVideo(response.data)
            } catch (error) {
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
        <Content style={{
            minHeight: "100vh",
            background: colorBgContainer,
            color: colorText,
        }}>

            <Row gutter={[16, 16]}>
                {video.map((vid) => (
                    <Col key={id()}
                        lg={8}
                        sm={12}
                        xs={24}
                    >
                        <VideoCard key={id()} data={vid} />
                    </Col>
                ))}
            </Row>

        </Content >
    )
}

export default Home;