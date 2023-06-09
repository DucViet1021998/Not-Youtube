import { useContext, useEffect, useState } from "react";
import { Col, Row, Form, Input, Button, message, theme } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import { Store } from '~/store/store';
import MiniVideo from "~/components/MiniVideos/MiniVideo";

import request from "~/utils/request";

import classNames from 'classnames/bind';
import styles from './Album.module.scss';
const cx = classNames.bind(styles);




function Album() {
    const [miniVideo, setMiniVideo] = useState([])
    const [songUser, setSongUser] = useState(0)
    const [messageApi, contextHolder] = message.useMessage();
    const store = useContext(Store)

    const userId = store.user[0]._id;


    useEffect(() => {

        async function getSongs() {
            try {
                const response = await request.get('/user-songs/notify')
                setMiniVideo(response.data)
            } catch (error) {
                console.log("error Data!");
            }
        }
        getSongs()
    }, [userId, songUser])



    const onFinish = async (values) => {
        try {
            await request.post("add-album", values)
            setSongUser(songUser + 1)
            store.store.setBadge(store.store.badge + 1)
            localStorage.setItem('notify', JSON.stringify(store.store.badge + 1))
            messageApi.open({
                type: 'success',
                content: 'The song be added your playlist successfully!',
                duration: 3,
            });

        } catch (error) {
            if (error.response.status === 400) {
                messageApi.open({
                    type: 'warning',
                    content: 'Already in the Your List',
                });
            } else if (error.response.status === 403) {
                messageApi.open({
                    type: 'error',
                    content: 'INCORRECT URL!',
                });
            } else if (error.response.status === 406) {
                messageApi.open({
                    type: 'error',
                    content: 'Not add song list!',
                });
            }
            else console.log(error);
        }
    };

    const {
        token: { colorText, colorBgLoginForm, boxShadowForm },
    } = theme.useToken();


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Row>

            {/*  Left Side */}
            <Col className={cx("container-left")}
                lg={16} sm={24} xs={24}
            >
                <div
                    style={{
                        backgroundColor: colorBgLoginForm,
                        boxShadow: boxShadowForm,
                    }}
                    className={cx('form')}
                >

                    <Form
                        // labelCol={{ span: 24, offset: 0 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            labelCol={{ span: 24, offset: 0 }}
                            rules={[
                                {
                                    required: true,
                                    message: `Don't leave it blank`,
                                },
                            ]}
                            name="video_url"
                            label="URL Video"
                        // validateStatus="warning"
                        >

                            <Input
                                style={{
                                    backgroundColor: colorBgLoginForm,
                                }}
                                allowClear={true} placeholder="Paste your video URL!" prefix={<SmileOutlined />} />

                        </Form.Item>
                        <Form.Item >
                            {contextHolder}
                            <Button

                                style={{
                                    backgroundColor: "#4285F4",
                                    color: "white",
                                }}
                                type="default"
                                htmlType="submit">
                                Add your video
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
            {/* END OF Left Side */}

            <Col
                lg={8} sm={0} xs={0}>
                <div
                    style={{
                        boxShadow: boxShadowForm,
                        minHeight: "100vh",
                        color: colorText,
                    }}
                    className={cx("container-right")}>
                    <h2 className={cx("title-right")}>Your Playlist</h2>
                    {miniVideo.map((vid) => (
                        <Row key={vid._id}>
                            <MiniVideo data={vid} />
                        </Row>
                    ))}

                </div>
            </Col>
        </Row>
    )
}

export default Album;