import { Box, Text } from "@chakra-ui/react"

export const Label = (props) => {
    return (<>
        <Box backgroundColor={"#daecf8"} my={3} pl={4} py={2} width={"90%"}>
            <Text color={"#000040"}>{props.title}</Text>
        </Box>
    </>)
}