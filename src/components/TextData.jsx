import { Button, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useRecoilState } from "recoil";
import { clickCounterAtom, workingDiagnosisDoneAtom } from "../atoms";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'

export const TextData = (props) => {
    const [show, setShow] = useState(false);
    const [clickCounter, setClickCounter] = useRecoilState(clickCounterAtom);
    const [workingDiagnosisDone, setWorkingDiagnosisDone] = useRecoilState(workingDiagnosisDoneAtom);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onTextClick = () => {
        if (clickCounter == 5 && !workingDiagnosisDone) {
            onOpen();
            return;
        }
        setShow(true);
        setClickCounter(clickCounter + 1);
    }
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
        <Button mb={2} disabled={show} onClick={onTextClick}>{props.data.title}</Button>
        {show && <Text backgroundColor={'#f0f0f0'} p={3} borderRadius={10}>{props.data.data}</Text>}
    </>)
}