import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Avatar, Button, Input, Menu, theme, Tooltip, Badge, Row, Col, Form, AutoComplete } from 'antd';
import { LoginOutlined, BellOutlined, VideoCameraAddOutlined, CloseCircleFilled } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

import classNames from 'classnames/bind';

import { Store } from '~/store/store';
import request from '~/utils/request'
import images from '~/assets/images';
import styles from './HeaderDashboard.module.scss';
import Notification from "../Notifications";

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
    getItem('Appearance', '1', <FontAwesomeIcon icon={faCircleHalfStroke} />, [
        getItem(null, null, null, [getItem('Dark theme', 'dark', <FontAwesomeIcon icon={faMoon} />),
        getItem('Light theme', 'light', <FontAwesomeIcon icon={faSun} />)], 'group'),
    ]),
    getItem("Log Out", 'logout', <LoginOutlined />)
];

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

function HeaderDashboard({ data }) {
    const [valueInput, setValueInput] = useState('')
    const [options, setOptions] = useState([]);

    const routeParams = useParams();
    const navigate = useNavigate()
    const store = useContext(Store)
    let count = store.badge


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
                console.log(error);
            }
        }
        getSong()
    }, [valueInput])


    useEffect(() => {
        localStorage.setItem('mode', store.currentTheme);
    }, [store.currentTheme])

    const handleClickLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken')
            const response = await request.post('logout',
                { refreshToken: refreshToken },
            )
            if (response.status === 200) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                store.login = null
                navigate('/')
            }
            else {
                console.log("Error!");
            }
        } catch (error) {
            console.log('error2');
        }
    }

    const onFinish = async (values) => {
        if (values.search === undefined || values.search === ' ' || values.search === '') {
            return
        } else navigate(`/search/${values.search}`);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const handleSearch = (value) => {
        if (!routeParams.searchtext) {
            navigate(`/search/${value}`);
        } else {
            navigate(`/search/${value}`)
        }
    }


    const {
        token: { colorText, colorHeader, colorBgNotifications, colorBgBase },
    } = theme.useToken();


    const onClick = (e) => {
        if (e.key === 'light') {
            store.setCurrentTheme('light');
        } else if (e.key === 'dark') {
            store.setCurrentTheme('dark');
        } else if (e.key === 'logout') {
            handleClickLogout()
        }
    };

    const handleKeyUp = (e) => {
        setValueInput(e.target.value);
    }


    const handleClickNotify = () => {
        localStorage.removeItem('notify')
        store.setBadge(store.badge = 0)
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




    return (<header style={{ backgroundColor: colorHeader }} className={cx('wrapper')}>

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
            <Col span={8}>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
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
                                    // onSearch={onSearch}
                                    placeholder="Search videos"
                                    enterButton
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



            {/* Actions  */}
            <Col xs={3} sm={5}  >
                <div className={cx('actions')}>

                    {/*  Icon Create*/}
                    <Tooltip
                        color='#616161'
                        arrow="false"
                        title={"Create"}
                        placement="bottom">
                        <VideoCameraAddOutlined
                            onClick={() => navigate('/album')}
                            style={{
                                fontSize: '1.5rem',
                                color: colorText,
                            }}
                        />
                    </Tooltip>
                    {/* END OF  Icon Create*/}

                    <div style={{ position: 'relative' }}>
                        <Tooltip
                            arrow={"false"}
                            title={"Notifications"}
                            color='#616161'
                            placement="bottom">
                            <Tooltip
                                overlayStyle={{
                                    marginTop: '-5px',
                                    marginLeft: '-400px',
                                }}
                                overlayInnerStyle={{
                                    overflow: 'auto',
                                    position: 'absolute',
                                    right: '0px',
                                    backgroundColor: colorBgNotifications,
                                    width: '480px',
                                    maxHeight: '640px',
                                    color: colorText,
                                    padding: '16px 0 8px',
                                    borderRadius: "12px",
                                }}
                                arrow={false}
                                trigger='click'
                                title={<Notification data={data} />}
                                placement="bottomRight"
                                align={{ left: "200px" }}
                            >

                                <Badge count={count}>
                                    <BellOutlined
                                        onClick={handleClickNotify}
                                        style={{
                                            fontSize: '1.5rem',
                                            color: colorText,
                                        }}
                                    />

                                </Badge>
                            </Tooltip>
                        </Tooltip>
                    </div>

                    {/* Avatar user and actions inside */}
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
                        title={<Menu
                            onClick={onClick}
                            style={{ width: 200 }}
                            mode="inline"
                            items={items} />}
                    >

                        <Avatar size={35}
                            style={{ cursor: 'pointer' }}
                            src={data.avatar}
                            alt='avatar'
                        />
                    </Tooltip>
                    {/* END OF Avatar user and actions inside */}

                </div>
            </Col>
            {/*END OF Actions  */}

        </Row >

    </header >
    )
}

export default HeaderDashboard;
