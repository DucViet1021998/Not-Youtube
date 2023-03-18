import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import dayjs from "dayjs";

import { Col, Row, theme, Avatar, Tooltip, Input, Form, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { v4 as id } from 'uuid';
import request from "~/utils/request";
import { Store } from '~/store/store';

import MiniVideo from "~/components/MiniVideos";

import classNames from 'classnames/bind';
import styles from './DBWatch.module.scss';
import Description from './Description'
import Comments from './Comments'


const cx = classNames.bind(styles);



function DBWatch() {

    const [video, setVideo] = useState([])
    const [miniVideo, setMiniVideo] = useState([])
    const routeParams = useParams();
    const store = useContext(Store)


    const {
        token: { colorBgDescriptions },
    } = theme.useToken();

    useEffect(() => {

        async function getSongs() {
            try {
                const response = await request.get(`dashboard/watch/${routeParams.songId}`)
                setVideo(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        getSongs()
    }, [routeParams.songId])


    useEffect(() => {
        async function getSongs() {
            try {
                const response = await request.get('user-songs')
                setMiniVideo(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        getSongs()
        document.title = video.title || 'Not youtube';
    }, [video.title, routeParams.songId])



    const onFinish = async (values) => {
        try {
            const response = await request.post('comment', { ...values, songId: routeParams.songId })
            if (response.status === 200) {
                store.store.setBadge(store.badge + 1)
                localStorage.setItem('notify', JSON.stringify(store.badge + 1))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col className={cx("container")}
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
                            <h4 className={cx("name-channel")}><Tooltip color={'#616161'} title={video.channel} placement="top">{video.channel}</Tooltip></h4>
                            {video.verified && <span className={cx("check")}>
                                <Tooltip color={'#616161'} placement="top" title='Verified'>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                </Tooltip>
                            </span>}


                            <span className={cx("subscriber")}><Tooltip color={'#616161'} title={video.subscriber_count} placement="top">{video.subscriber_count_text} subscribers</Tooltip></span>
                        </div>
                    </a>
                    {/* END OF Title Video and Channel Youtube */}
                    <Row>
                        {/* Descriptions Container */}
                        <div style={{ backgroundColor: colorBgDescriptions }} className={cx("container-descriptions")}>
                            <h3 className={cx("tittle-descriptions")}>
                                {video.view_count} views Premiered on {dayjs(video.publish_date).format('D MMMM, YYYY')}
                            </h3>
                            <div className={cx("description")}>

                                <Description data={video.description} />

                            </div>
                        </div>
                        {/* END OF Descriptions Container */}
                    </Row>
                    <Row>
                        <Col xs={24}>
                            <Form
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <div className={cx("type-cmt")}>
                                    <Avatar
                                        style={{
                                            position: 'absolute',
                                            left: "16px",
                                            top: "20px",
                                        }}
                                        src={store.user[0].avatar} />

                                    <Form.Item name="comment"
                                    // style={{ width: "100%" }}
                                    >
                                        <Input

                                            style={{
                                                borderBottom: '1px solid #616161',
                                                borderRadius: 'none',
                                                width: '90%',
                                                position: 'absolute',
                                                left: "66px",
                                                top: "10px",
                                            }}
                                            placeholder="Add your comment..."
                                            bordered={false} />
                                    </Form.Item>

                                    <Button size="small"
                                        style={{
                                            position: 'absolute',
                                            right: "20px",
                                            top: "50px",
                                            backgroundColor: '#3ea6ff'
                                        }}
                                        shape='round'
                                        type='primary'
                                        className={cx('search-btn')} htmlType="submit" >
                                        Comment
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>

                    <Comments />



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
        </>
    )


}

export default DBWatch;