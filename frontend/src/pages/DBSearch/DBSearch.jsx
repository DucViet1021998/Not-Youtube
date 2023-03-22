import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { Col, Row, Spin, theme, Image, Button } from "antd";

import { LoadingOutlined, DownloadOutlined } from '@ant-design/icons';

import classNames from 'classnames/bind';

import images from "~/assets/images";
import request from '~/utils/request'
import DBSearchVideo from './DBSearchVideo'
import styles from './DBSearch.module.scss';
const cx = classNames.bind(styles);

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
            color: 'blue'
        }}
        spin
    />
);


function DBSearch() {
    const [loading, setLoading] = useState(false);
    const routeParams = useParams();
    const [video, setVideo] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        async function getSongs() {
            try {
                setLoading(true);
                const response = await request.get(`/search/${routeParams.searchText}`)
                setVideo(response.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log("error Data!");
            }
        }
        getSongs()
        document.title = 'Not Youtube';
    }, [routeParams.searchText])

    const {
        token: { colorText, colorBgDBEmpty, colorBgDBBtnEmpty },
    } = theme.useToken();

    const handleClick = () => {
        setLoading(true);
    }

    return (
        <>
            {loading
                ? <><Spin size="large" indicator={antIcon} /></>
                :
                (video.length === 0 && <div
                    style={{
                        minWidth: '270px',
                        minHeight: "80vh",
                        backgroundColor: colorBgDBEmpty,
                        color: colorText,
                    }}
                    className={cx("container-empty")}>

                    <Image fallback={images.noImage} preview={false} src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" alt='monkey' />

                    <h2 className={cx("title-empty")}>Your song is not in the data!</h2>

                    <Button
                        style={{
                            backgroundColor: colorBgDBBtnEmpty,
                            color: '#ffff',
                            width: "250px",
                            border: '1px solid #ffff'
                        }}
                        danger
                        size="large" icon={<DownloadOutlined />} onClick={() => navigate('/dashboard/add-song')} >
                        Add your song to the data!
                    </Button>
                </div>)
                ||
                <>
                    {
                        video.map((vid) => (
                            <Row key={vid._id}>
                                <Col
                                    onClick={handleClick}
                                    lg={20}
                                    sm={12}
                                    xs={24}
                                >
                                    <DBSearchVideo data={vid} />
                                </Col>
                            </Row>
                        ))
                    }
                </>
            }
        </>
    )
}

export default DBSearch;