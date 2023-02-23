import { Button, Form, Input, message } from 'antd';
import React from 'react';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';
// const { Option } = Select;


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
            if (error.response.status === 402) {
                messageApi.open({
                    type: 'error',
                    content: 'Email đã đăng kí',
                });
            }
            else if (error.response.status === 500) {
                messageApi.open({
                    type: 'error',
                    content: 'Username đã tồn tại',
                });
            }
        }
    };



    return (
        <div>
            <div>
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
                    <h1>Register</h1>

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
                        <Input.Password placeholder='haha' />
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


                    {/* Button Submit */}
                    {contextHolder}
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="default" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                    {/* END OF Button Submit */}

                </Form>
            </div>
        </div >
    );
};
export default Register;