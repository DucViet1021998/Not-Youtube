import { useState, useEffect } from 'react'
import dayjs from "dayjs";

import { Space, Table, Tag, Button, Col, Row, Avatar, Popconfirm as Confirm } from 'antd';
import request from '~/utils/request'

import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
const { Column } = Table;

const cx = classNames.bind(styles);

function Admin() {
    const [dataSongs, setDataSongs] = useState([])
    const [dataUsers, setDataUsers] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        async function getSongs() {
            try {
                const res = await request.get('get-songs')
                if (res.status === 200) setDataSongs(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getSongs()
    }, [count])

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await request.get('users')
                if (response.status === 200) {
                    setDataUsers(response.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUsers()
    }, [])



    return (
        <div>
            <Row gutter={[0, 16]}>

                <Col span={4} offset={3}>

                    <div className={cx('user-container')}>
                        <h3>Total Users</h3>
                        <h1> {dataUsers.length}</h1>
                    </div>
                </Col>
                <Col span={4} offset={7}>
                    <div className={cx('songs-container')} >
                        <h3>Total Songs</h3>
                        <h1> {dataSongs.length}</h1>
                    </div>
                </Col>

            </Row>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Table size="small" dataSource={dataUsers} >
                        <Column
                            width='57px'
                            align='center' title="Avatar" dataIndex="avatar" key="avatar"
                            render={(ava) => (
                                <>
                                    <Avatar key={ava} src={ava} />
                                </>
                            )}
                        />
                        <Column
                            width='55px'

                            align='center' title="User" dataIndex="username" key="username" />
                        <Column align='center' title="Total Songs" dataIndex="songs" key="songs"
                            render={(song) => (
                                <h2 key={song}>{song.length}</h2>
                            )} />
                        <Column ellipsis='true' align='center' title="Email" dataIndex="email" key="email" />
                        <Column ellipsis='true' align='center' title="Created At" dataIndex="createdAt" key="createdAt"
                            render={(created) => (
                                <h5 key={created}>{dayjs(created).format('D MMMM, YYYY')}</h5>
                            )}
                        />
                        <Column
                            title="Tags"
                            align='center'
                            dataIndex="role"
                            key="role"
                            render={(tag) => (
                                <Tag color={tag === 'admin' ? 'red' : 'blue'} key={tag}>
                                    {tag}
                                </Tag>
                            )}
                        />
                        <Column
                            title="Action"
                            align='center'
                            key="action"
                            render={(_, record) => (
                                <Space key={_} size="middle">
                                    <Confirm key={_} title="Sure to delete?" onConfirm={() => console.log(record._id)}>
                                        <Button key={_} disabled={record.role === 'admin' && true}>{record.role === 'admin' ? 'Cannot' : 'Delete'}</Button>
                                    </Confirm>
                                </Space>
                            )}
                        />
                    </Table>

                </Col>
                <Col span={12}>
                    <Table size="small"
                        pagination={{ defaultPageSize: '5' }}
                        dataSource={dataSongs}
                    >
                        <Column align='center' title="Avatar" dataIndex="channel_avatar" key="channel_avatar"
                            render={(ava) => (
                                <>
                                    <Avatar key={ava} src={ava} />
                                </>
                            )}
                        />
                        <Column align='center' title="Channel" dataIndex="channel" key="channel"
                            render={(title) => (
                                <h5 key={title}
                                    style={{
                                        textOverflow: 'ellipsis',
                                        overFlow: 'hidden',
                                        lineHeight: '1.1em',
                                        height: '3em',
                                    }}
                                >{title}</h5>
                            )} />

                        {/* <Column title="Video Url" dataIndex="video_url" key="video_url"
                            render={(video_url) => (
                                <h5>{video_url}</h5>
                            )}
                        /> */}
                        <Column align='center' title="Title" dataIndex="title" key="title"
                            render={(title) => (
                                <h5 key={title}
                                    style={{
                                        fontWeight: '500',
                                        textOverflow: 'ellipsis',
                                        overFlow: 'hidden',
                                        lineHeight: '1.1em',
                                        height: '3em',
                                    }}
                                >{title}</h5>
                            )} />
                        <Column
                            align='center'
                            title="Tags"
                            dataIndex="verified"
                            key="verified"
                            render={(tag) => (
                                <Tag color={tag === true ? 'blue' : 'yellow'} key={tag}>
                                    {tag === true ? 'Verified' : 'Not verified'}
                                </Tag>
                            )}
                        />
                        <Column
                            // fixed='right'
                            align='center'
                            title="Action"
                            key="_id"
                            render={(_, record) => (
                                <Space key={_} size="middle">
                                    <Confirm key={_} placement="left" title="Sure to delete?"
                                        onConfirm={() => {
                                            async function getSongs() {
                                                try {
                                                    const res = await request.delete('delete-song', {
                                                        headers: {
                                                            songId: record._id
                                                        }
                                                    })
                                                    if (res.status === 200) {
                                                        setCount(count + 1)
                                                    }
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }
                                            getSongs()
                                        }}
                                    >
                                        <Button >Delete</Button>
                                    </Confirm>
                                </Space>
                            )}
                        />
                    </Table>

                </Col>
            </Row>
        </div >
    )
}


export default Admin;

