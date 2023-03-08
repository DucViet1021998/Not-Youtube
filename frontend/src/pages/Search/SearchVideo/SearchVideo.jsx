import { useNavigate } from 'react-router-dom';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Tooltip } from 'antd';

import request from "~/utils/request";
import classNames from 'classnames/bind';
import styles from './SearchVideo.module.scss';
const cx = classNames.bind(styles);


function SearchVideo({ data }) {
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            const response = await request.post('add-song', {
                video_url: data.video_url
            })
            navigate(`/watch/${response.data._id}`)
        } catch (error) {
            navigate(`/watch/${error.response.data._id}`)
        }
    }

    return (
        <div onClick={handleClick} className={cx('card')} >

            {/* IMG */}
            <LazyLoadImage
                className={cx('img')}
                src={data.thumbnail_url}
                alt={data.title}
            />
            {/* END OF IMG */}


            <span className={cx("channel")}>

                {/* Title Video */}
                <h2 className={cx('title')}>{data.title}</h2>
                {/* END IF Title Video */}


                <div>
                    {/* Channel Name */}
                    <Tooltip color={'#616161'} placement="top" title={data.channel}>
                        <a href={data.channel_url} rel="noreferrer" target='_blank'>{data.channel}  </a>
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

                    {/* View Count */}
                    <span className={cx("view")}>
                        <Tooltip color={'#616161'} placement="top" title={data.view_count}>
                            {data.view_count_text} views</Tooltip>
                    </span>
                    {/*END OF View Count */}

                    {/* Published Day */}
                    <span className={cx("publish-day")}>{data.publish_date_compare}</span>
                    {/* END OF Published Day */}

                    <p className={cx("description")}>{data.description}</p>
                </div>

            </span>
        </div>


    );
}

export default SearchVideo;