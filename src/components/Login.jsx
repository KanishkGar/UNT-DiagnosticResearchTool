import { Input, Center , Stack, Button} from '@chakra-ui/react'
import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedInAtom } from "../atoms";

export const Login = (props) => {
    const setLoggedIn = useSetRecoilState(loggedInAtom);

    return (
        <Center width={"100vw"} height={"75vh"}>
            <Stack spacing={4} align='center'>
                <Input placeholder='Input Login' size='lg' htmlSize={16} width='auto' />
                <Button colorScheme='blue' variant='outline' onClick={(text) => {setLoggedIn(true)}}>
                    Log in
                </Button>
            </Stack>
        </Center>
    )
}