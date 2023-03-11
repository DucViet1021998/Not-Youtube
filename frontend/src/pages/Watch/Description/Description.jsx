import { useState } from "react";
import { Typography, Button } from 'antd';

const { Paragraph } = Typography;

function Description({ data }) {
    const [ellipsis, setEllipsis] = useState(true);

    const handleEllipsis = () => {
        setEllipsis(!ellipsis)
    }
    return (
        <>
            <Paragraph
                ellipsis={
                    ellipsis
                        ?
                        {
                            rows: 2,

                        }
                        : false
                }
            >
                <p>{data}</p>
            </Paragraph>
            <Button style={{
                border: 'none',
                backgroundColor: 'transparent',

            }} onClick={handleEllipsis}>{ellipsis ? "See More" : "See Less"}</Button>
        </>

    )
}

export default Description;