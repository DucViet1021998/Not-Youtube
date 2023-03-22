import { useState, useEffect } from "react";
import { Row, Avatar, Tooltip } from 'antd';
import dayjs from 'dayjs'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import { useParams, useNavigate } from "react-router-dom";
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import request from "~/utils/request";
import styles from './Comments.module.scss';

const cx = classNames.bind(styles);

function Comments() {
    const [comments, setComments] = useState([])
    const routeParams = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        async function Cmt() {
            try {
                const response = await request.get('/comment-songId', {
                    headers: { songId: routeParams.songId }
                })
                setComments(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        Cmt()
    }, [routeParams.songId])


    const handleClick = () => {
        navigate('/login')
    }


    return (
        <div className={cx("container")}>
            {comments.map(cmt => (
                <Row key={cmt.users[0]._id}>

                    <div className={cx("container-cmt")}>

                        <Avatar src={cmt.users[0].avatar} />

                        <div className={cx("cmt")}>
                            <span className={cx("username")}>@{cmt.users[0].username}</span>
                            <span>{cmt.users[0].check === true ? <FontAwesomeIcon style={{ width: '12px' }} color="rgb(32,213,236 )" icon={faCheckCircle} /> : ''}</span>
                            <span className={cx("time")}>{dayjs(cmt.createdAt).format('D MMMM, YYYY')}</span>
                            <div style={{ margin: '6px 0px' }}>{cmt.comment}</div>

                            <Tooltip placement="bottom" color={'#616161'} arrow={false} title='Like'>  <LikeOutlined onClick={handleClick} /></Tooltip>
                            <span style={{ opacity: '60%', paddingLeft: '5px', marginRight: '10px' }}>{cmt.likes.length === 0 ? '' : cmt.likes.length}</span>

                            <Tooltip placement="bottom" color={'#616161'} arrow={false} title='Dislike'><DislikeOutlined onClick={handleClick} /></Tooltip>
                            <span style={{ opacity: '60%', paddingLeft: '5px' }} className={cx("dislikes")}>{cmt.dislikes.length === 0 ? '' : cmt.dislikes.length}</span>

                        </div>
                    </div>

                </Row>

            ))
            }
        </div >
    )



}

export default Comments;