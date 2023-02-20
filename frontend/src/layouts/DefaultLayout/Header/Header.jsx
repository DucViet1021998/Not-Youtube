import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

function Header() {

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
                    <Link to={'/login'}>
                        <Button className={cx('login-btn')} type="default" icon={<UserOutlined />} size='large' shape='round'>Login</Button>
                    </Link>
                </div>
            </div>
        </header >
    );
}

export default Header;