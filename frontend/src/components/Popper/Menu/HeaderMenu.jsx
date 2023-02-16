import PropTypes from 'prop-types';
import styles from './Menu.module.scss'
import classNames from "classnames/bind"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'


const cx = classNames.bind(styles)

function HeaderMenu({ title, onBack }) {

    return (
        <header className={cx('header')}>

            <button className={cx('back-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h5 className={cx('header-title')}>{title}</h5>
        </header>

    )
}


HeaderMenu.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.string.isRequired,
}
export default HeaderMenu