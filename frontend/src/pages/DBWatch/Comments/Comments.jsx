import { useState, useEffect, useContext } from "react";
import { Row, Avatar } from 'antd';
import { useParams } from "react-router-dom";
import classNames from 'classnames/bind';
import request from "~/utils/request";
import { Store } from '~/store/store';
import styles from './Comments.module.scss';
import dayjs from 'dayjs'

import { v4 as id } from 'uuid';

const uuid = id()

const cx = classNames.bind(styles);


function Comments() {
    const [comments, setComments] = useState([])
    const routeParams = useParams();
    const store = useContext(Store)


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
    }, [routeParams.songId, store.badge])

    return (
        <div className={cx("container")}>
            {comments.map((cmt, i) => (
                <Row key={cmt.users[0]._id}>

                    <div key={cmt._id} className={cx("container-cmt")}>
                        <Avatar key={i} src={cmt.users[0].avatar} />
                        <div key={i} className={cx("cmt")}>
                            <span key={i} className={cx("username")}>@{cmt.users[0].username}</span>
                            <span key={uuid} className={cx("time")}>{dayjs(cmt.createdAt).format('D MMMM, YYYY')}</span>
                            <div key={i} >{cmt.comment}</div>
                        </div>

                    </div>

                </Row>

            ))}
        </div>
    )



}

export default Comments;