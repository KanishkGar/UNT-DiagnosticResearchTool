import { Box, Button, Select } from "@chakra-ui/react"
import { useSetRecoilState } from "recoil"
import { doneWithStudyAtom } from "../atoms"

export const Submit = () => {
    const setDoneWithStudy = useSetRecoilState(doneWithStudyAtom);
    const sendData = () => {
        // some https call here to send the data to java springboot
        // on succcess, run this:
        setDoneWithStudy(true)
    }

    return (<>
        <Box m={10} p={3} borderColor={"black"} borderWidth={1} width={'50%'}>
            <Select m={2}>
                <option>ligma</option>
                <option>utd</option>
            </Select>
            <Select m={2}>
                <option>ligma</option>
                <option>utd</option>
            </Select>
            <Select m={2}>
                <option>ligma</option>
                <option>utd</option>
            </Select>
            <Button onClick={sendData} my={3}>Submit Treatment Diagnosis</Button>
        </Box>
    </>)
}