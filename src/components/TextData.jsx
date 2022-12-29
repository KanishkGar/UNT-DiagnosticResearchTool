import { Button } from "@chakra-ui/react"
import { useState } from "react"

export const TextData = (props) => {
    const [show, setShow] = useState(false);
    return (<>
        <Button onClick={() => {setShow(true)}}>{props.data.title} {show && ": " + props.data.data}</Button>
    </>)
}