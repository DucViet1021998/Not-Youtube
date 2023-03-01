import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Input, Menu, theme, Tooltip, Badge } from 'antd';

import { faCircleHalfStroke, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

import { LoginOutlined, BellOutlined, VideoCameraAddOutlined, AudioOutlined } from '@ant-design/icons';

import { Store } from '~/store/store';
import images from '~/assets/images';


import styles from './HeaderDashboard.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


function HeaderDashboard({ data }) {

    const navigate = useNavigate()
    const store = useContext(Store)


    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }


    const onClick = (e) => {
        if (e.key === "light") {
            store.setCurrentTheme("light");
        } else if (e.key === 'dark') {
            store.setCurrentTheme("dark");
        } else if (e.key === 'logout') {
            handleClickLogout()
        } else return
    };

    const {
        token: { colorText, colorHeader },
    } = theme.useToken();
    const handleClickLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken')
            const response = await axios.post('http://localhost:3023/logout',
                { refreshToken: refreshToken },
            )
            if (response.status === 200) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                store.login = false
                navigate('/')
            }
            else {
                console.log("Error!");
            }
        } catch (error) {
            console.log('error2');
        }
    }


    const items = [
        getItem('Appearance', '1', <FontAwesomeIcon icon={faCircleHalfStroke} />, [
            getItem(null, null, null, [getItem('Dark theme', 'dark', <FontAwesomeIcon icon={faMoon} />),
            getItem('Light theme', 'light', <FontAwesomeIcon icon={faSun} />)], 'group'),
        ]),
        getItem("Log Out", 'logout', <LoginOutlined />)
    ];




    return (
        <header
            style={{
                // zIndex: 99,
                backgroundColor: colorHeader,
            }}

            className={cx('wrapper')}>

            <div className={cx('inner')} >

                <Link to={'/'} className={cx('logo-link')}>
                    <img className={cx('logo')} src={images.logo} alt='Logo' />
                    <span className={cx('label-logo')}  >Not Youtube</span>
                </Link>

                <div className={cx('search-container')}>
                    <div className={cx('search')}>
                        <Input style={{
                            color: colorText,
                        }}
                            placeholder="Search videos"
                            spellCheck={false}
                        />

                        <Button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Button>
                    </div>
                    <Tooltip
                        color='#616161'
                        arrow="false"
                        title={"Tạo"}
                        placement="bottom">
                        <AudioOutlined
                            style={{
                                fontSize: '1.5rem',
                                color: colorText,
                            }}
                        />
                    </Tooltip>


                </div>




                <div className={cx('actions')}>


                    <Tooltip
                        color='#616161'
                        arrow="false"
                        title={"Tạo"}
                        placement="bottom">
                        <VideoCameraAddOutlined
                            style={{
                                fontSize: '1.5rem',
                                color: colorText,
                            }}
                        />
                    </Tooltip>

                    <Tooltip
                        arrow={"false"}
                        title={"Thông báo"}
                        color='#616161'

                        placement="bottom">
                        <Badge count={1}>
                            <BellOutlined
                                style={{
                                    fontSize: '1.5rem',
                                    color: colorText,
                                }}
                            />
                        </Badge>
                    </Tooltip>

                    <Tooltip
                        placement="bottomRight"
                        style={{ boxShadow: "none" }}
                        arrow="false"
                        color={"transparent"}
                        // overlay={"none"}
                        trigger='click'
                        zIndex='999'
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




                    {/* <Link
                        to={'/login'}>
                        <Button

                            style={{
                                color: colorLogin,
                                borderColor: borderLogin,
                            }}

                            type="default" icon={<UserOutlined />} size='large' shape='round'>Sign in</Button>
                    </Link> */}

                </div>
            </div>
        </header >
    );
}

export default HeaderDashboard;
