import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input, message, theme } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import request from "~/utils/request";
import { Store } from '~/store/store';
import styles from './login.module.scss';
const cx = classNames.bind(styles);


const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const store = useContext(Store)
    const navigate = useNavigate()

    const {
        token: { colorBgLoginForm, boxShadowForm },
    } = theme.useToken();



    const onFinish = async (values) => {
        try {

            const response = await request.post("login", values);
            if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                navigate("/dashboard");
                store.login = true;
            }

        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Not Found Your Account!',
            });
        }
    };



    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    return (
        <div className={cx('container')} >
            <h3 style={{
                color: '#0164e6',
                boxShadow: "0 0 30px rgba(#000000, .1)",

            }}>Account login</h3>
            <div
                style={{
                    backgroundColor: colorBgLoginForm,
                    boxShadow: boxShadowForm,
                }}
                className={cx('form')}
            >

                <Form
                    name="basic"
                    style={{
                        maxWidth: "100%",
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        labelCol={{ span: 24, offset: 0 }}

                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input
                            style={{
                                backgroundColor: colorBgLoginForm,
                            }}
                            prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        labelCol={{ span: 24, offset: 0 }}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            style={{
                                backgroundColor: colorBgLoginForm,
                            }}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                    // wrapperCol={{
                    //     offset: 8,
                    //     span: 16,
                    // }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    {contextHolder}
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            // span: 16,
                        }}
                    >
                        <Button
                            style={{
                                backgroundColor: "#4285F4",
                                color: "white",
                            }}
                            type="default"
                            htmlType="submit"
                        >
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
export default Login;