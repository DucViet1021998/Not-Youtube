import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Avatar, Button, Input, Menu, theme, Tooltip, Badge, Row, Col, Form } from 'antd';
import { LoginOutlined, BellOutlined, VideoCameraAddOutlined, CloseCircleFilled } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

import { v4 as id } from 'uuid';
import classNames from 'classnames/bind';

import { Store } from '~/store/store';
import request from '~/utils/request'
import images from '~/assets/images';
import SearchResult from '~/components/SearchResult'
import styles from './HeaderDashboard.module.scss';
import Notification from '../../DashboardDefaultLayout/Notifications'

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

function HeaderDashboard({ data }) {
    const [valueInput, setValueInput] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const routeParams = useParams();
    const navigate = useNavigate()
    const store = useContext(Store)
    const count = store.badge
    console.log(store.currentTheme);
    useEffect(() => {
        const getSong = async () => {
            try {
                if (valueInput !== '') {
                    const response = await request.post('dashboard/search', {
                        search: valueInput
                    })

                    setSearchResult(response.data)
                } else if (valueInput === '') {
                    setSearchResult([])
                }
            } catch (error) {
                console.log(error);
            }
        }
        getSong()
    }, [valueInput])

    const onFinish = async (values) => {
        if (!routeParams.searchtext) {
            navigate(`/search/${values.search}`);
        } else {
            navigate(`/search/${values.search}`)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        localStorage.setItem('mode', store.currentTheme);
    }, [store.currentTheme])

    const onClick = (e) => {
        if (e.key === 'light') {
            store.setCurrentTheme('light');
        } else if (e.key === 'dark') {
            store.setCurrentTheme('dark');
        } else if (e.key === 'logout') {
            handleClickLogout()
        }
    };



    const {
        token: { colorText, colorHeader, colorBgNotifications, colorBgBase },
    } = theme.useToken();
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
    const handelKeyUp = (e) => {
        setValueInput(e.target.value);
        console.log(e.target.value);
    }

    const handleClearInput = () => {
        setValueInput('')
        setSearchResult([])
    }

    const handleOnchangeInput = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setValueInput(searchValue)
        }
    }
    const handleClickNotify = () => {
        localStorage.removeItem('notify')
        store.setBadge(store.badge = 0)
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
                    autoComplete="off"
                >

                    <Form.Item
                        name="search"
                    >
                        <div className={cx('search')}>
                            {/* Popper Search Result */}
                            <Tooltip
                                // destroyTooltipOnHide={true}
                                overlayStyle={{
                                    marginTop: "-5px",

                                }}
                                overlayInnerStyle={{
                                    backgroundColor: '#fff',
                                    maxWidth: 'calc(100vw - 83em)',
                                    width: '400px',
                                    minWidth: '200px',
                                    color: 'black',
                                    padding: '16px 0 8px',
                                    borderRadius: "12px",
                                }}
                                arrow={false}
                                // open={true}
                                trigger="focus"
                                placement='bottomLeft'
                                title={
                                    <Row >
                                        <Col span={24}>
                                            {searchResult.map((u) => (
                                                <SearchResult key={id()} data={u} />
                                            ))}
                                        </Col>
                                    </Row>
                                }
                            >


                                <Input
                                    onKeyUp={handelKeyUp}
                                    value={valueInput}
                                    onChange={handleOnchangeInput}
                                    allowClear={{ clearIcon: <CloseCircleFilled onClick={handleClearInput} /> }}
                                    style={{
                                        color: colorText,
                                    }}
                                    bordered={false}
                                    placeholder="Search videos"
                                    spellCheck={false}
                                />
                            </Tooltip>
                            {/* END OF Popper Search Result */}
                            <Button
                                O
                                htmlType="submit"
                                className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </Button>
                        </div>
                    </Form.Item>
                </Form>

            </Col>
            {/* END OF Search Video Youtube in Database */}




            <Col xs={3} sm={5}  >

                <div className={cx('actions')}>


                    <Tooltip
                        color='#616161'
                        arrow="false"
                        title={"Create"}
                        placement="bottom">
                        <VideoCameraAddOutlined
                            style={{
                                fontSize: '1.5rem',
                                color: colorText,
                            }}
                        />
                    </Tooltip>


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

                </div>
            </Col>
        </Row >

    </header >
    )
}

export default HeaderDashboard;
