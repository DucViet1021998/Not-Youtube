import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Store } from "../../store/store";


// import classNames from 'classnames/bind';
// import styles from './login.module.scss';
// const cx = classNames.bind(styles);


const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const store = useContext(Store)
    const navigate = useNavigate()


    const onFinish = async (values) => {
        try {

            const response = await axios.post("http://localhost:3023/login", values);
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
        <div >
            <div>

                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
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
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    {contextHolder}
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
export default Login;