import { Button, Text } from "@chakra-ui/react"
import { useState } from "react"

export const TextData = (props) => {
    const [show, setShow] = useState(false);
    return (<>
        <Button mb={2} disabled={show} onClick={() => {setShow(true)}}>{props.data.title}</Button>
        {show && <Text backgroundColor={'#f0f0f0'} p={3} borderRadius={10}>{props.data.data}</Text>}
    </>)
}