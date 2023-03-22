import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Avatar, Col, Row, Spin } from "antd";
import DBTrendingVideo from "./DBTrendingVideo";
import { LoadingOutlined } from '@ant-design/icons';


import classNames from 'classnames/bind';
import styles from './DBTrending.module.scss';
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

function DBTrending() {
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
                :
                <div>
                    <div className={cx("header")}>
                        <Avatar size={80} src="https://www.youtube.com/img/trending/avatar/trending.png" />
                        <h1 className={cx("text")}>Thịnh hành</h1>
                    </div>
                    <div onClick={() => setLoading(true)}>

                        {video.map((vid, i) => (
                            <Row key={i}>
                                <Col
                                    xs={22}
                                >
                                    <DBTrendingVideo data={vid} />
                                </Col>
                            </Row>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default DBTrending;