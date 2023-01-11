import { Button, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useRecoilState } from "recoil";
import { clickCounterAtom, workingDiagnosisDoneAtom } from "../atoms";

export const TextData = (props) => {
    const [show, setShow] = useState(false);
    const [clickCounter, setClickCounter]  = useRecoilState(clickCounterAtom);
    const [workingDiagnosisDone, setWorkingDiagnosisDone]  = useRecoilState(workingDiagnosisDoneAtom);
    const onTextClick = () => {
        if(clickCounter == 5 && !workingDiagnosisDone)
            return;
        setShow(true);
        setClickCounter(clickCounter + 1);
    }
    return (<>
        <Button mb={2} disabled={show} onClick={onTextClick}>{props.data.title}</Button>
        {show && <Text backgroundColor={'#f0f0f0'} p={3} borderRadius={10}>{props.data.data}</Text>}
    </>)
}