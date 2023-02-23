import { useNavigate } from 'react-router-dom';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Tooltip } from 'antd';

import classNames from 'classnames/bind';
import styles from './MiniVideo.module.scss';

const cx = classNames.bind(styles);


function MiniVideo({ data }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/watch/${data._id}`)
    }

    return (
        <div className={cx('container')}>

            <div onClick={handleClick} className={cx('card')} >
                <LazyLoadImage
                    className={cx('img')}
                    src={data.thumbnail_url}
                    alt={data.title} />
                <h5 className={cx('title')}>{data.title}</h5>
                <span className={cx("channel")}>
                    <Tooltip color={'#909090'} placement="top" title={data.channel}>
                        <a href={data.channel_url} rel="noreferrer" target='_blank'>{data.channel}  </a>    {data.verified && <span className={cx("check")}>
                            <Tooltip color={'#909090'} placement="right" title='Verified'><FontAwesomeIcon icon={faCheckCircle} />
                            </Tooltip></span>}
                    </Tooltip></span>
                <span className={cx("view")}>
                    <Tooltip color={'#909090'} placement="top" title={data.view_count}>
                        {data.view_count_text} views</Tooltip></span>
            </div>
        </div>

    );
}

export default MiniVideo;