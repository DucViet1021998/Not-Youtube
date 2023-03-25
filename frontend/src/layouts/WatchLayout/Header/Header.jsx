import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Input, theme, Tooltip, Menu, Row, Col, Form, AutoComplete } from 'antd';
import { MoreOutlined, FormOutlined, UserOutlined, CloseCircleFilled, VideoCameraAddOutlined } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';


import classNames from 'classnames/bind';
import { Store } from '~/store/store';
import request from "~/utils/request";
import images from '~/assets/images';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Appearance', 'sub1', <FontAwesomeIcon icon={faCircleHalfStroke} />, [
        getItem(null, null, null, [getItem('Dark theme', 'dark', <FontAwesomeIcon icon={faMoon} />),
        getItem('Light theme', 'light', <FontAwesomeIcon icon={faSun} />)], 'group'),
    ]),

    getItem(<Link to={'/register'}>Sign up</Link>, 'sub2', <FormOutlined />),
    getItem(<Link to={'/add-song'}>Create</Link>, 'create', <VideoCameraAddOutlined />),
];


function Header() {
    const [valueInput, setValueInput] = useState('')
    const [options, setOptions] = useState([]);

    const navigate = useNavigate()
    const store = useContext(Store)

    const handleResult = (value) => !value ? [] : value.map((val, i) => (
        {
            value: val,
            label: (

                <span key={i}>
                    {val}
                </span>

            )
        }
    ))


    useEffect(() => {
        const getSong = async () => {
            try {
                if (valueInput !== '') {
                    const response = await request.post('search', {
                        search: valueInput
                    })
                    setOptions(handleResult(response.data))
                }
            } catch (error) {
                if (error.response.status === 400) {
                    setOptions([])
                }
                console.log(error);
            }
        }
        getSong()
    }, [valueInput])



    const onFinish = async (values) => {
        if (values.search === undefined || values.search === ' ' || values.search === '') {
            return
        } else navigate(`/search/${values.search}`);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        localStorage.setItem('mode', store.currentTheme);
    }, [store.currentTheme])

    const onClick = (e) => {
        if (e.key === 'light') {
            store.setCurrentTheme('light');
        }
        if (e.key === 'dark') {
            store.setCurrentTheme('dark');
        }

    };

    const handleSearch = (value) => {
        navigate(`/search/${value}`)
    }


    const handleKeyUp = (e) => {
        setValueInput(e.target.value);
    }

    const handleClearInput = () => {
        setValueInput('')
        setOptions([])
    }

    const handleOnchangeInput = (e) => {
        const inputValue = e.target.value
        if (!inputValue.startsWith(' ', 0)) {
            setValueInput(inputValue);
        }

    }

    const {
        token: { colorHeader, colorLogin, borderLogin, colorBgBase },
    } = theme.useToken();


    return (
        <header style={{ backgroundColor: colorHeader }} className={cx('wrapper')}>

            <Row
                wrap={false}
                style={{ color: 'red' }}
                justify={"space-between"}
            >


                <Col span={3}>

                    {/* Logo Youtube */}
                    <Link to={'/'} className={cx('logo-link')}>
                        <img className={cx('logo')} src={images.logo} alt='Logo' />
                        <span className={cx('label-logo')}  >Not Youtube</span>
                    </Link>
                    {/* END OF Logo Youtube */}
                </Col>



                {/* Search Video Youtube in Database */}
                <Col xs={0} sm={8}>
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            name="search"
                        >
                            <AutoComplete
                                style={{
                                    width: "100%",
                                }}
                                options={options}
                                onSelect={handleSearch}
                            >
                                <div className={cx('search')}>
                                    <Input
                                        value={valueInput}
                                        onChange={handleOnchangeInput}
                                        onKeyUpCapture={handleKeyUp}
                                        allowClear={{ clearIcon: <CloseCircleFilled onClick={handleClearInput} /> }}
                                        spellCheck={false}
                                        bordered={false}
                                        placeholder="Search videos"
                                    />

                                    <Button className={cx('search-btn')} htmlType="submit" >
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </Button>
                                </div>
                            </AutoComplete>
                        </Form.Item>
                    </Form>
                </Col>
                {/* END OF Search Video Youtube in Database */}


                {/* Actions */}
                <Col xs={3} sm={5}  >
                    <div className={cx('actions')}>

                        <Tooltip
                            overlayStyle={{
                                marginTop: "-5px",
                            }}
                            overlayInnerStyle={{
                                backgroundColor: colorBgBase,
                                padding: '16px 0 8px',
                                borderRadius: "12px",
                            }}
                            placement="bottomRight"
                            arrow={false}
                            trigger='click'
                            title={
                                <Menu
                                    onClick={onClick}
                                    style={{ width: 200 }}
                                    mode="inline"
                                    items={items} />}
                        >
                            <Button style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                            }} type='default' size='large' shape="circle" ><MoreOutlined /></Button>
                        </Tooltip>

                        <Link to={'/login'}>
                            <Button
                                className={cx('login-btn')}
                                style={{
                                    color: colorLogin,
                                    borderColor: borderLogin
                                }}
                                type="default" icon={<UserOutlined />} size='medium' shape='round'>
                                Sign in
                            </Button>
                        </Link>
                    </div>

                </Col>
                {/* END OF Actions */}
            </Row >

        </header >
    );
}

export default Header;