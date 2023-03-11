import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Button, Input, theme, Tooltip, Menu, Row, Col, Form } from 'antd';
import { MoreOutlined, FormOutlined, UserOutlined, CloseCircleFilled } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

import { v4 as id } from 'uuid';
import classNames from 'classnames/bind';

import { Store } from '~/store/store';
import request from "~/utils/request";
import images from '~/assets/images';
import SearchResult from '~/components/SearchResult'
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Appearance', 'sub1', <FontAwesomeIcon icon={faCircleHalfStroke} />, [
        getItem(null, null, null, [getItem('Dark theme', 'dark', <FontAwesomeIcon icon={faMoon} />),
        getItem('Light theme', 'light', <FontAwesomeIcon icon={faSun} />)], 'group'),
    ]),

    getItem(<Link to={'/register'}>Sign up</Link>, 'sub2', <FormOutlined />),
];


function Header() {
    const [valueInput, setValueInput] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const routeParams = useParams();
    const navigate = useNavigate()
    const store = useContext(Store)

    useEffect(() => {
        const getSong = async () => {
            try {
                if (valueInput !== '') {
                    const response = await request.post('search', {
                        search: valueInput
                    })

                    setSearchResult(response.data)
                } else if (valueInput === '') {
                    setSearchResult([])
                }
            } catch (error) {
                console.log(error);
            }
        }
        getSong()
    }, [valueInput])



    const onFinish = async (values) => {
        if (!routeParams.searchtext) {
            navigate(`/search/${values.search}`);
        } else {
            navigate(`/search/${values.search}`)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        localStorage.setItem('mode', store.currentTheme);
    }, [store.currentTheme])

    const onClick = (e) => {
        if (e.key === 'light') {
            store.setCurrentTheme('light');
        } else if (e.key === 'dark') {
            store.setCurrentTheme('dark');
        } else return
    };


    const handelKeyUp = (e) => {
        setValueInput(e.target.value);
    }

    const handleClearInput = () => {
        setValueInput('')
        setSearchResult([])
    }

    const handleOnchangeInput = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setValueInput(searchValue)
        }
    }

    const {
        token: { colorHeader, colorLogin, borderLogin, colorBgBase },
    } = theme.useToken();


    return (
        <header style={{ backgroundColor: colorHeader }} className={cx('wrapper')}>

            <Row
                wrap={false}
                style={{ color: 'red' }}
                justify={"space-between"}
            >


                <Col span={3}>

                    {/* Logo Youtube */}
                    <Link to={'/'} className={cx('logo-link')}>
                        <img className={cx('logo')} src={images.logo} alt='Logo' />
                        <span className={cx('label-logo')}  >Not Youtube</span>
                    </Link>
                    {/* END OF Logo Youtube */}
                </Col>



                {/* Search Video Youtube in Database */}
                <Col span={8}>
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            name="search"
                        >
                            <div className={cx('search')}>
                                {/* Popper Search Result */}
                                <Tooltip
                                    // destroyTooltipOnHide={true}
                                    overlayStyle={{
                                        marginTop: "-5px",

                                    }}
                                    overlayInnerStyle={{
                                        backgroundColor: '#fff',
                                        maxWidth: 'calc(100vw - 83em)',
                                        width: '400px',
                                        minWidth: '200px',
                                        color: 'black',
                                        padding: '16px 0 8px',
                                        borderRadius: "12px",
                                    }}
                                    arrow={false}
                                    // open={true}
                                    trigger="focus"
                                    placement='bottomLeft'
                                    title={
                                        <Row >
                                            <Col span={24}>
                                                {searchResult.map((u) => (
                                                    <SearchResult key={id()} data={u} />
                                                ))}
                                            </Col>
                                        </Row>
                                    }
                                >


                                    <Input
                                        onKeyUp={handelKeyUp}
                                        value={valueInput}
                                        onChange={handleOnchangeInput}
                                        allowClear={{ clearIcon: <CloseCircleFilled onClick={handleClearInput} /> }}
                                        bordered={false}
                                        placeholder="Search videos"
                                        spellCheck={false}
                                    />
                                </Tooltip>
                                {/* END OF Popper Search Result */}
                                <Button
                                    O
                                    htmlType="submit"
                                    className={cx('search-btn')}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
                {/* END OF Search Video Youtube in Database */}



                <Col xs={3} sm={5}  >
                    <div className={cx('actions')}>

                        <Tooltip
                            overlayStyle={{
                                marginTop: "-5px",
                            }}
                            overlayInnerStyle={{
                                backgroundColor: colorBgBase,
                                padding: '16px 0 8px',
                                borderRadius: "12px",
                            }}
                            placement="bottomRight"
                            arrow={false}
                            trigger='click'
                            title={
                                <Menu
                                    onClick={onClick}
                                    style={{ width: 200 }}
                                    mode="inline"
                                    items={items} />}
                        >
                            <Button style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                            }} type='default' size='large' shape="circle" ><MoreOutlined /></Button>
                        </Tooltip>

                        <Link to={'/login'}>
                            <Button
                                className={cx('login-btn')}
                                style={{
                                    color: colorLogin,
                                    borderColor: borderLogin
                                }}
                                type="default" icon={<UserOutlined />} size='medium' shape='round'>
                                Sign in
                            </Button>
                        </Link>
                    </div>

                </Col>
            </Row >

        </header >
    );
}

export default Header;