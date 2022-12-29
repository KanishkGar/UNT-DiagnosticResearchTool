import { Button, Image } from "@chakra-ui/react"
import { useState } from "react"

export const ImageData = (props) => {
    const [show, setShow] = useState(false);
    return (<>
        <Button disabled={show} onClick={() => {setShow(true)}}>{props.data.title}</Button>
        {show && <Image src={props.data.data}/>}
    </>)
}