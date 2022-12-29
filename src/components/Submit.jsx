import { Box, Button, Select } from "@chakra-ui/react"

export const Submit = () => {
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
            <Button my={3}>Submit Treatment Diagnosis</Button>
        </Box>
    </>)
}