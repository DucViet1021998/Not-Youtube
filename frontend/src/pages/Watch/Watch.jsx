import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Col, Row, theme, Avatar, Tooltip } from 'antd';
import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { v4 as id } from 'uuid';
import classNames from 'classnames/bind';


import request from "~/utils/request";
import MiniVideo from "~/components/MiniVideos";
import styles from './Watch.module.scss';
import Description from './Description'

const cx = classNames.bind(styles);


function Watch() {

    const [video, setVideo] = useState([])
    const [miniVideo, setMiniVideo] = useState([])
    const routeParams = useParams();

    const {
        token: { colorBgDescriptions },
    } = theme.useToken();

    // Get Song for Main video
    useEffect(() => {
        async function getSongs() {
            try {
                const response = await request.get(`watch/${routeParams.songId}`)
                setVideo(response.data)
            } catch (error) {
                console.log("error Data!");
            }
        }
        getSongs()
    }, [routeParams.songId])
    // END OF Get Song for Main video


    // Get Song for Mini videos
    useEffect(() => {
        async function getSongs() {
            try {
                const response = await request.get('get-songs')
                setMiniVideo(response.data)
            } catch (error) {
                console.log("error Data!");
            }
        }
        getSongs()
        document.title = video.title;
    }, [routeParams.songId, video.title])
    // END OF Get Song for Mini videos




    return (<>
        {/* LEFT SIDE */}
        <Row gutter={[24, 16]}>
            <Col className={cx("container-left")}
                lg={18} sm={24} xs={24} >

                {/* Main Video */}
                <ReactPlayer
                    playing
                    className={cx("video")}
                    width={"100%"}
                    controls url={video.video_url} />
                {/* END OF Main Video */}

                {/* Title Video and Channel Youtube */}
                <h2 className={cx("title")}>{video.title}</h2>
                {/* END OF Title Video and Channel Youtube */}


                <div className={cx("channel-container")}>
                    {/* Avatar Channel */}
                    <Avatar className={cx("avatar")} src={video.channel_avatar} />
                    {/* END OF Avatar Channel */}

                    {/* Name Channel */}
                    <a href={video.channel_url}>
                        <h4 className={cx("name-channel")}>
                            <Tooltip color={'#616161'} title={video.channel} placement="top">
                                {video.channel}
                            </Tooltip>
                        </h4>
                    </a>
                    {/* END OF Name Channel */}


                    {/* Verified Channel */}
                    {video.verified &&
                        <span className={cx("check")}>
                            <Tooltip color={'#616161'} placement="top" title='Verified'>
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </Tooltip>
                        </span>}
                    {/* END OF Verified Channel */}

                    {/* Subscribers Channel */}
                    <span className={cx("subscriber")}>
                        <Tooltip color={'#616161'} title={video.subscriber_count} placement="top">
                            {video.subscriber_count_text} subscribers
                        </Tooltip>
                    </span>
                    {/* END OF Subscribers Channel */}
                </div>

                <Row>
                    {/* Descriptions Container */}
                    <div style={{ backgroundColor: colorBgDescriptions }} className={cx("container-descriptions")}>
                        <h3 className={cx("tittle-descriptions")}>
                            {video.view_count} views Premiered on {dayjs(video.publish_date).format('D MMMM, YYYY')}
                        </h3>
                        <p className={cx("description")}>

                            <Description data={video.description} />

                        </p>
                    </div>
                    {/* END OF Descriptions Container */}
                </Row>
            </Col>
            {/*END OF LEFT SIDE */}

            {/* RIGHT SIDE */}
            <Col style={{ minHeight: '100vh' }} lg={6} sm={0} xs={0}>
                {/* Loop Mini Videos */}
                {miniVideo.map((vid) => (
                    <Row key={id()}>
                        <MiniVideo key={id()} data={vid} />
                    </Row>
                ))}
                {/* END OF Loop Mini Videos */}

            </Col>
            {/* END OF RIGHT SIDE */}

        </Row>
    </>)
}

export default Watch;