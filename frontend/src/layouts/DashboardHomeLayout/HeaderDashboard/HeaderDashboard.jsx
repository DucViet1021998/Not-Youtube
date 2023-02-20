import classNames from 'classnames/bind';
import styles from './HeaderDashboard.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useContext } from 'react';

import { Store } from '~/store/store';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate()
    const store = useContext(Store)


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


    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={'/'} className={cx('logo-link')}>
                    <img className={cx('logo')} src={images.logo} alt='Logo' />
                    <span className={cx('label-logo')}  >Not Youtube</span>
                </Link>

                <div className={cx('search')}>
                    <input placeholder="Search videos" spellCheck={false} />

                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                <div className={cx('actions')}>
                    <Button size='large' type="default" onClick={handleClickLogout} shape='round' icon={<LoginOutlined />}>Log Out</Button>
                </div>
            </div>
        </header >
    );
}

export default Header;