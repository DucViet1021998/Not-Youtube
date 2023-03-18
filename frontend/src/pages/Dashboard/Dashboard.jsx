import { useContext, useState, useEffect } from "react";
import { Layout, theme, Col, Row, Button, Image, Spin } from "antd";
import { Store } from "~/store/store";
import { v4 as id } from 'uuid';
import VideoCard from "~/components/VideoCards/VideoCard";
import images from "~/assets/images";

import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { DownloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import request from "~/utils/request";

const cx = classNames.bind(styles);
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
            color: 'blue'
        }}
        spin
    />
);
const { Content } = Layout;

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState([])

    const store = useContext(Store)
    const navigate = useNavigate()
    const userId = store.user[0]._id;

    useEffect(() => {

        async function getSongs() {
            try {
                setLoading(true);
                const response = await request.get('user-songs')
                setVideo(response.data)
                setLoading(false)

            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
        getSongs()
        document.title = 'Not Youtube';
    }, [userId])

    const {
        token: { colorBgContainer, colorText, colorBgDBEmpty, colorBgDBBtnEmpty },
    } = theme.useToken();


    return (
        <>
            {loading
                ?
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
                (video.length === 0 && <div
                    style={{
                        minHeight: "80vh",
                        backgroundColor: colorBgDBEmpty,
                        color: colorText,
                    }}
                    className={cx("container-empty")}>

                    <Image fallback={images.noImage} preview={false} src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" alt='monkey' />

                    <h2 className={cx("title-empty")}>No data available</h2>

                    <Button
                        style={{
                            backgroundColor: colorBgDBBtnEmpty,
                            color: '#ffff',
                            width: "200px",
                            border: '1px solid #ffff'
                        }}
                        danger
                        size="large" icon={<DownloadOutlined />} onClick={() => navigate('/album')} >
                        Add your video
                    </Button>
                </div>)
                ||
                <Content
                    style={{
                        minHeight: "100vh",
                        background: colorBgContainer,
                        color: colorText,
                    }}
                >

                    <h1 style={{ marginBottom: '16px' }}>Your Album</h1>

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
            }
        </>

    )

}

export default Dashboard;