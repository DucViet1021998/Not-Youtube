import { useState, useEffect, useContext } from "react";
import { Row } from 'antd';

import { useParams } from "react-router-dom";
import classNames from 'classnames/bind';
import request from "~/utils/request";

import styles from './Comments.module.scss';
import CommentUser from "./CommentUser";
import { Store } from '~/store/store';

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
    }, [routeParams.songId, store.store.badge])

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