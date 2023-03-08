import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Tooltip } from 'antd';
import { Store } from '~/store/store';
import classNames from 'classnames/bind';
import styles from './MiniVideo.module.scss';

const cx = classNames.bind(styles);


function MiniVideo({ data }) {
    const store = useContext(Store)
    const navigate = useNavigate()

    const handleClick = () => store.login == null ? navigate(`/watch/${data._id}`) : navigate(`/dashboard/watch/${data._id}`)
    return (
        <div onClick={handleClick} className={cx('card')} >

            {/* IMG */}
            <LazyLoadImage
                className={cx('img')}
                src={data.thumbnail_url}
                alt={data.title}
            />
            {/* END OF IMG */}

            <div className={cx("channel-container")}>

                {/* Title Video */}
                <h2 className={cx('title')}>{data.title}</h2>
                {/* END IF Title Video */}

                <div className={cx("author-channel")}>
                    {/* Channel Name */}
                    <Tooltip color={'#616161'} placement="top" title={data.channel}>
                        <a href={data.channel_url} rel="noreferrer" target='_blank'>{data.channel}</a>
                    </Tooltip>
                    {/* END OF Channel Name */}


                    {/* Verified Check */}
                    {data.verified &&
                        <span className={cx("check")}>
                            <Tooltip color={'#616161'} placement="top" title='Verified'>
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </Tooltip>
                        </span>}
                    {/* END OF Verified Check */}

                </div>

                <span className={cx("views-days")} >
                    {/* view count */}
                    <span className={cx("views")}>
                        <Tooltip color={'#616161'} placement="top"
                            title={data.view_count}>{data.view_count_text} views
                        </Tooltip>
                    </span>
                    {/* END OF view count */}

                    {/* Published Day */}
                    <span className={cx("publish-day")}>
                        {data.publish_date_compare}
                    </span>
                    {/* END OF Published Day */}
                </span>

            </div>
        </div>


    );
}

export default MiniVideo;