import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar, Menu, theme, Tooltip, Row, Col } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import classNames from 'classnames/bind';

import { Store } from '~/store/store';
import request from '~/utils/request'
import images from '~/assets/images';
import styles from './HeaderDashboard.module.scss';

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

    getItem("Log Out", 'logout', <LoginOutlined />)
];

function HeaderDashboard({ data }) {

    const navigate = useNavigate()
    const store = useContext(Store)


    const handleClickLogout = async () => {
        try {
            await request.post('logout')
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            store.setLogin(false)
            navigate('/')

        } catch (error) {
            console.log('error2');
        }
    }
    const onClick = (e) => {
        if (e.key === 'logout') handleClickLogout()
    };

    const {
        token: { colorHeader, colorBgBase },
    } = theme.useToken();

    return (<header style={{ backgroundColor: colorHeader }} className={cx('wrapper')}>
        <Row
            wrap={false}
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
            <Col span={8}></Col>
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
