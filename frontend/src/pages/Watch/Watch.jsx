import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import axios from "axios";
import { Col, Row, theme, Avatar, Tooltip } from 'antd';
import { v4 as id } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


import MiniVideo from "~/components/MiniVideos";


import classNames from 'classnames/bind';
import styles from './Watch.module.scss';
const cx = classNames.bind(styles);


function Watch() {
    const [video, setVideo] = useState([])
    const [miniVideo, setMiniVideo] = useState([])
    const routeParams = useParams();
    const {
        token: { colorBgDescriptions },
    } = theme.useToken();

    useEffect(() => {

        async function getSongs() {
            try {
                const response = await axios.get(`http://localhost:3023/watch/${routeParams.songid}`)
                setVideo(response.data)
                // console.log(response.data);
            } catch (error) {
                console.log("error Data!");
            }
        }
        getSongs()
    }, [routeParams.songid])

    useEffect(() => {

        async function getSongs() {
            try {
                const response = await axios.get('http://localhost:3023/get-songs')
                setMiniVideo(response.data)
            } catch (error) {
                console.log("error Data!");
            }
        }
        getSongs()
    }, [routeParams.songi])


    return (<>
        <Row gutter={[24, 16]}>
            <Col className={cx("container-left")}
                lg={18} sm={24} xs={24} >

                {/* Main Video */}
                <ReactPlayer
                    className={cx("video")}
                    width={"100%"}
                    controls url={video.video_url} />
                {/* END OF Main Video */}

                {/* Title Video and Channel Youtube */}
                <h2 className={cx("title")}>{video.title}</h2>
                <a href={video.channel_url}>
                    <div className={cx("channel")}>
                        <Avatar className={cx("avatar")} src={video.channel_avatar} />
                        <h4 className={cx("name-channel")}><Tooltip color={'#909090'} title={video.channel} placement="top">{video.channel}</Tooltip></h4>
                        {video.verified && <span className={cx("check")}>
                            <Tooltip color={'#909090'} placement="top" title='Verified'>
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </Tooltip>
                        </span>}
                        <span className={cx("subscriber")}><Tooltip color={'#909090'} title={video.subscriber_count} placement="top">{video.subscriber_count_text} subscribers</Tooltip></span>
                    </div>
                </a>
                {/* END OF Title Video and Channel Youtube */}
                <Row>
                    <div
                        style={{
                            backgroundColor: colorBgDescriptions
                        }}
                        className={cx("container-descriptions")}
                    >
                        <h3 className={cx("tittle-descriptions")}>{video.view_count} views Premiered on {video.publish_date}</h3>
                        <p className={cx("description")}>{video.description}</p>
                    </div>
                </Row>

            </Col>

            <Col
                style={{
                    // overflow: 'auto',
                    minHeight: '100vh',
                }}
                lg={6} sm={0} xs={0}>
                {miniVideo.map((vid) => (
                    <Row key={id()}>
                        <MiniVideo key={id()} data={vid} />
                    </Row>

                ))}

            </Col>

        </Row>








    </>)



}

export default Watch;