import { Box, Button, Container, Divider, Text, HStack, Select, VStack, RadioGroup, Radio, Stack } from "@chakra-ui/react"
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react"
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil"
import { workingDiagnosisDoneAtom } from "../atoms";
import { doneWithStudyAtom } from "../atoms"
import { useState } from "react"
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

export const Submit = ({ diagnoses, workingOrFinal }) => {
    const setDoneWithStudy = useSetRecoilState(doneWithStudyAtom);
    const [workingDiagnosisDone, setWorkingDiagnosisDone] = useRecoilState(workingDiagnosisDoneAtom);
    // const workingOrFinal = useRecoilValue(workingOrFinalSelect);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [confidenceValue, setConfidenceValue] = useState('Not At All');
    const [primaryDiagnosis, setPrimaryDiagnosis] = useState(`Select Primary ${workingOrFinal} Diagnosis`);
    const [secondaryDiagnosis, setSecondaryDiagnosis] = useState(`Select Secondary ${workingOrFinal} Diagnosis`);
    const [tertiaryDiagnosis, setTertiaryDiagnosis] = useState(`Select Tertiary ${workingOrFinal} Diagnosis`);

    const submit = () => {
        // if any of the three diagnoses have not been selected
        // console.log(primaryDiagnosis);
        if (primaryDiagnosis.startsWith('Select Primary') //== `Select Primary ${workingOrFinal} Diagnosis`
            || secondaryDiagnosis.startsWith('Select Secondary') //== `Select Secondary ${workingOrFinal} Diagnosis`
            || tertiaryDiagnosis.startsWith('Select Tertiary')) {// == `Select Tertiary ${workingOrFinal} Diagnosis`
            //some sort of popup saying select all 3 bozo
            return;
        }
        //so we have valid data now

        //if this was the working diagnosis
        if(!workingDiagnosisDone){
            //upload the data for this to firebase
            setWorkingDiagnosisDone(true);
            setPrimaryDiagnosis(`Select Primary ${workingOrFinal} Diagnosis`);
            setSecondaryDiagnosis(`Select Secondary ${workingOrFinal} Diagnosis`);
            setTertiaryDiagnosis(`Select Tertiary ${workingOrFinal} Diagnosis`)
        }else{
            //upload the data for this to firebase
            //increment the case number
            //if the current case number is 10, we need to update everything
            setDoneWithStudy(true);
        }
        // on succcess, run this:
        onClose();
    }

    return (<>
        <Button onClick={onOpen} my={3} colorScheme='teal'>Submit {workingOrFinal} Diagnosis</Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Submit {workingOrFinal} Diagnosis</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <VStack>
                        <Container bg='blue.100' color='blue.600' borderRadius='lg' borderWidth='1px' padding="3">
                            Primary, secondary, and a tertiary {workingOrFinal.toLowerCase()} diagnosis are required.
                            Once your selections are locked in, you may not change them
                        </Container>
                        <Divider orientation="horizontal" />
                        <FormControl isRequired>
                            <FormLabel></FormLabel>
                            <Select m={2} placeholder={`Select Primary ${workingOrFinal} Diagnosis`} defaultValue={primaryDiagnosis} onChange={(e) => setPrimaryDiagnosis(e.target.value)}>
                                {diagnoses.map((el, idx) => {
                                    return (<option key={idx}>{el}</option>)
                                })}
                            </Select>
                            <Select m={2} placeholder={`Select Secondary ${workingOrFinal} Diagnosis`} defaultValue={secondaryDiagnosis} onChange={(e) => setSecondaryDiagnosis(e.target.value)}>
                                {diagnoses.map((el, idx) => {
                                    return (<option key={idx}>{el}</option>)
                                })}
                            </Select>
                            <Select m={2} placeholder={`Select Tertiary ${workingOrFinal} Diagnosis`} defaultValue={tertiaryDiagnosis} onChange={(e) => setTertiaryDiagnosis(e.target.value)}>
                                {diagnoses.map((el, idx) => {
                                    return (<option key={idx}>{el}</option>)
                                })}
                            </Select>
                        </FormControl>
                        <Divider orientation="horizontal" />
                        <Text fontSize='xl'>
                            Self Evaluation
                        </Text>
                        <Container bg='green.100' color='green.600' borderRadius='lg' borderWidth='1px' padding="3">
                            How confident are you with your selected {workingOrFinal.toLowerCase()} primary, secondary,
                            and tertiary diagnoses?
                        </Container>
                        <RadioGroup onChange={setConfidenceValue} value={confidenceValue}>
                            <Stack direction='row' spacing={4}>
                                <Radio value='Not At All'>Not At All</Radio>
                                <Radio value='Somewhat Not'>Somewhat Not</Radio>
                                <Radio value='Neutral'>Neutral</Radio>
                                <Radio value='Somewhat'>Somewhat</Radio>
                                <Radio value='Very'>Very</Radio>
                            </Stack>
                        </RadioGroup>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={submit}>
                        Lock in {workingOrFinal} Diagnosis
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    </>)
}