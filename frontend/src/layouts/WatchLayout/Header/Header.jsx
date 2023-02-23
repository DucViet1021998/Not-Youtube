import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MoreOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Input, theme, Menu, Tooltip } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleHalfStroke, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined } from '@ant-design/icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { Store } from '~/store/store';
import images from '~/assets/images';
import classNames from 'classnames/bind';
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
];


function Header() {
    const store = useContext(Store)
    const onClick = (e) => {
        store.setCurrentTheme(e.key);
    };

    const {
        token: { colorText, colorHeader, colorLogin, borderLogin },
    } = theme.useToken();



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
                <div className={cx('actions')}>

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
                        <Button style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                            marginRight: '20px'
                        }} type='default' shape="circle" ><MoreOutlined /></Button>
                    </Tooltip>




                    <Link
                        to={'/login'}>
                        <Button

                            style={{
                                color: colorLogin,
                                borderColor: borderLogin,
                            }}

                            type="default" icon={<UserOutlined />} size='large' shape='round'>Sign in</Button>
                    </Link>

                </div>
            </div>
        </header >
    );
}

export default Header;