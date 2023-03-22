import { useState, useEffect } from "react";
import { Row } from 'antd';

import { useParams } from "react-router-dom";
import classNames from 'classnames/bind';
import request from "~/utils/request";

import styles from './Comments.module.scss';
import CommentUser from "./CommentUser";

const cx = classNames.bind(styles);

function Comments() {
    const [comments, setComments] = useState([])
    const routeParams = useParams();


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

    return (
        <div className={cx("container")}>
            {comments.map((cmt, i) => (
                <Row key={i}>
                    <CommentUser data={cmt} />
                </Row>

            ))}
        </div>
    )

}

export default Comments;