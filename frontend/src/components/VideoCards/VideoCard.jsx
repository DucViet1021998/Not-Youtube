import { useNavigate } from "react-router-dom";
import { useContext } from 'react';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Card, Tooltip } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Store } from "~/store/store";

import classNames from 'classnames/bind';
import styles from './VideoCard.module.scss';
const cx = classNames.bind(styles);


const { Meta } = Card;

function VideoCard({ data }) {
    const store = useContext(Store)
    const navigate = useNavigate()

    const handleClick = () => store.login === null ? navigate(`/watch/${data._id}`) : navigate(`/dashboard/watch/${data._id}`)
    return (
        <Card
            onClick={handleClick}
            className={cx('card')}
            cover={
                <LazyLoadImage style={{ borderRadius: '10px' }} src={data.thumbnail_url} alt={data.title} />}
        >
            <Meta
                avatar={<Avatar src={data.channel_avatar} />}
                title={data.title}
            />
            <a href={data.channel_url}><span className={cx("channel")}> <Tooltip color={'#616161'} placement="top" title={data.channel}>{data.channel}</Tooltip>{data.verified && <span className={cx("check")}> <Tooltip color={'#616161'} placement="top" title='Verified'> <FontAwesomeIcon icon={faCheckCircle} /></Tooltip></span>}</span></a>
            <span className={cx("view")} ><Tooltip color={'#616161'} placement="top" title={data.view_count}>{data.view_count_text} views</Tooltip></span>
        </Card>
    );
}

export default VideoCard;