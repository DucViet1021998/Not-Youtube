import { useState } from 'react';

import { LikeOutlined, DislikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons'
import dayjs from 'dayjs'
import { Avatar, Tooltip } from 'antd';

import request from "~/utils/request";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './CommentUser.module.scss';
const cx = classNames.bind(styles);

function CommentUser({ data }) {
    const [like, setLike] = useState(data.likes.length)
    const [dislike, setDislike] = useState(data.dislikes.length)
    const [likeIcon, setLikeIcon] = useState(true)
    const [dislikeIcon, setDislikeIcon] = useState(true)

    const handleClickLike = async () => {
        try {
            const res = await request.post('like-comment', { cmt: data._id })
            if (res.status === 202) {
                setLike(like + 1)
                setLikeIcon(true)
            }
            else if (res.status === 200) {
                setLike(like - 1)
                setLikeIcon(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickDisLike = async () => {
        try {
            const res = await request.post('dislike-comment', { cmt: data._id })
            if (res.status === 202) {
                setDislike(dislike + 1)
                setDislikeIcon(true)
            }
            else if (res.status === 200) {
                setDislike(dislike - 1)
                setDislikeIcon(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={cx("container-cmt")}>
            <Avatar src={data.users[0].avatar} />
            <div style={{ position: 'relative' }}>
                <span className={cx("username")}>@{data.users[0].username}</span>
                <span>{data.users[0].check === true ? <FontAwesomeIcon style={{ width: '12px' }} color="rgb(32,213,236 )" icon={faCheckCircle} /> : ''}</span>
                <span style={{ marginLeft: '5px' }} className={cx("time")}>{dayjs(data.createdAt).format('D MMMM, YYYY')}</span>
                <div style={{ margin: '6px 0px' }} >{data.comment}</div>

                <Tooltip placement="bottom" color={'#616161'} arrow={false} title='Like'>
                    {
                        (data.likes.includes(data.users[0]._id) && likeIcon === true)
                            ? <LikeFilled onClick={handleClickLike} />
                            : <LikeOutlined onClick={handleClickLike} />
                    }
                </Tooltip>

                <span style={{
                    opacity: '60%',
                    paddingLeft: '5px',
                }}
                >
                    {like === 0 ? '' : like}
                </span>

                <span style={{
                    position: 'absolute',
                    left: '35px',
                }}>
                    <Tooltip placement="bottom" color={'#616161'} arrow={false} title='Dislike'   >
                        {
                            (data.dislikes.includes(data.users[0]._id) && dislikeIcon === true)
                                ? <DislikeFilled onClick={handleClickDisLike} />
                                : <DislikeOutlined onClick={handleClickDisLike} />
                        }
                    </Tooltip >
                </span>


                <span
                    style={{
                        position: 'absolute',
                        left: '50px',
                        opacity: '60%',
                        paddingLeft: '5px'
                    }}>
                    {dislike === 0 ? '' : dislike}
                </span>

            </div>

        </div>
    );
}

export default CommentUser;