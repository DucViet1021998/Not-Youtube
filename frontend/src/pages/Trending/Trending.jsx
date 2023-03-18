import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as id } from 'uuid';

import { Avatar, Col, Row, Spin } from "antd";
import TrendingVideo from "./TrendingVideo";
import classNames from 'classnames/bind';
import styles from './Trending.module.scss';

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

function Trending() {
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState([])
    const routeParams = useParams();

    useEffect(() => {

        async function getSongs() {
            try {
                setLoading(true);
                const response = await request.get(`trending/${routeParams.type}`)
                setVideo(response.data);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log("error Data!");
            }
        }
        getSongs()
    }, [routeParams.type])
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

                : <div>
                    <div className={cx("header")}>
                        <Avatar size={80} src="https://www.youtube.com/img/trending/avatar/trending.png" />
                        <h1 className={cx("text")}>Thịnh hành</h1>
                    </div>
                    <div>
                        {video.map((vid) => (
                            <Row key={id()}>
                                <Col onClick={() => setLoading(true)} key={id()}
                                    lg={16}
                                    sm={12}
                                    xs={24}
                                >
                                    <TrendingVideo key={id()} data={vid} />
                                </Col>
                            </Row>
                        ))}
                    </div>
                </div>
            }
        </>

    )
}

export default Trending;