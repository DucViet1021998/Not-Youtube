import { useState } from "react";
import { Col, Row, Form, Input, Button, message, theme } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { v4 as id } from 'uuid';

import MiniVideo from "~/components/MiniVideos/MiniVideo";

import request from "~/utils/request";

import classNames from 'classnames/bind';
import styles from './AddSong.module.scss';
const cx = classNames.bind(styles);

function AddSong() {
    const [miniVideo, setMiniVideo] = useState([])
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        try {
            const response = await request.post("add-song", values);
            if (response.status === 200) {
                setMiniVideo(pre => [...pre, response.data])
                messageApi.open({
                    type: 'success',
                    content: 'The song be added the Database successfully!',
                });
            };


        } catch (error) {
            if (error.response.status === 400) {
                messageApi.open({
                    type: 'warning',
                    content: 'Already in the Database',
                });
            } else if (error.response.status === 500) {
                messageApi.open({
                    type: 'error',
                    content: 'INCORRECT URL!',
                });
            } else if (error.response.status === 403) {
                messageApi.open({
                    type: 'error',
                    content: 'Your Link Error Data',
                });
            }
            console.log(error);

        }
    };

    const {
        token: { colorText, colorBgLoginForm, boxShadowForm },
    } = theme.useToken();


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };




    return (

        <>
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
                                        message: 'Gắn link đi pạnn hiền!!!',
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
                                    allowClear={true} placeholder="Dán Link Youtube của pạnn!" prefix={<SmileOutlined />} />

                            </Form.Item>
                            <Form.Item
                            // labelCol={{ span: 2, offset: 0 }}

                            >
                                {contextHolder}
                                <Button

                                    wrapperCol={{
                                        // offset: 8,
                                        span: 24,
                                    }}

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
                        <h2 className={cx("title-right")}>Your Video You Add!</h2>
                        {miniVideo.map((vid) => (
                            <Row key={id()}>
                                <MiniVideo key={id()} data={vid} />
                            </Row>

                        ))}

                    </div>
                </Col>
            </Row>
        </>


    )
}

export default AddSong;