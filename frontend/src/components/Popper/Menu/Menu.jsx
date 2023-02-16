import Tippy from "@tippyjs/react/headless"
import styles from './Menu.module.scss'
import classNames from "classnames/bind"

import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from "./MenuItem"
import HeaderMenu from "./HeaderMenu"
import { useState } from "react"
import PropTypes from 'prop-types';


const cx = classNames.bind(styles)
const defaultFn = () => { };

function Menu({ hideOnClick = false, children, items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1]

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item)
                        }
                    }}
                />
            );
        });
    }


    // Reset to FirstPage
    const handleReset = () => {
        setHistory(prev => prev.slice(0, 1))
    }

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1))
    }

    return (
        <Tippy
            hideOnClick={hideOnClick}
            offset={[12, 8]}
            interactive
            delay={[0, 700]}
            placement='bottom-end'
            render={attrs => (
                <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <HeaderMenu
                                title={current.title}
                                onBack={handleBack}
                            />
                        )}
                        <div className={cx("menu-body")}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={handleReset}

        >
            {children}
        </Tippy>

    )
}

Menu.propsTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func
}
export default Menu