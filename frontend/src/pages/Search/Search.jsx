import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { Col, Row, Spin, theme, Image, Button } from "antd";

import { LoadingOutlined, DownloadOutlined } from '@ant-design/icons';

import { v4 as id } from 'uuid';
import classNames from 'classnames/bind';

import images from "~/assets/images";
import request from '~/utils/request'
import SearchVideo from './SearchVideo'
import styles from './Search.module.scss';
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


function Search() {
    const [loading, setLoading] = useState(false);
    const routeParams = useParams();
    const [video, setVideo] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        async function getSongs() {
            try {
                setLoading(true);
                const response = await request.get(`/search/${routeParams.searchtext}`)
                setVideo(response.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log("error Data!");
            }
        }
        getSongs()
        document.title = 'Not Youtube';
    }, [routeParams.searchtext])

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
                        size="large" icon={<DownloadOutlined />} onClick={() => navigate('/add-song')} >
                        Add your song to the data!
                    </Button>
                </div>)
                ||
                <>
                    {
                        video.map((vid) => (
                            <Row onClick={handleClick} key={id()}>
                                <Col key={id()}
                                    lg={20}
                                    sm={12}
                                    xs={24}
                                >
                                    <SearchVideo key={id()} data={vid} />
                                </Col>
                            </Row>
                        ))
                    }
                </>
            }
        </>
    )
}

export default Search;