import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { v4 as id } from 'uuid';

import { Avatar, Col, Row } from "antd";
import TrendingVideo from "./DBTrendingVideo";
import classNames from 'classnames/bind';
import styles from './DBTrending.module.scss';

const cx = classNames.bind(styles);


function DBTrending() {
    const [video, setVideo] = useState([])
    const routeParams = useParams();


    useEffect(() => {

        async function getSongs() {
            try {
                const response = await axios.get(`http://localhost:3023/trending/${routeParams.type}`)
                // console.log(response.data);
                setVideo(response.data);
            } catch (error) {
                console.log("error Data!");
            }
        }
        getSongs()
    }, [routeParams.type])
    return (
        <div>
            <div className={cx("header")}>
                <Avatar size={80} src="https://www.youtube.com/img/trending/avatar/trending.png" />
                <h1 className={cx("text")}>Thịnh hành</h1>
            </div>
            {video.map((vid) => (
                <Row key={id()}>
                    <Col key={id()}
                        lg={16}
                        sm={12}
                        xs={24}
                    >
                        <TrendingVideo key={id()} data={vid} />
                    </Col>
                </Row>
            ))}

        </div>
    )
}

export default DBTrending;