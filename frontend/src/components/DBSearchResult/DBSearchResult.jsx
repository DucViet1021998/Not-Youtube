import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

import classNames from 'classnames/bind';
import styles from './DBSearchResult.module.scss';


const cx = classNames.bind(styles);

function DBSearchResult({ data }) {
    const navigate = useNavigate()
    const handleClick = (e) => {
        navigate(`/dashboard/search/${e.target.outerText}`);
    }
    return (
        <div
            onClick={handleClick}
            className={cx('container')}>
            <SearchOutlined style={{ fontSize: '20px', opacity: "65%" }} />
            <h3 className={cx("text-result")}>{data}</h3>
        </div>
    )
}
export default DBSearchResult;