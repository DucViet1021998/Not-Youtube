import { useEffect, useState, useContext } from 'react'
import classNames from 'classnames/bind';
import { Avatar, Image } from 'antd'
import { SettingOutlined } from '@ant-design/icons';
import styles from './Notification.module.scss';


import request from '~/utils/request'
import { Store } from '~/store/store';

const cx = classNames.bind(styles);


function Notification({ data }) {
    const [notify, setNotify] = useState([])
    const store = useContext(Store)

    let count = store.badge

    useEffect(() => {
        async function getSongs() {
            try {
                const res = await request.get('user-songs/notify')
                if (res.status === 200) return setNotify(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getSongs()
    }, [count])


    return (
        <div className={cx('container')}>
            <header className={cx('header')}>
                Notifications <SettingOutlined style={{ fontSize: "25px" }} />
            </header>

            {notify.map(vid => (
                <div className={cx('video-add')}>
                    <Avatar className={cx('channel-avatar')} src={vid.channel_avatar} />
                    <div className={cx('title-container')}>
                        <div className={cx('title')}>{vid.title}</div>
                        <span className={cx('title-time')}>Recently added</span>
                    </div>
                    <Image className={cx('image')} preview={false} src={vid.thumbnail_url} />
                </div>
            ))}

        </div>
    )
}

export default Notification;