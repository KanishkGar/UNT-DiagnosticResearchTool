import { Box, Button, Image } from "@chakra-ui/react"
import { useState } from "react"

export const ImageData = (props) => {
    const [show, setShow] = useState(false);
    return (<>
        <Button disabled={show} onClick={() => { setShow(true) }}>{props.data.title}</Button>
        {show && <Box backgroundColor={'#f0f0f0'} p={3} borderRadius={10}>
            <Image src={props.data.data} />
        </Box>}
    </>)
}