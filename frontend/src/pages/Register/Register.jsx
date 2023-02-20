import { Button, Form, Input, Select, message } from 'antd';
import React from 'react';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';
const { Option } = Select;


// import classNames from 'classnames/bind';
// import styles from './register.module.scss';
// const cx = classNames.bind(styles);

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 10,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};



const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};



const Register = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            const response = await axios.post("http://localhost:3023/register", values);
            if (response.status === 200) {
                return navigate('/login')
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'This is an error message',
            });
        }
    };



    return (
        <div>
            <div>
                <h1>Register</h1>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}

                    style={{
                        maxWidth: 600,
                    }}
                    scrollToFirstError
                >

                    {/* Input Email */}
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },

                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* END OF Input Email */}

                    {/* Input Username */}
                    <Form.Item
                        name="username"
                        label="Username"
                        tooltip="Used to Sign in"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    {/* END OF Input Username */}

                    {/* Input PassWord */}
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            // {
                            //     min: 6,
                            //     message: 'danh du 6 ky tu',
                            // },

                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    {/* END OF Input PassWord */}

                    {/* Input PassWord */}
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    {/* END OF Input PassWord */}

                    {/* Select Gender */}
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select gender!',
                            },
                        ]}
                    >
                        <Select placeholder="select your gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">BeDe</Option>
                        </Select>
                    </Form.Item>

                    {/* END OF Select Gender */}

                    {/* Button Submit */}
                    {contextHolder}
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                    {/* END OF Button Submit */}

                </Form>
            </div>
        </div>
    );
};
export default Register;