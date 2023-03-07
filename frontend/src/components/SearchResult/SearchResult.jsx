import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';
import { SearchOutlined } from '@ant-design/icons';

import { useNavigate, useParams } from 'react-router-dom';




const cx = classNames.bind(styles);

function SearchResult({ data }) {
    const navigate = useNavigate()
    const routeParams = useParams();

    const handleClick = (e) => {
        const param = routeParams.searchtext
        if (!param) {
            navigate(`/search/${e.target.outerText}`);
        } else {
            navigate(`/search/${e.target.outerText}`)
        }
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

export default SearchResult;