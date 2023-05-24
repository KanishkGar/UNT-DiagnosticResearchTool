import { Button, HStack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { clickCounterAtom, workingDiagnosisDoneAtom, clicksDataAtom, questionsAtom } from "../atoms";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'

export const TextData = (props) => {
    const [show, setShow] = useState(props.data.showing);
    const [clickCounter, setClickCounter] = useRecoilState(clickCounterAtom);
    const workingDiagnosisDone = useRecoilValue(workingDiagnosisDoneAtom);
    const setClicksData = useSetRecoilState(clicksDataAtom);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const questions = useRecoilValue(questionsAtom)

    

    const onTextClick = () => {
        if (clickCounter === 5 && !workingDiagnosisDone) {
            onOpen();
            return;
        }
        const curTimeMs = Date.now().toString();
        setClicksData((prevState) => ({
            ...prevState,
            [curTimeMs]: props.data.title
        }));
        setShow(true);
        // console.log("here 2");
        setClickCounter(clickCounter + 1);
    }
    useEffect(() => {
        setShow(false);
        // console.log('here');
    }, [questions]);
    return (<>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Please submit a working diagnosis before asking more questions</ModalHeader>
                <ModalCloseButton />

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        <HStack my={2}>
            <Button disabled={show} onClick={onTextClick}>{props.data.title}</Button>
            {show && <Text backgroundColor={props.data.data === "Yes" ? '#00FF00' : "#FF0000"} p={2} borderRadius={10}>{props.data.data}</Text>}
        </HStack>

        <div></div>
    </>)
}