import { Box, Text } from "@chakra-ui/react";

export const Header = () => {
    return (<>
        <Box width={"full"} py={3} px={5} backgroundColor={"#000040"}>
            <Text fontWeight={"bold"} fontSize={20} color={"white"}>Diagnostic Research Tool</Text>
        </Box>
    </>)
}