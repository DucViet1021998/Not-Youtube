import { forwardRef, useState } from "react";
import classNames from "classnames";
import styles from './Image.module.scss'

import images from "~/assets/images";


const Image = forwardRef(({ className, src, alt, ...props }, ref) => {
    const [fallback, setFallback] = useState('')
    const handleError = () => {
        setFallback(images.noImage)
    }

    return <img
        className={classNames(styles.wrapper, className)}
        ref={ref}
        src={fallback || src}
        alt={alt}
        onError={handleError}
        {...props} />;
})

export default Image;