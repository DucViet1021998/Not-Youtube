import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message, theme, Upload } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined, UploadOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
const cx = classNames.bind(styles);


const Register = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const {
        token: { colorBgLoginForm, boxShadowForm },
    } = theme.useToken();


    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            for (const name in values) {
                formData.append(name, values[name]);
            }
            const res = await axios.post('http://localhost:3023/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/login')
            console.log(res);
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
        <div className={cx('container')}>
            <h3 style={{
                color: '#0164e6',

            }}>Account Register</h3>
            <div
                style={{
                    boxShadow: boxShadowForm,
                    backgroundColor: colorBgLoginForm,
                }} className={cx('form')}
            >
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    style={{
                        maxWidth: "100%",
                    }}
                // scrollToFirstError
                >

                    {/* Input Email */}
                    <Form.Item
                        labelCol={{ span: 24, offset: 0 }}
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
                        <Input
                            style={{
                                backgroundColor: colorBgLoginForm,
                            }}
                            prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    {/* END OF Input Email */}

                    {/* Input Username */}
                    <Form.Item
                        labelCol={{ span: 24, offset: 0 }}

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
                        <Input
                            style={{
                                backgroundColor: colorBgLoginForm,
                            }}
                            prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    {/* END OF Input Username */}


                    {/* Input PassWord */}
                    <Form.Item
                        labelCol={{ span: 24, offset: 0 }}
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            // {
                            //     min: 6,
                            //     message: 'Please input minimum of 8 characters',
                            // },

                        ]}
                        hasFeedback
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
                    {/* END OF Input PassWord */}


                    {/* Input Confirm PassWord */}
                    <Form.Item
                        labelCol={{ span: 24, offset: 0 }}
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        // hasFeedback
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
                                    return Promise.reject(new Error('Not Match Password!'));
                                },
                            }),
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
                    {/* END OF Input Confirm PassWord */}


                    {/* Upload Avatar */}
                    <Form.Item
                        label="Avatar"
                        name={'avatar'}
                        // valuePropName="fileList"
                        // getValueFromEvent={normFile}
                        getValueFromEvent={(event) => {
                            return event?.file;
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please choose your avatar!',
                            },
                        ]}
                    >

                        <Upload
                            listType="picture"
                            multiple={false}
                            beforeUpload={(file) => {
                                if (file.size > 9000000) {
                                    message.error('You can only upload JPG file!');
                                }
                                return false;
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>

                    </Form.Item>

                    {/* END OF Upload Avatar */}


                    {/* Button Submit */}
                    {contextHolder}
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                        }}
                    >
                        <Button
                            style={{
                                backgroundColor: "#4285F4",
                                color: "white",
                            }}
                            type="default" htmlType="submit">
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



